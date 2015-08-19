'use strict';
var React = require('react');

var Banner = React.createClass({
  render: function() {
    return <div>
    I am Banner
      <div>And here is my title: {this.props.initData.data.title}</div>
    </div>;
  }
});

module.exports = Banner;
