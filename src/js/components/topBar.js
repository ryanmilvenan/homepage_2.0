var React = require('react');
var PageHeader = require('react-bootstrap').PageHeader;
var TabbedArea = require('react-bootstrap').TabbedArea;
var TabPane = require('react-bootstrap').TabPane;
var socket = require('./socket');
var DisplayCase = require('./displayCase');

var TopBar = React.createClass({   
    loadTabs: function(data) {
        this.setState({data: data.tabs})
        var offset = this.state.key - 1;
        socket.emit('sources:populate', {user: this.props.username, tab: data.tabs[offset]});
    },
    handleSelect: function(key) {
        this.setState({key: key});
    },
    getInitialState: function() {
        socket.on('server:tabs', this.loadTabs)
        return {data: [], key: 1}
    },
    render: function() {
        var tabIdx = 0;
        var tabs = this.state.data.map(function(tab) {
            tabIdx++;
            return (
                <TabPane eventKey={tabIdx} tab={tab.title} > 
                    <DisplayCase url={this.props.url} />
                </TabPane>
            )
        }.bind(this));
        return (
            <div className="col-xs-9">
                <PageHeader className="title">Homepage 2.0</PageHeader>
                <TabbedArea activeKey={this.state.key} onSelect={this.handleSelect}>
                    {tabs}
                </TabbedArea>                
            </div>
        );
    }
});

module.exports=TopBar;
