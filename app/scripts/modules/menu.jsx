'use strict';
var React = require('react');

var Menu = React.createClass({
  componentDidMount: function() {
    var menu = document.getElementsByClassName('menu')[0];
    this.setState({menuHeight: menu.offsetHeight});
  },
  handleClick: function(e) {
    e.preventDefault();
    
    var link = e.target;
    var reference = link.href.substr(link.href.indexOf('#') + 1);
    var targetPosition = document.getElementById(reference).offsetTop;

    window.scroll(0, targetPosition - this.state.menuHeight);
  },
  render: function() {
    var handler = this.handleClick;
    var menuItems = this.props.initData.data.map(function(item) {
      return (
        <a href={'#' + item.title} className="navigation__item" onClick={handler} key={item.title}>
          {item.data}
        </a>
      );
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
