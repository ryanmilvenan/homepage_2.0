var React = require('react');
var NewsItem = React.createClass({
    getInitialState: function() {
        return {description: []};
    },
    expandArticle: function() {
        if(this.state.description.length > 0) {
            this.setState({description: []}); 
        } else {
            this.setState({description: this.props.data.description})
        }
        console.log(this.props.data)
    },
    render: function() {
        return (
            <div className="feed-item">
                <a href={this.props.link}>{this.props.title}</a>
            </div>
        )
    }
});

module.exports=NewsItem;
