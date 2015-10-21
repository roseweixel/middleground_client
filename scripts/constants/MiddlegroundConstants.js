var keyMirror = require('keymirror');

var APIRoot = "http://localhost:3000";

module.exports = {
  APIEndpoints: {
    LOGIN:        APIRoot + "/api/v1/login",
    USERS:        APIRoot + "/api/v1/users",
    LOCATIONS:    APIRoot + "/api/v1/locations"
  },

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

  ActionTypes: keyMirror({
    // Session
    LOGIN_REQUEST: null,
    LOGIN_RESPONSE: null,

    // Routes
    REDIRECT: null,

    LOAD_USERS: null,
    RECEIVE_USERS: null,
    LOAD_USER: null,
    RECEIVE_USER: null,
    CREATE_LOCATION: null,
    RECEIVE_CREATED_LOCATION: null
  })
};
