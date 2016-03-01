var React = require('react'),
    SessionStore = require('../stores/session'),
    ApiUtil = require('../util/ApiUtil'),
    HashHistory = require('react-router').hashHistory;

var AccountInfo = React.createClass({
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
          <h3 >Become a Tutor</h3>
        </div>
        <div className="account-panel-body">
          {this.state.userData.tutor_id ?
              <span>You are already registered as a tutor!</span>
              :
              <div className="blue-button" onClick={this._register}>Register</div>
          } {/* This button will open the tutor registration modal */}
        </div>
      </div>
    );
  }
});

module.exports = AccountInfo;
