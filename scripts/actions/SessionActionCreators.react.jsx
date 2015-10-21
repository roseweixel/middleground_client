var MiddleGroundAppDispatcher = require('../dispatcher/MiddleGroundAppDispatcher.js');
var MiddlegroundConstants = require('../constants/MiddlegroundConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = MiddlegroundConstants.ActionTypes;

module.exports = {
  signup: function(email, password, passwordConfirmation) {
    MiddleGroundAppDispatcher.handleViewAction({
      type: ActionTypes.SIGNUP_REQUEST,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation
    });
    WebAPIUtils.signup(email, password, passwordConfirmation);
  },

  login: function(email, password) {
    MiddleGroundAppDispatcher.handleViewAction({
      type: ActionTypes.LOGIN_REQUEST,
      email: email,
      password: password
    });
    WebAPIUtils.login(email, password);
  },

  logout: function() {
    MiddleGroundAppDispatcher.handleViewAction({
      type: ActionTypes.LOGOUT
    });
  }
};
