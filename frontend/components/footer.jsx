var React = require('react'),
    HashHistory = require('react-router').hashHistory;

var Footer = React.createClass({
  render: function () {
    return (
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-title">About the Author</div>
          <div className="footer-link">Eric Summins</div>
          <div className="footer-link">Email: esummins@gmail.com</div>
          <div className="footer-link">Phone Number: (404)-313-0710</div>
          <a className="footer-link"
            href="https://github.com/Blink18260000" >Github Profile</a>
          <a className="footer-link"
            href="https://www.linkedin.com/in/esummins" >LinkedIn Profile</a>
        </div>
      </div>
    );
  }
});

module.exports = Footer;
