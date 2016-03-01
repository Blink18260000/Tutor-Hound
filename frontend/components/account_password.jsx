var React = require('react'),
    SessionStore = require('../stores/session'),
    ApiUtil = require('../util/ApiUtil'),
    HashHistory = require('react-router').hashHistory;

var AccountPassword = React.createClass({
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

  _submit: function () {

  },

  _cancel: function () {

  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  render: function () {
    return (
      <div className="account-option-container">
        <div className="account-panel-header">
          <h3 >Change Password</h3>
        </div>
        <div className="account-panel-body">
          <label className="account-input-label" htmlFor="old-password">
            Enter current password:</label>
          <input id="old-password" className="account-input-input"
            name="old-password" type="password" />

          <label className="account-input-label" htmlFor="new-password-1">
            Enter new password:</label>
          <input id="new-password-1" className="account-input-input"
            name="new-password-1" type="password" />

          <label className="account-input-label" htmlFor="new-password-2">
            Confirm new password:</label>
          <input id="new-password-2" className="account-input-input"
            name="new-password-2" type="password" />

          <div className="gray-button" onClick={this._cancel}>Cancel</div>
          <div className="blue-button" onClick={this._submit}>Submit</div>
        </div>
      </div>
    );
  }
});

module.exports = AccountPassword;
