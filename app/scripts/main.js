'use strict';
var React = require('react');
var config = require('./config');
var initialData = require('../locales/initialdata.json');

var Banner = require('./modules/banner.jsx');
var Locations = require('./modules/location.jsx');
var Menu = require('./modules/menu.jsx');
var Partners = require('./modules/partners.jsx');
var Registration = require('./modules/registration.jsx');
var Schedule = require('./modules/schedule.jsx');
var Speakers = require('./modules/speakers.jsx');

//APPLICATION ROOT ELEMENT
var App = React.createClass({
  render: function() {
    return (
      <div>
        <h1 className="main-header">This is main file!!!</h1>

        <Banner initData={initialData.banner}/>
        <Locations initData={initialData.location}/>
        <Menu initData={initialData.menu}/>
        <Partners initData={initialData.partners}/>
        <Registration initData={initialData.registration}/>
        <Schedule initData={initialData.schedule}/>
        <Speakers initData={initialData.speakers}/>

      </div>
    );
  }
});

React.render(<App />, document.getElementById('app'));
