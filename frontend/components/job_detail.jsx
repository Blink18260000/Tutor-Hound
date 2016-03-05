var React = require('react'),
    Moment = require('moment');

//PROPS LIST:
//jobType - Job type: pending, completed, accepted, available
//job - The actual Job
//callback - Callback to accept this job (available)
//callback - Callback to cancel the job (pending)
//callback - Callback to remove tutor status (accepted)

var JobDetail = React.createClass({
  getInitialState: function () {
    return ({
      date: null,
      time: null,
      phone: null,
      button: (<div className="no-button"/>)
    });
  },

  componentDidMount: function () {
    var dateMoment = new Moment(this.props.job.date * 1000);

    if (this.props.jobType === "pending" || this.props.jobType === "completed") {
      var thisPhone = this.props.job.tutor_phone;
    } else {
      thisPhone = this.props.job.client_phone;
    }

    if (this.props.callback) {
      if (this.props.jobType === "available") {
        var thisButton = <div className="blue-button" onClick={this.props.callback} />;
      } else {
        thisButton = <div className="cancel-button" onClick={this.props.callback} />;
      }
    } else {
      thisButton = <div/>;
    }

    this.setState({
      date: dateMoment.format('MMMM Do'),
      time: dateMoment.format('h:mm A'),
      phone: thisPhone,
      button: thisButton
    });
  },

  render: function () {
    return (
      <div className="job-detail-container" onClick={this.props.callback}>
        <div className="profile-container">
          <div className="job-profile-pic" />
          <div className="profile-name">
            {
              this.props.job.tutor_f_name ?
              this.props.job.tutor_f_name + " " + this.props.job.tutor_l_name :
              "No Tutor Assigned"
            }
          </div>
        </div>

        <div className="job-detail-text-container">
          <div className="job-detail-test">
            Test: {this.props.job.test}
          </div>

          <div className="job-detail-text">
            Appointment Date: {this.state.date}
          </div>

          <div className="job-detail-text">
            Appointment Time: {this.state.time}
          </div>

          <div className="job-detail-text">
            Address: {this.props.job.address}
          </div>

          <div className="job-detail-text">
            Tutor Phone Number: {this.state.phone ? this.state.phone : ""}
          </div>
        </div>

        {this.state.button}
      </div>
    );
  }
});

module.exports = JobDetail;
