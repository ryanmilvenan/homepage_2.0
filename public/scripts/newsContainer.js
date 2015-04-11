var socket = io();
var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;
var NavItem = ReactBootstrap.NavItem;
var DropdownButton = ReactBootstrap.DropdownButton;
var MenuItem = ReactBootstrap.MenuItem;
var Grid = ReactBootstrap.Grid;
var Col = ReactBootstrap.Col;
var Row = ReactBootstrap.Row;
var Modal = ReactBootstrap.Modal;
var ModalTrigger = ReactBootstrap.ModalTrigger;
var Button = ReactBootstrap.Button;
var Input = ReactBootstrap.Input;


var NewsItem = React.createClass({
    getInitialState: function() {
        return {description: []};
    },
    expandArticle: function() {
        if(this.state.description.length > 0) {
            this.setState({description: []}); 
        } else {
            this.setState({description: this.props.data.description})
        }
        console.log(this.props.data)
    },
    render: function() {
        return (
            <div className="feed-item">
                <a href={this.props.link}>{this.props.title}</a>
            </div>
        )
    }
});

var NewsContainer = React.createClass({
    updateItems: function(item) {
        if(item.sourceID == this.props.sourceID) {
            var newData = this.state.data;
            newData.push(item.data);
            this.setState(newData);
        }
    },
    deleteSource: function() {
       socket.emit('sources:remove', {sourceID: this.props.sourceID}) 
    },
    getInitialState: function() {
        socket.on('stream:item', this.updateItems);
        return {data: []};
    },
    render: function() {
        var slice = this.state.data.slice(0, this.props.numItems);
        var items = slice.map(function(item) {
            return (
                <NewsItem link={item.link} title={item.title} data={item} />
            )
        })
        return (
            <div className= "news-container col-xs-3">
                <div className= "delete-button icon-cross">
                    <a href="#" onClick={this.deleteSource}></a>
                </div>
                <h3 className="container-title">
                    {this.props.title}
                </h3>
                {items}
            </div>
        );
    }

});

var SideBar = React.createClass({
    getInitialState: function() {
        return {sourceForm: false}
    },
    toggleHidden: function() {
        if(this.state.sourceForm) {
            this.setState({sourceForm: false})
        } else
            this.setState({sourceForm: true}) 
    },
    render: function() {
        var Button = ReactBootstrap.Button;
        var ButtonGroup = ReactBootstrap.ButtonGroup;
        // var Glyphicon = ReactBootstrap.Glyphicon;
        return (
            <div className="side-bar col-xs-3 text-center">
                    <Button bsStyle='primary' block>Sign in</Button><br/>
                    <h4>Share your dashboard template.</h4>
                    <ButtonGroup vertical className="import-export-buttons">
                        <ModalTrigger modal={<ImportForm />}>
                            <Button>Import</Button>
                        </ModalTrigger>                             
                        <Button>Export</Button>
                    </ButtonGroup>
                    <br/>
                    <div className="add-button icon-plus">
                        <a href="#" onClick={this.toggleHidden}></a>
                    </div>
                
                {this.state.sourceForm ? <AddSourceForm url={this.props.url} /> : null }
            </div>
        )
    }
});

var ImportForm = React.createClass({
  render() {
    return (
      <Modal {...this.props} bsStyle='primary' title='Import a template' animation={false}>
        <div className='modal-body'>
            <form>
                <Input type='file' label='File' help='Select a JSON template file.' />
            </form>
        </div>

        <div className='modal-footer'>
            <Button onClick={this.props.onRequestHide}>Load template</Button>
        </div>
      </Modal>
    );
  }
});

var AddSourceForm = React.createClass({
    getInitialState: function() {
        socket.on('source:invalid', this.handleError)
        return {}
    },
    handleError: function(error) {
        alert(error.error)
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var title = this.refs.title.getDOMNode().value.trim();
        var url = this.refs.url.getDOMNode().value.trim();
        if(!title || !url) {
            return;
        }
        socket.emit('sources:new', {title: title, url: url});
        title = "";
        url = "";
    },
    render: function() {
        return (
            <form className="add-source-form col-xs-2" onSubmit={this.handleSubmit}>
                <Input type="text" placeholder="Title" ref="title" />
                <Input type="text" placeholder="URL" ref="url" />
                <Input type="submit" value="Add source" />
            </form>
        );
    }
})

var DisplayCase = React.createClass({
    render: function() {
        var containers = this.props.data.map(function(container) {
            return (
                <NewsContainer key={container.id} url={container.url} title={container.title} sourceID={container.sourceID} numItems={10} />
            );
        });

        var chunks = [];
        var i,j,chunk = 4;
        for(i = 0, j = containers.length; i<j; i += chunk) {
            var chunkArr = containers.slice(i, i+chunk);
            chunks.push(chunkArr);
        }

        var rows = chunks.map(function(chunk) {
            return(
                <div className="row">
                    {chunk}
                </div>
            );
        }) 

        return (
            <div className="display-case col-xs-9">
                {rows}
            </div>
        );
    }
});

var NavBar = React.createClass({   
    render: function() {
        var ButtonToolbar = ReactBootstrap.ButtonToolbar;
        var Button = ReactBootstrap.Button;
        var DropdownButton = ReactBootstrap.DropdownButton;
        var buttonsInstance = (
            <ButtonToolbar>
              <Button>Default</Button>
            </ButtonToolbar>
        );

        return (                
            <Navbar brand='React-Bootstrap'>
                <Nav>
                    <NavItem eventKey={1} href='#'>Link</NavItem>
                    <NavItem eventKey={2} href='#'>Link</NavItem>
                    <DropdownButton bsStyle='primary' eventKey={3} title='Add an API'>
                        <MenuItem eventKey='1'>
                            <form className="add-source-form col-xs-2" onSubmit={this.handleSubmit}>
                                <input type="text" placeholder="Title" ref="title" />
                                <br/>
                                <input type="text" placeholder="URL" ref="url" />
                                <br/>
                                <input type="submit" value="Add source" />
                            </form>
                        </MenuItem>
                        <MenuItem eventKey='2'>Another action</MenuItem>
                        <MenuItem eventKey='3'>Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey='4'>Separated link</MenuItem>
                    </DropdownButton>
                    <Button>Import</Button>
                    <Button>Export</Button>
                </Nav>
            </Navbar>

        );
    }
});


var NewsStand = React.createClass({
    loadNewsSources: function() {
        socket.emit('sources:retrieve')
    },
    updateSourceState: function(data) {
        this.setState({data: data});
    },
    getInitialState: function() {
        socket.on('update:sources', this.loadNewsSources);
        socket.on('sources:found', this.updateSourceState);
        return {data: []};
    },
    componentDidMount: function() {
        this.loadNewsSources();
    },
    render: function() {
        return (
            <div className="news-stand col-xs-12">
                <NavBar url={this.props.url} />
                <DisplayCase url={this.props.url} data={this.state.data} />
                <SideBar url={this.props.url} />
            </div>
        );
    }
    
});


React.render(
    <NewsStand url='http://localhost:3000/sources' />,
    document.getElementById('content')
)
