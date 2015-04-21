var React = require('react');
var PageHeader = require('react-bootstrap').PageHeader;
var TabbedArea = require('react-bootstrap').TabbedArea;
var TabPane = require('react-bootstrap').TabPane;
var socket = require('./socket');
var DisplayCase = require('./displayCase');

var TopBar = React.createClass({   
    loadTabs: function(data) {
        this.setState({data: data.tabs})
        socket.emit('sources:populate', {user: this.props.username})
    },
    getInitialState: function() {
        socket.on('server:tabs', this.loadTabs)
        return {data: []}
    },
    render: function() {
        var tabIdx = 0;
        var tabs = this.state.data.map(function(tab) {
            tabIdx++;
            return (
                <TabPane eventKey={tabIdx} tab={tab.title}>
                    <DisplayCase url={this.props.url} />
                </TabPane>
            )
        }.bind(this));
        return (
            <div className="col-xs-9">
                <PageHeader className="title">Homepage 2.0</PageHeader>
                <TabbedArea defaultActiveKey={1}>
                    {tabs}
                </TabbedArea>                
            </div>
        );
    }
});

module.exports=TopBar;
