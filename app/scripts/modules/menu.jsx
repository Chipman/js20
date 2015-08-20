'use strict';
var React = require('react');

var Menu = React.createClass({
  render: function() {
    var menuItems = this.props.initData.data.map(function(item) {
      return <a href={'#' + item.title} className="navigation__item" key={item.title}>{item.data}</a>
    });
    return (
      <div className="menu">
        <img src="" className="menu__logo" alt="" />
        <nav className="navigation">
          {menuItems}
        </nav>
      </div>
    );
  }
});

module.exports = Menu;
