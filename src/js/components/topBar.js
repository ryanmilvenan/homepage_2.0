var React = require('react');
var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var DropdownButton = require('react-bootstrap').DropdownButton;
var PageHeader = require('react-bootstrap').PageHeader;
var TabbedArea = require('react-bootstrap').TabbedArea;
var TabPane = require('react-bootstrap').TabPane;
var DisplayCase = require('./displayCase');

var TopBar = React.createClass({   
    render: function() {

        return (
            <div className="col-xs-9">
                <PageHeader className="title">Homepage 2.0</PageHeader>
                <TabbedArea defaultActiveKey={2}>
                    <TabPane eventKey={1} tab='Tab 1'>
                        <DisplayCase url={this.props.url} /> 
                    </TabPane>
                    <TabPane eventKey={2} tab='Tab 2'> 
                        <DisplayCase url={this.props.url} /> 
                    </TabPane>
                </TabbedArea>                
            </div>
        );
    }
});

module.exports=TopBar;
