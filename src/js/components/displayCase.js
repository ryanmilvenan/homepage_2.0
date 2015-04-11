var React = require('react');
var NewsContainer = require('./newsContainer');

var DisplayCase = React.createClass({
    render: function() {
        var containers = this.props.data.map(function(container) {
            return (
                <NewsContainer key={container.id} url={container.url} title={container.title} sourceID={container.sourceID} numItems={10} />
            );
        });

        var chunks = [];
        var i,j,chunk = 4;
        for(i = 0, j = containers.length; i<j; i += chunk) {
            var chunkArr = containers.slice(i, i+chunk);
            chunks.push(chunkArr);
        }

        var rows = chunks.map(function(chunk) {
            return(
                <div className="row">
                    {chunk}
                </div>
            );
        }) 

        return (
            <div className="display-case nine columns">
                {rows}
            </div>
        );
    }
});

module.exports=DisplayCase;
