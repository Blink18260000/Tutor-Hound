var React = require('react'),
    SessionStore = require('../stores/session'),
    ApiUtil = require('../util/ApiUtil'),
    HashHistory = require('react-router').hashHistory;

var Dashboard = React.createClass({
  render: function () {
    return (
      <div className="account-option-container">
        <div className="account-panel-header">
          <h3>Edit Account</h3>
        </div>
        <div className="account-panel-body">
          some form
        </div>
      </div>
    );
  }
});

module.exports = Dashboard;
