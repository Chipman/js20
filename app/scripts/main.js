'use strict';
var React = require('react');
var config = require('./config');
var initialData = require('../locales/initialdata.json');

var Banner = require('./modules/banner.jsx');
var Locations = require('./modules/location.jsx');
var Menu = require('./modules/menu.jsx');
var Partners = require('./modules/partners.jsx');
var Registration = require('./modules/participate.jsx');
var Schedule = require('./modules/schedule.jsx');
var Speakers = require('./modules/speakers.jsx');

//APPLICATION ROOT ELEMENT
var App = React.createClass({
  render: function() {
    return (
      <div className="page-wrapper">
        <Menu initData={initialData.menu}/>
        <Banner initData={initialData.banner}/>
        <Speakers initData={initialData.speakers}/>
        <Schedule initData={initialData.schedule}/>
        <Locations initData={initialData.location}/>
        <Registration initData={initialData.participate}/>
        <Partners initData={initialData.partners}/>
      </div>
    );
  }
});

React.render(<App />, document.getElementById('app'));
