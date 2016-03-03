var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    hashHistory = ReactRouter.hashHistory,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    root = document.getElementById('root'),
    Modal = require('react-modal'),
    Moment = require('moment'),

    ApiUtil = require('./util/ApiUtil'),
    SessionStore = require('./stores/session'),

    Dashboard = require('./components/dashboard'),
    Navbar = require('./components/navbar'),
    Footer = require('./components/footer'),
    Account = require('./components/account'),
    AccountInfo = require('./components/account_info'),
    EditAccountInfo = require('./components/edit_account_info'),
    AccountPassword = require('./components/account_password'),
    AccountTransactions = require('./components/account_transactions'),
    AccountRegisterTutor = require('./components/account_register'),
    AccountDeactivate = require('./components/account_deactivate');

var App = React.createClass({
  componentDidMount: function() {
    hashHistory.push("dashboard");
    ApiUtil.fetchTests();
    ApiUtil.fetchUserData();
    ApiUtil.fetchJobsAsClient();
    this.listenerToken = SessionStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    if (SessionStore.info().tutor_id) {
      ApiUtil.fetchTutor();
      ApiUtil.fetchJobsAsTutor();
      ApiUtil.fetchAvailableJobs();
    }
    this.listenerToken.remove();
  },

  render: function () {
    window.ApiUtil = ApiUtil;
    window.Moment = Moment;
    return (
      <div className="container">
        <Navbar />
        {this.props.children}
        <Footer />
      </div>
    );
  }
});

var routes = (
  <Route path="/" component={App} >
    <Route path="dashboard" component={Dashboard} />
    <Route path="account" component={Account}>
      <IndexRoute component={AccountInfo} />
      <Route path="edit" component={EditAccountInfo}/>
      <Route path="password" component={AccountPassword} />
      <Route path="transactions" component={AccountTransactions} />
      <Route path="register" component={AccountRegisterTutor} />
      <Route path="deactivate" component={AccountDeactivate} />
    </Route>
  </Route>
);


$(document).on('DOMContentLoaded', function() {
  if (document.getElementById('root')) {
    Modal.setAppElement(document.getElementById('root'));
    ReactDOM.render(<Router history={hashHistory} >{routes}</Router>,
      document.getElementById('root'));
  }
});
