var React = require('react'),
    SessionStore = require('../stores/session'),
    ApiUtil = require('../util/ApiUtil'),
    HashHistory = require('react-router').hashHistory;

var Dashboard = React.createClass({
  render: function () {
    return (
      <div>Edit account form</div>
    );
  }
});

module.exports = Dashboard;
