var React = require('react'),
    SessionStore = require('../stores/session'),
    ApiUtil = require('../util/ApiUtil'),
    HashHistory = require('react-router').hashHistory;



var Dashboard = React.createClass({
  getInitialState: function () {
    return {userData: SessionStore.info()};
  },

  _onChange: function () {
    this.setState({userData: SessionStore.info()});
  },

  componentDidMount: function () {
    ApiUtil.fetchUserData();
    ApiUtil.fetchTutor();
    this.listenerToken = SessionStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  render: function () {
    return (
      <div className="dashboard-container">
        <div className="dashboard-content-container">
          <div className="salute-container">
            <div className="profile-pic" />
            <h1 className="salute-header">Welcome to TutorHound!</h1>

          </div>
        </div>
      </div>
    );
  }
});

module.exports = Dashboard;
