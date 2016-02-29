var React = require('react'),
    SessionStore = require('../stores/session'),
    ApiUtil = require('../util/ApiUtil'),
    HashHistory = require('react-router').hashHistory;

var AccountDeactivate = React.createClass({
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
      <div className="account-option-container">
        <div className="account-panel-header">
          <h3 >Account Deactivation</h3>
        </div>
        <div className="account-panel-body">
          Once you've deactivated your accoun, you will no longer be able to
          log in to the TutorHound sire or apps. This action cannot be undone.
        </div>
        <div className="account-panel-edit-button" onClick={this._deactivate}>
          Deactivate Account
        </div>

      </div>
    );
  }
});

module.exports = AccountDeactivate;
