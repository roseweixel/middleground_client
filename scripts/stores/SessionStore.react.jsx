var MiddlegroundAppDispatcher = require('../dispatcher/MiddlegroundAppDispatcher.js');
var MiddlegroundConstants = require('../constants/MiddlegroundConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = MiddlegroundConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _accessToken = sessionStorage.getItem('accessToken');
var _email = sessionStorage.getItem('email');
var _errors = [];

var SessionStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  isLoggedIn: function() {
    return !!_accessToken;
  },

  getAccessToken: function() {
    return _accessToken;
  },

  getEmail: function() {
    return _email;
  },

  getErrors: function() {
    return _errors;
  }
});

SessionStore.dispatchToken = MiddlegroundAppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.LOGIN_RESPONSE:
      if (action.json && action.json.access_token) {
        _accessToken = action.json.access_token;
        _email = action.json.email;

        // Store access token and email in the session
        sessionStorage.setItem('accessToken', _accessToken);
        sessionStorage.setItem('email', _email);
      }

      if (action.errors) {
        _errors = action.errors;
      }
      SessionStore.emitChange();
      break;

    case ActionTypes.LOGOUT:
      _accessToken = null;
      _email = null;
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('email');
      SessionStore.emitChange();
      break;

    default:
  }

  return true;
});
