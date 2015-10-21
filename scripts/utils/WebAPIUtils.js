var ServerActionCreators = require('../actions/ServerActionCreators.react.jsx');
var request = require('superagent');

module.exports = {
  login: function(email, password) {
    request.post('http://localhost:3000/api/v1/login')
      .send({ email: email, password: password, grant_type: 'password' })
      .set('Accept', 'application/json')
      .end(function(error, res) {
        if (res) {
          if (res.error) {
            var errorMessages = _getErrors(res);
            ServerActionCreators.receiveLogin(null, errorMessages);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.receiveLogin(json, null);
          }
        }
      });
  }
};
