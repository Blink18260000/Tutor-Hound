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
    <IndexRoute path=":username" component={Profile}>
      <Route path="jobs" component={MyJobs}>
        <Route path="new" component={NewJobForm} />
        <Route path="tests" component={TestList} />
      </Route>
      <Route path="tutor" component={TutorPane}>
        <Route path="work" component={MyWork} />
        <Route path="find-work" component={FindWork} />
      </Route>
      <Route path="schedule" component={Schedule} />
      <Route path="register" component={Register} />
      <Route path="settings" component={Settings} />
    </IndexRoute>
    <Route path="login" component={Login} />
    <Route path="signup" component={Signup} />
  </Route>
);

$(document).on('DOMContentLoaded', function() {
  ReactDOM.render(<Router history={hashHistory} >{routes}</Router>,
    document.getElementById('root'));
});
