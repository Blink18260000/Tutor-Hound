var React = require('react'),
    SessionStore = require('../stores/session'),
    HashHistory = require('react-router').hashHistory;

var AccountInfo = React.createClass({
  getInitialState: function () {
    return {userData: SessionStore.info()};
  },

  _onChange: function () {
    this.setState({userData: SessionStore.info()});
  },

  _edit: function() {
    HashHistory.push("/account/edit");
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
          <h3 >Account</h3>
          <div className="blue-button button-small header-button"
            onClick={this._edit}>Edit</div>
        </div>
        <div className="account-panel-body">

        </div>
      </div>
    );
  }
});

module.exports = AccountInfo;
