var React = require('react'),
    SessionStore = require('../stores/session'),
    HashHistory = require('react-router').hashHistory;

var AccountTransactions = React.createClass({
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

  render: function () {
    return (
      <div className="account-option-container">
        <div className="account-panel-header">
          <h3>Transactions</h3>

        </div>
        <div className="account-panel-body">
          some transaction history
        </div>
      </div>
    );
  }
});

module.exports = AccountTransactions;
