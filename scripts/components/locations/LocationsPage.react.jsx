var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var LocationStore = require('../../stores/LocationStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var LocationActionCreators = require('../../actions/LocationActionCreators.react.jsx');
var Router = require('react-router');
var Link = Router.Link;

var LocationsPage = React.createClass({
  getInitialState: function() {
    return {
      locations: LocationStore.getAllLocations(),
      errors: []
    };
  },

  componentDidMount: function() {
    LocationStore.addChangeListener(this._onChange);
    LocationActionCreators.loadLocations();
  },

  componentWillUnmount: function() {
    LocationStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      locations: LocationStore.getAllLocations(),
      errors: LocationStore.getErrors()
    });
  },

  render: function() {
    var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
    return (
      <div>
       {errors}
        <div className="row">
          <LocationsList locations={this.state.locations}/>
        </div>
      </div>
    );
  }
});

var LocationItem = React.createClass({
  render: function() {
    return (
      <li className="location">
        <div className="location__street_address">
          <Link to="location" params={ {locationId: this.props.location.id} }>
            {this.props.location.streetAddress}
          </Link>
        </div>
        <div className="location__city">
          {this.props.location.city}
        </div>
        <div className="location__state">
          {this.props.location.state}
        </div>
      </li>
    );
  }
});

var LocationsList = React.createClass({
  render: function() {
    return (
      <ul className="large-8 medium-10 small-12 small-centered columns">
        {this.props.locations.map(function(location, index) {
          return <LocationItem location={location} key={"location-" + index}/>
        })}
      </ul>
    );
  }
});

module.exports = LocationsPage;
