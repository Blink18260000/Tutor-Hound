var React = require('react'),
    SessionStore = require('../stores/session'),
    ApiUtil = require('../util/ApiUtil'),
    HashHistory = require('react-router').hashHistory;



var Profile = React.createClass({
  // getInitialState: function () {
  //   return {userData: SessionStore.info()};
  // },
  //
  // _onChange: function () {
  //   this.setState({userData: SessionStore.info()});
  //
  // },
  //
  // componentDidMount: function () {
  //   this.listenerToken = SessionStore.addListener(this._onChange);
  // },
  //
  // componentWillUnmount: function () {
  //   this.listenerToken.remove();
  // },

  render: function () {
    return (
      <div>
        potato?
        {this.props.children}
      </div>
    );
  }
});

module.exports = Profile;
