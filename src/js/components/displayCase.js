var React = require('react');
var NewsContainer = require('./newsContainer');
var BasicLayout = require('./basicLayout.js')

var DisplayCase = React.createClass({
    render: function() {
        return (
            <div className="display-case col-xs-9">
                <BasicLayout data={this.props.data} />
            </div>
        );
    }
});

module.exports=DisplayCase;
