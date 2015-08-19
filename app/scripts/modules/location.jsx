'use strict';
var React = require('react');

var Locations = React.createClass({
  render: function() {
    return <div>
    I am Locations
    <div>And here is my title: {this.props.initData.data.title}</div>
    </div>;
  }
});

module.exports = Locations;
