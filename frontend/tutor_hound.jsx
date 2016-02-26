var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    hashHistory = ReactRouter.hashHistory,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    root = document.getElementById('root'),

    ApiUtil = require('./util/ApiUtil'),
    SessionStore = require('./stores/session'),

    Dashboard = require('./components/dashboard'),
    Navbar = require('./components/navbar');
    {/*
    MyJobs = require('./components/my_jobs'),
    NewJobForm = require('./components/new_job_form'),
    TestList = require('./components/test_list'),
    TutorPane = require('./components/tutor_pane'),
    MyWork = require('./components/my_work'),
    FindWork = require('./components/find_work'),
    Schedule = require('./components/schedule'),
    Register = require('./components/register_tutor'),
    Settings = require('./components/settings'),
    Login = require('./components/login'),
    Signup = require('./components/signup');
    */}

var App = React.createClass({
  render: function () {
    window.ApiUtil = ApiUtil;
    return (
      <div>
        <Navbar />
        {this.props.children}
        {/*
        <Footer />
        */}
      </div>
    );
  }
});

var routes = (
  <Route path="/" component={App} >
    <Route path="dashboard" component={Dashboard} />
    {/*
      <Route path="account" component={Account} />
      <Route path="JobForm" component={JobForm} />
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
    </Route>
    <Route path="login" component={Login} />
    <Route path="signup" component={Signup} />
    */}
  </Route>
);

$(document).on('DOMContentLoaded', function() {
  ReactDOM.render(<Router history={hashHistory} >{routes}</Router>,
    document.getElementById('root'));
});
