var React = require('react');
var socket = require('./socket');
var Button = require('react-bootstrap').Button;
var ButtonGroup = require('react-bootstrap').ButtonGroup;
var Modal = require('react-bootstrap').Modal;
var ModalTrigger = require('react-bootstrap').ModalTrigger;
var AddSourceForm = require('./addSourceForm');
var ImportForm = require('./importForm');


var SideBar = React.createClass({
    updateExportObj: function(data) {
        this.setState({exportObj:data})
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
    render: function() {
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

module.exports=SideBar
