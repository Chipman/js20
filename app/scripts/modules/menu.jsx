'use strict';
var React = require('react');

var Menu = React.createClass({
  render: function() {

    return <div>
    I am Menu
    <div>And here is my items: {JSON.stringify(this.props.initData.data)}</div>
    </div>;
  }
});

module.exports = Menu;
