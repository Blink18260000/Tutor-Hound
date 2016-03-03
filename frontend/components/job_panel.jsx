var React = require('react');
//PROPS LIST:
//jobType - Job type: pending, completed, accepted, available
//job - The actual Job

var IconBlock = React.createClass({
  render: function () {
    return (
      <div className="job-list-container">
        
      </div>
    );
  }
});

module.exports = IconBlock;

/*
  <div className="job-list incomplete-jobs">
    <h2>Pending Jobs</h2>
    {this.state.builtIncompleteJobs}
  </div>
  <div className="job-list complete-jobs">
    <h2>Past Jobs</h2>
    {this.state.builtCompleteJobs}
  </div>
  {
    this.state.userData.tutor_id ? (
      <div className="job-list accepted-jobs">
        <h2>Accepted Jobs</h2>
        <div className="spacer" />
        {
          this.state.builtAcceptedJobs.length > 0 ?
            this.state.builtAcceptedJobs :
            <div className="notification">
              You have no upcoming jobs. Click the button to find new work!
            </div>
        }
        <div className="spacer" />
        <div className="blue-button" onClick={this._getMoreWork} >Get More Work</div>
      </div> ) :
      <div />
  }
*/
