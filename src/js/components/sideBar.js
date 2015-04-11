var React = require('react');
var AddSourceForm = require('./addSourceForm');

var SideBar = React.createClass({
    getInitialState: function() {
        return {sourceForm: false};
    },
    toggleHidden: function() {
        if(this.state.sourceForm) {
            this.setState({sourceForm: false});
        } else
            this.setState({sourceForm: true});
    },
    render: function() {
        return (
            <div>
                <button onClick={this.toggleHidden}>Hide</button>
                {this.state.sourceForm ? <AddSourceForm url={this.props.url} /> : null }
            </div>
        )
    }
});

module.exports=SideBar
