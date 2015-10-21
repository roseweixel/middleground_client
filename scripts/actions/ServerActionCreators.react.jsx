var MiddlegroundAppDispatcher = require('../dispatcher/MiddlegroundAppDispatcher.js');
var MiddlegroundConstants = require('../constants/MiddlegroundConstants.js');

var ActionTypes = MiddlegroundConstants.ActionTypes;

module.exports = {
  receiveLogin: function(json, errors) {
    MiddlegroundAppDispatcher.handleServerAction({
      type: ActionTypes.LOGIN_RESPONSE,
      json: json,
      errors: errors
    });
  }
};
