var React = require('react'),
    IconBlock = require('./icon_block');

var TestBlockContainer = React.createClass({
  render: function () {
    return (
      <div className="test-list-container">
        <h2>Top Tests to Study For</h2>
        <div className="test-icon-container">
          <div className="test-icon-row">
            <IconBlock
              testName="SAT"
              blockText="The most accepted standardized test."
              callback={this.props.callback.bind(null, 1)}
              subjectClass="tib-sat"
            />
            <IconBlock
              testName="ACT"
              blockText="The most accepted SAT alternative."
              callback={this.props.callback.bind(null, 23)}
              subjectClass="tib-act"
            />
            <IconBlock
              testName="SAT 2: U.S. History"
              blockText="Everything from pre-revolution to the modern day."
              callback={this.props.callback.bind(null, 9)}
              subjectClass="tib-sat2ush"
            />
          </div>
          <div className="test-icon-row">
            <IconBlock
              testName="SAT 2: World History"
              blockText="A thorough test of knowledge of international events and history."
              callback={this.props.callback.bind(null, 10)}
              subjectClass="tib-sat2wh"
            />
            <IconBlock
              testName="SAT 2: Spanish"
              blockText="Get your language credit before college starts."
              callback={this.props.callback.bind(null, 11)}
              subjectClass="tib-sat2span"
            />
            <IconBlock
              testName="SAT 2: Physics"
              blockText="The most popular subject test."
              callback={this.props.callback.bind(null, 5)}
              subjectClass="tib-sat2phys"
            />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = TestBlockContainer;
