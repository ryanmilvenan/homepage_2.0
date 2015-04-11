var React = require('react');
var socket = require('./socket');
var NewsItem = require('./newsItem');

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
                <NewsItem link={item.link} title={item.title} data={item} />
            )
        })
        return (
            <div className= "news-container">
                <div className= "delete-button icon-cross">
                    <a href="#" onClick={this.deleteSource}></a>
                </div>
                <h3 className="container-title">
                    {this.props.title}
                </h3>
                {items}
            </div>
        );
    }

});

module.exports=NewsContainer;
