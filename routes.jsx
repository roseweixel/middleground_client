var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var MiddlegroundApp = require('./components/MiddlegroundApp.react.jsx');
var LoginPage = require('./components/session/LoginPage.react.jsx');
var UsersPage = require('./components/users/UsersPage');
var UserPage = require('./components/users/UserPage');
var SignupPage = require('./components/session/SignupPage');

module.exports = (
  <Route name="app" path="/" handler={MiddlegroundApp}>
    <DefaultRoute handler={LoginPage}/>
    <Route name="login" path="/login" handler={LoginPage}/>
    <Route name="signup" path="/signup" handler={SignupPage}/>
    <Route name="users" path="/users" handler={UsersPage}/>
    <Route name="user" path="/users/:userId" handler={UserPage}/>
  </Route>
);
