var React = require('react');
var socket = require('./socket');
var NavBar = require('./navBar');
var DisplayCase = require('./displayCase');
var SideBar = require('./sideBar');
var TopBar = require('./topBar');

var NewsStand = React.createClass({
    loadNewsSources: function() {
        socket.emit('sources:retrieve');
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
                <SideBar url={this.props.url} />                
                <TopBar />
                <DisplayCase url={this.props.url} data={this.state.data} />
            </div>
        );
    }
});

module.exports=NewsStand;

