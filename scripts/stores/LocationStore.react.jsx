var MiddlegroundAppDispatcher = require('../dispatcher/MiddlegroundAppDispatcher.js');
var MiddlegroundConstants = require('../constants/MiddlegroundConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = MiddlegroundConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _locations = [];
var _errors = [];
var _location = { streetAddress: "", city: "", state: "" };

var LocationStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeChangeListener(CHANGE_EVENT, callback);
  },

  getLocation: function() {
    return _location;
  },

  getErrors: function() {
    return _errors;
  }
});

LocationStore.dispatchToken = MiddlegroundAppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.RECEIVE_CREATED_LOCATION:
      if (action.json) {
        _locations.unshift(action.json.location);
        _errors = [];
      }

      if (action.errors) {
        _errors = action.errors;
      }

      LocationStore.emitChange();
      break;

    case ActionTypes.RECEIVE_LOCATION:
      if (action.json) {
        _location = action.json.location;
        _errors = [];
      }

      if (action.errors) {
        _errors = action.errors;
      }

      LocationStore.emitChange();
      break;
  }

  return true;
});

module.exports = LocationStore;
