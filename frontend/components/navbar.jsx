var React = require('react'),
    HashHistory = require('react-router').hashHistory;

var Navbar = React.createClass({
  _dashboard: function() {
    HashHistory.push("/dashboard");
  },

  _account: function() {
    HashHistory.push("/account");
  },

  render: function () {
    return (
      <div className="navbar">
        <div className="navbar-menu">
          <a className="navbar-logo logo-first" onClick={this._dashboard} >Tutor</a>
          <a className="navbar-logo logo-second" onClick={this._dashboard} >Hound</a>
          <div className="navbar-link-container">
            <a className="navbar-link" onClick={this._dashboard} >Home</a>
            <a className="navbar-link" onClick={this._account} >Account</a>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Navbar;
