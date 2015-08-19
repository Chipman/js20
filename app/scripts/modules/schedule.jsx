'use strict';
var React = require('react');

var Schedule = React.createClass({
  render: function() {
    return <div>
    I am Schedule
    <div>And here is my title: {this.props.initData.data.title}</div>
    </div>;
  }
});

module.exports = Schedule;
