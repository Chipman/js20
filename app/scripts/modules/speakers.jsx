'use strict';
var React = require('react');

var Speakers = React.createClass({
  render: function() {
    var payload = this.props.initData.data;
    var items = payload.data.map(function(speakerData) {
      return (
        <div className="speaker">
          <img className="speaker__picture" src={speakerData.img_url} alt={speakerData.header} />
          <h3 className="speaker__header">{speakerData.header}</h3>
          <small className="speaker__sub-header">{speakerData.sub_header}</small>
          <p className="speaker__description">{speakerData.description}</p>
        </div>
      )
    });
    return (
      <section id="speakers" className="speakers-section">
        <h2 className="speakers-section__header">{payload.title}</h2>
        {items}
      </section>
    );
  }
});

module.exports = Speakers;
