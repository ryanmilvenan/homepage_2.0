var React = require('react');
var socket = require('./socket');
var NavBar = require('./navBar');
var SideBar = require('./sideBar');
var TopBar = require('./topBar');

var NewsStand = React.createClass({
    loadNewsSources: function() {
        socket.emit('sources:retrieve');
    },
    setLoggedIn: function(data) {
        this.setState({loggedIn: true});
        this.setState({username: data.username});
    },
    setLoggedOut: function() {
        this.setState({loggedIn: false});
        this.setState({username: ""});
        socket.emit('client:log-out');
    },
    updateSelectedTab: function(tab) {
        this.setState({tab: tab});
    },
    getInitialState: function() {
        socket.on('server:log-in', this.setLoggedIn);
        socket.on('server:log-out', this.setLoggedOut);
        socket.on('update:sources', this.loadNewsSources);
        return {loggedIn: false, username: "", tab: {}};
    },
    componentDidMount: function() {
        this.loadNewsSources();
    },
    render: function() {
        console.log("USER: " + this.state.username);
        return (
            <div className="news-stand col-xs-12">
                <SideBar url={this.props.url} username={this.state.username} loggedIn={this.state.loggedIn} logOutHandler={this.setLoggedOut} tab={this.state.tab} />
                <TopBar url={this.props.url} username={this.state.username} loggedIn={this.state.loggedIn} tabHandler={this.updateSelectedTab} />
            </div>
        );
    }
});

module.exports=NewsStand;

