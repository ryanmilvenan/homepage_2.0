var React = require('react');
var ResponsiveReactGridLayout = require('react-grid-layout').Responsive;
var _ = require('lodash');
var NewsContainer = require('./newsContainer');

var BasicLayout = React.createClass({
  
propTypes: {
    onLayoutChange: React.PropTypes.func.isRequired
  },

getDefaultProps: function() {
	return {
      className: "layout",
      rowHeight: 30,
      cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}
    };
},

  getInitialState: function() {
    return {
      layouts: {lg: this.generateLayout()},
      currentBreakpoint: 'lg'
    };
  },

  generateDOM: function() {
    var counter = 0
    var containers = this.props.data.map(function(container) {
        counter += 1
            return (
                <div key={counter}>
                    <NewsContainer key={container.id} url={container.url} title={container.title} sourceID={container.sourceID} numItems={10} />
                </div>
            );
        });
    return containers

    // return _.map(this.state.layouts.lg, function(l, i) {
    //   return (
    //     <div key={i} className={l.static ? 'static' : ''}>
    //       {l.static ?
    //         <span className="text" title="This item is static and cannot be removed or resized.">Static - {i}</span>
    //         : <span className="text">{i}</span>
    //       }
    //     </div>);
    // });
  },

  generateLayout: function() {
    var p = this.props;
    return _.map(_.range(0, 25), function(item, i) {
      var y = _.result(p, 'y') || Math.ceil(Math.random() * 4) + 1;
      return {x: _.random(0, 5) * 2 % 12, y: Math.floor(i / 6) * y, w: 2, h: y, i: i, static: Math.random() < 0.05};
    });
  },

  onBreakpointChange: function(breakpoint) {
    this.setState({
      currentBreakpoint: breakpoint
    });
  },

  onLayoutChange: function(layout) {
    // this.props.onLayoutChange(layout);
  },

  onNewLayout: function() {
    this.setState({
      layouts: {lg: this.generateLayout()}
    });
  },

  render: function() {
    return (
      <div>
        <div>Current Breakpoint: {this.state.currentBreakpoint} ({this.props.cols[this.state.currentBreakpoint]} columns)</div>
        <button onClick={this.onNewLayout}>Generate New Layout</button>
        <ResponsiveReactGridLayout
            layouts={this.state.layouts}
            onBreakpointChange={this.onBreakpointChange}
            onLayoutChange={this.onLayoutChange}
            useCSSTransforms={true}
            {...this.props}>
          	{this.generateDOM()}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
});

module.exports = BasicLayout;

