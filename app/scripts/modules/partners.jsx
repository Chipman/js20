'use strict';
var React = require('react');

var Partners = React.createClass({
  render: function() {
    return <div>
    I am Partners
    <div>And here is my title: {this.props.initData.data.title}</div>
    </div>;
  }
});

module.exports = Partners;
