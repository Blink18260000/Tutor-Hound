var React = require('react');

var IconBlock = React.createClass({
  render: function () {
    return (
      <div className="test-icon-block" onClick={this.props.callback}>
        <div className="test-icon-shadow-block">
          <div className={"test-icon-image " + this.props.subjectClass} />
          <div className="test-icon-text">
            <span className="test-icon-main-text" >
              {this.props.testName}</span>
            <span className="test-icon-sub-text" >
              {this.props.blockText}</span>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = IconBlock;
