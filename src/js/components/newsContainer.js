var React = require('react');
var socket = require('./socket');
var NewsItem = require('./newsItem');
var Panel = require('react-bootstrap').Panel;
var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;
var ListGroup = require('react-bootstrap').ListGroup;
var ListGroupItem = require('react-bootstrap').ListGroupItem;
var Input = require('react-bootstrap').Input;

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
    handleRename: function(e) {
        e.preventDefault();
        var title = this.refs.title.getValue();
        socket.emit('sources:rename', {sourceID: this.props.sourceID, title: title}); 
        this.toggleHiddenRename();
    },
    toggleHiddenRename: function(){
        if(this.state.rename) {
            this.setState({rename: false});
        } else
            this.setState({rename: true});
    },
    render: function() {
        var slice = this.state.data.slice(0, this.props.numItems);
        var items = slice.map(function(item) {
            return (
                <ListGroupItem><a href={item.link}>{item.title}</a></ListGroupItem>
            )
        })
        return (
            <div>
                {this.props.loggedIn ?
                    <div className="down-button">
                        <DropdownButton bsSize='xsmall' key={1}>
                            <MenuItem eventKey='1' onSelect={this.toggleHiddenRename}>Rename</MenuItem>
                            <MenuItem eventKey='2' onSelect={this.deleteSource}>Close</MenuItem>
                        </DropdownButton>
                    </div>
                : null}
                {this.state.rename ? <form className="rename col-xs-2" onSubmit={this.handleRename}>
                    <Input type="text" placeholder="Title" ref="title" />
                </form> : null }
                <Panel collapsable defaultExpanded header={this.props.title}>
                    <ListGroup fill>
                        {items}
                    </ListGroup>
                </Panel>

            </div>
        );
    }

});

module.exports=NewsContainer;
