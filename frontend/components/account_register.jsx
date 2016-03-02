var React = require('react'),
    SessionStore = require('../stores/session'),
    ApiUtil = require('../util/ApiUtil'),
    HashHistory = require('react-router').hashHistory,
    LinkedStateMixin = require('react-addons-linked-state-mixin');

var AccountInfo = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return {modalIsOpen: false, userData: SessionStore.info()};
  },

  _onChange: function () {
    this.setState({userData: SessionStore.info()});
  },

  componentDidMount: function () {
    ApiUtil.fetchUserData();
    ApiUtil.fetchTutor();
    this.listenerToken = SessionStore.addListener(this._onChange);
  },

  _register: function () {
    ApiUtil.registerTutor(this.linkState('f_name').value,
                          this.linkState('l_name').value);
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
            <form onSubmit={this._register}>
              <label htmlFor="f_name">First Name:</label>
              <input type="text" name="f_name" valueLink={this.linkState('f_name')} />
              <div className="spacer" />
              <label htmlFor="l_name">Last Name:</label>
              <input type="text" name="l_name" valueLink={this.linkState('l_name')} />
              <div className="spacer" />
              <input type="submit" className="blue-button register-button" value="Register"/>
            </form>
          }
        </div>
      </div>
    );
  }
});

module.exports = AccountInfo;
