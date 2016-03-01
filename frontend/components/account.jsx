var React = require('react'),
    SessionStore = require('../stores/session'),
    ApiUtil = require('../util/ApiUtil'),
    HashHistory = require('react-router').hashHistory;

var options = ["account", "password", "transactions", "become a Tutor",
  "deactivate", "log Out"];

var Dashboard = React.createClass({
  getInitialState: function () {
    return {current: ["account"], userData: SessionStore.info()};
  },

  _onChange: function () {
    this.setState({userData: SessionStore.info()});
  },

  componentDidMount: function () {
    ApiUtil.fetchUserData();
    ApiUtil.fetchTutor();
    this.listenerToken = SessionStore.addListener(this._onChange);
    this.state["current"] = "account";
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _handleClick: function(option) {
    switch (option) {
      case "account":
        HashHistory.push("/account");
        this.setState({current: "account"});
        break;
      case "password":
        HashHistory.push("/account/password");
        this.setState({current: "password"});
        break;
      case "transactions":
        HashHistory.push("/account/transactions");
        this.setState({current: "transactions"});
        break;
      case "become a Tutor":
        HashHistory.push("/account/register");
        this.setState({current: "become a Tutor"});
        break;
      case "deactivate":
        HashHistory.push("/account/deactivate");
        this.setState({current: "deactivate"});
        break;
      case "log Out":
        ApiUtil.logOut();
        break;
    }
  },

  render: function () {
    return (
      <div className="container">
        <div className="content-container">
          <h1>Your Account</h1>
          <div className="account-management-container group">
            <ul className="account-nav">
              {
                options.map(function(option) {
                  var selected = (option === this.state["current"]);
                  if (selected) {
                    var navClass = "account-nav-option-container-selected";
                    var click = function() {};
                  } else {
                    navClass = "account-nav-option-container";
                    click = this._handleClick.bind(this, option);
                  }
                  return (
                    <li className={navClass} key={option}
                      onClick={click}>
                      <span className="account-nav-option">
                        {option[0].toUpperCase().concat(option.slice(1))}
                      </span>
                    </li>
                  );
                }, this)
              }
            </ul>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Dashboard;
