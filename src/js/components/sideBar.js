var React = require('react');
var socket = require('./socket');
var Button = require('react-bootstrap').Button;
var ButtonGroup = require('react-bootstrap').ButtonGroup;
var Modal = require('react-bootstrap').Modal;
var ModalTrigger = require('react-bootstrap').ModalTrigger;
var AddSourceForm = require('./addSourceForm');
var ImportForm = require('./importForm');
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Popover = require('react-bootstrap').Popover;
var Panel = require('react-bootstrap').Panel;
var ListGroup = require('react-bootstrap').ListGroup;
var ListGroupItem = require('react-bootstrap').ListGroupItem;
var Input = require('react-bootstrap').Input;

var SideBar = React.createClass({
    updateExportObj: function(data) {
        this.setState({exportObj:data})
        var dataString = JSON.stringify(this.state.exportObj);
        var dataBlob = new Blob([dataString], {type:'application/json'});
        var exportTag = React.findDOMNode(this.refs.file);
        exportTag.href = window.URL.createObjectURL(dataBlob);
    },
    importObj: function(data) {
        console.log("HEARD CLICK");
        console.log(data);
    },
    getInitialState: function() {
        socket.on('sources:found', this.updateExportObj);
        return {sourceForm: false, exportObj:{}};
    },
    toggleHidden: function() {
        if(this.state.sourceForm) {
            this.setState({sourceForm: false});
        } else
            this.setState({sourceForm: true});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var email = this.refs.email.getValue();
        var password = this.refs.password.getValue();
        if(!email || !password) {
            return;
        }
        socket.emit('client:sign-in', {email: email, password: password});
        email = "";
        password = "";
    },
    render: function() {
        // var Glyphicon = ReactBootstrap.Glyphicon;
        return (
            <div className="side-bar col-xs-3 text-center">
<<<<<<< Updated upstream
                <Panel bsStyle='primary' collapsable defaultCollapsed header='Sign In'>
                    <ListGroup fill>
                        <ListGroupItem>
                            <form className="sign-in" onSubmit={this.handleSubmit}>
                                <Input type="text" placeholder="Email" ref="email" />
                                <Input type="password" class="form-control" id="passwordField" placeholder="Password" ref="password" />
                                <Input type="submit" value="Sign in" />
                            </form>
                        </ListGroupItem>
                    </ListGroup>
                </Panel>

                <h4>Share your dashboard template.</h4>
                <ButtonGroup vertical className="import-export-buttons">
                    <ModalTrigger modal={<ImportForm />}>
                        <Button>Import</Button>
                    </ModalTrigger>                             
                    <Button>Export</Button>
                </ButtonGroup>
                <br/>

                <OverlayTrigger trigger='click' placement='left' overlay={<Popover title='Add an API'> Check this info.<AddSourceForm /></Popover>}>
                    <div id="scroll" className="add-button icon-plus">
                        <a href="#"></a>
                    </div>                      
                </OverlayTrigger>               
=======
                    <Button bsStyle='primary' block>Sign in</Button><br/>
                    <h4>Share your dashboard template.</h4>
                    <ButtonGroup vertical className="import-export-buttons">
                        <ModalTrigger modal={<ImportForm onRequestHide={this.importObj}/>}>
                            <Button>Import</Button>
                        </ModalTrigger>                             
                    <a href="#" ref="file" download="mySources">
                        <Button>Export</Button>
                    </a>
                    </ButtonGroup>
                    <br/>
                    <div className="add-button icon-plus">
                        <a href="#" onClick={this.toggleHidden}></a>
                    </div>
>>>>>>> Stashed changes
                
                {this.state.sourceForm ? <AddSourceForm url={this.props.url} /> : null }
            </div>
        )
    }
});

module.exports=SideBar
