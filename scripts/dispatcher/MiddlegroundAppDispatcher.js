var MiddlegroundConstants = require('../constants/MiddlegroundConstants.js');
var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');

var PayloadSources = MiddlegroundConstants.PayloadSources;

var MiddlegroundAppDispatcher = assign(new Dispatcher(), {
  handleServerAction: function(action) {
    var payload = {
      source: PayloadSources.SERVER_ACTION,
      action: action
    };
    this.dispatch(payload);
  },

  handleViewAction: function(action) {
    var payload = {
      source: PayloadSources.VIEW_ACTION,
      action: action
    };
    this.dispatch(payload);
  }
});

module.exports = MiddlegroundAppDispatcher;
