'use strict';
var config = require('./config');

var elements = (function elements() {
  var elements = {};
  var list = config.listOfModules;

  function Element(title) {
    this.title = title;
    this.data = require('../locales/' + title + '.json');
  }

  list.forEach(function(item) {
    var newItem = new Element(item);
    elements[item] = newItem;
  });

  function createMenu() {
    var menuData = [];

    for (var el in elements) {
      if (elements[el].title != 'partners') {
        var menuItem = {
          title: elements[el].title,
          data: elements[el].data.title
        }
        menuData.push(menuItem);
      }
    }
    return {
      title: 'menu',
      data: menuData
    }
  }
  elements.menu = createMenu();
  return elements;
})();

module.exports = elements;
