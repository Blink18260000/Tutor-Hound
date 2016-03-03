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
    this.listenerToken = SessionStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _deactivate: function () {
    ApiUtil.deactivate();
  },

  render: function () {
    return (
      <div className="account-option-container">
        <div className="account-panel-header">
          <h3 >Account Deactivation</h3>
        </div>
        <div className="account-panel-body">
          Once you've deactivated your account, you will no longer be able to
          log in to the TutorHound site or apps. This action cannot be undone.
        </div>
        <div className="blue-button" onClick={this._deactivate}>
          Deactivate Account
        </div>
      </div>
    );
  }
});

module.exports = AccountDeactivate;
