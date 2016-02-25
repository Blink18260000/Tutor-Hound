var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    hashHistory = ReactRouter.hashHistory,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    root = document.getElementById('root'),

    ApiUtil = require('./util/ApiUtil');

var App = React.createClass({
  render: function () {
    window.ApiUtil = ApiUtil;
    return (
      <div>
        <h1>Main landing page</h1>
        {this.props.children}
      </div>
    );
  }
});

var routes = (
  <Route path="/" component={App} >

  </Route>
);

$(document).on('DOMContentLoaded', function() {
  ReactDOM.render(<Router history={hashHistory} >{routes}</Router>,
    document.getElementById('root'));
});
