'use strict';
var React = require('react');

var Registration = React.createClass({
  render: function() {
    return <div>
    I am Registration
    <div>And here is my title: {this.props.initData.data.title}</div>
    </div>;
  }
});

module.exports = Registration;
