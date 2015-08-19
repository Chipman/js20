'use strict';
var React = require('react');

var Speakers = React.createClass({
  render: function() {
    return <div>
    I am Speakers
    <div>And here is my title: {this.props.initData.data.title}</div>
    </div>;
  }
});

module.exports = Speakers;
