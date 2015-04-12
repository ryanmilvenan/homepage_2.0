var React = require('react');
var socket = require('./socket');

var AddSourceForm = React.createClass({
    getInitialState: function() {
        socket.on('source:invalid', this.handleError);
        return {};
    },
    handleError: function(error) {
        alert(error.error);
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
            <form className="add-source-form two columns" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Title" ref="title" />
                <input type="text" placeholder="URL" ref="url" />
                <input type="submit" value="Add source" />
            </form>
        );
    }
})

module.exports=AddSourceForm;
