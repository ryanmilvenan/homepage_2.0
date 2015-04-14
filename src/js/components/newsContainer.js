var React = require('react');
var socket = require('./socket');
var NewsItem = require('./newsItem');
var Panel = require('./PanelWithButton');
// var Panel = require('react-bootstrap').Panel;
var ListGroup = require('react-bootstrap').ListGroup;
var ListGroupItem = require('react-bootstrap').ListGroupItem;

var NewsContainer = React.createClass({
    updateItems: function(item) {
        if(item.sourceID == this.props.sourceID) {
            var newData = this.state.data;
            newData.push(item.data);
            this.setState(newData);
        }
    },
    deleteSource: function() {
       socket.emit('sources:remove', {sourceID: this.props.sourceID}); 
    },
    getInitialState: function() {
        socket.on('stream:item', this.updateItems);
        return {data: []};
    },
    render: function() {
        var slice = this.state.data.slice(0, this.props.numItems);
        var items = slice.map(function(item) {
            return (
                <ListGroupItem><a href={item.link}>{item.title}</a></ListGroupItem>
            )
        })
        return (
            <Panel collapsable defaultExpanded header={this.props.title}>
                <ListGroup fill>
                    {items}
                </ListGroup>
            </Panel>
        );
    }

});

module.exports=NewsContainer;
