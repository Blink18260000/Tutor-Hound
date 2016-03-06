var React = require('react'),
    SessionStore = require('../stores/session'),
    TestStore = require('../stores/test'),
    ClientJobStore = require('../stores/clientJobs'),
    AcceptedJobStore = require('../stores/tutorJobs'),
    AvailableJobStore = require('../stores/availableJobs'),
    ApiUtil = require('../util/ApiUtil'),
    HashHistory = require('react-router').hashHistory,
    Modal = require('react-modal'),
    JobDetail = require('./job_detail'),
    Moment = require('moment'),
    DatePicker = require('react-datepicker'),
    TestBlockContainer = require('./test_block_container'),
    LinkedStateMixin = require('react-addons-linked-state-mixin');

var customStyles = {
  overlay: {
    paddingLeft: '50%'
  },
  content: {
    position: 'relative',
    left: '-421px',
    right: '0',
    top: '40px',
    bottom: '0',
    width: '800px',
    maxHeight: '80vh',
    backgroundColor: '#f5f6f6',
    overflowY: 'auto'
  }
};

var JobPanel = React.createClass({
  getInitialState: function () {
    return {testOptions: [], timeOptions: [], builtIncompleteJobs: [],
      builtCompleteJobs: [], builtAcceptedJobs: [], builtAvailableJobs: [],
      availableJobs: [], acceptedJobs: [], testData: TestStore.getTestData(),
      userData: SessionStore.info(), workModalIsOpen: false, clientJobs: [],
      appointmentDate: Moment().startOf('day').add(1, 'day'),
      navbarPast: "job-list-navbar-tab",
      navbarCurrent: "job-list-navbar-tab job-list-selected",
      navbarAccepted: "job-list-navbar-tab",
      jobTabSelected: 1
    };
  },

  componentDidMount: function () {
    this.listenerToken = SessionStore.addListener(this._onSessionChange);
    this.listenerToken2 =
      TestStore.addListener(this._onTestChange);
    this.listenerToken3 =
      ClientJobStore.addListener(this._onClientJobChange);
    this.listenerToken4 =
      AvailableJobStore.addListener(this._onAvailableJobChange);
    this.listenerToken5 =
      AcceptedJobStore.addListener(this._onAcceptedJobChange);
    this._onClientJobChange();
    this._onAvailableJobChange();
    this._onTestChange();
  },

  _onSessionChange: function () {
    this.setState({userData: SessionStore.info()});
  },

  _onTestChange: function () {
    var testData = TestStore.getTestData();
    for (var i = 0; i < testData.length; i++) {
      var testOption = testData[i];
      this.state.testOptions.push(
        <option key={i} value={testOption.id}>{testOption.name}</option>
      );
    }
    this.setState({testData: testData});
  },

  _cancelJob: function (job, e) {
    e.preventDefault();
    console.log('cancel');
    console.log(job);
    console.log(e);
    ApiUtil.deleteJob(job.id);
  },

  _cancelWork: function (job, e) {
    console.log('cancel work');
    console.log(job);
    console.log(e);
    ApiUtil.declineJob(job.id, job);
  },

  _acceptWork: function (job, e) {
    e.preventDefault();
    console.log('accept');
    console.log(job);
    console.log(e);
    ApiUtil.acceptJob(job.id, job);
  },

  _onClientJobChange: function () {
    this.state.builtCompleteJobs = [];
    this.state.builtIncompleteJobs = [];
    var clientJobs = ClientJobStore.getJobList();
    for (var i = 0; i < clientJobs.length; i++) {
      var job = clientJobs[i];
      if (job.completed || (new Moment().unix() > job.date)) {
        var builtJob = (
          <JobDetail
            key={job.id}
            jobType="completed"
            job={clientJobs[i]}
          />
        );
        this.state.builtCompleteJobs.push(builtJob);
      } else {
        builtJob = (
          <JobDetail
            key={job.id}
            jobType="pending"
            job={clientJobs[i]}
            callback={this._cancelJob}
          />
        );
        this.state.builtIncompleteJobs.push(builtJob);
      }
    }
    this.setState({clientJobs: clientJobs});
  },

  _onAcceptedJobChange: function () {
    this.state.builtAcceptedJobs = [];
    var acceptedJobs = AcceptedJobStore.getJobList();
    for (var i = 0; i < acceptedJobs.length; i++) {
      var job = acceptedJobs[i];
      this.state.builtAcceptedJobs.push(
        <JobDetail
          key={job.id}
          jobType="accepted"
          job={acceptedJobs[i]}
          callback={this._cancelWork}
        />
      );
    }
    this.setState({acceptedJobs: acceptedJobs});
  },

  _onAvailableJobChange: function () {
    this.state.builtAvailableJobs = [];
    var availableJobs = AvailableJobStore.getJobList();
    for (var i = 0; i < availableJobs.length; i++) {
      var job = availableJobs[i];
      this.state.builtAvailableJobs.push(
        <JobDetail
          key={job.id}
          jobType="available"
          job={availableJobs[i]}
          callback={this._acceptWork}
        />
      );
    }
    this.setState({availableJobs: availableJobs});
  },

  openWorkModal: function () {
    this.setState({workModalIsOpen: true});
  },

  _getMoreWork: function () {
    this.openWorkModal();
  },

  closeWorkModal: function () {
    this.setState({workModalIsOpen: false});
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
    this.listenerToken2.remove();
    this.listenerToken3.remove();
    this.listenerToken4.remove();
    this.listenerToken5.remove();
  },

  _displayPanel: function () {
    switch (this.state.jobTabSelected) {
      case 1:
        if (this.state.builtIncompleteJobs.length > 0) {
          return this.state.builtIncompleteJobs;
        } else {
          return (
            <div className="no-job-display" >
              You have no upcoming appointments.
            </div>
          );
        }
        break;
      case 2:
        if (this.state.builtCompleteJobs.length > 0) {
          return this.state.builtCompleteJobs;
        } else {
          return (
            <div className="no-job-display" >
              You have no past appoinments.
            </div>
          );
        }
        break;
      case 3:
        if (this.state.builtAcceptedJobs.length > 0) {
          return (
            <div>
              {this.state.builtAcceptedJobs}
              <div className="spacer" />
              <div className="blue-button" onClick={this._getMoreWork}
                >Get More Work</div>
            </div>
          );
        } else {
          return (
            <div>
              <div className="no-job-display" >
                You have no accepted jobs.
              </div>
              <div className="spacer" />
              <div className="blue-button" onClick={this._getMoreWork}
                >Get More Work</div>
            </div>
          );
        }
        break;
    }
  },

  _selectCurrent: function () {
    this.setState({
      navbarPast: "job-list-navbar-tab",
      navbarCurrent: "job-list-navbar-tab job-list-selected",
      navbarAccepted: "job-list-navbar-tab",
      jobTabSelected: 1
    });
  },

  _selectPast: function () {
    this.setState({
      navbarPast: "job-list-navbar-tab job-list-selected",
      navbarCurrent: "job-list-navbar-tab",
      navbarAccepted: "job-list-navbar-tab",
      jobTabSelected: 2
    });
  },

  _selectAccepted: function () {
    this.setState({
      navbarPast: "job-list-navbar-tab",
      navbarCurrent: "job-list-navbar-tab",
      navbarAccepted: "job-list-navbar-tab job-list-selected",
      jobTabSelected: 3
    });
  },

  render: function () {
    return (
      <div className="job-list-container">
        <ul className="job-list-navbar">
          <li key={1} className={this.state.navbarCurrent}
            onClick={this._selectCurrent} >Appointments</li>
          <li key={2} className={this.state.navbarPast}
            onClick={this._selectPast} >Past Appointments</li>
          {
            this.state.userData.tutor_id ? (
              <li key={3} className={this.state.navbarAccepted}
                onClick={this._selectAccepted} >Accepted Jobs</li>
            ) : <li />
          }
        </ul>
        <div className="job-list-display-container">
          {this._displayPanel()}
        </div>

        <Modal
          isOpen={this.state.workModalIsOpen}
          onRequestClose={this.closeWorkModal}
          style={customStyles} >
          <h2>Get New Tutoring Jobs</h2>
          <button onClick={this.closeWorkModal}
            className="modal-close">close</button>
          {
            this.state.builtAvailableJobs.length > 0 ?
              this.state.builtAvailableJobs :
              <div className="notification">
                You are not qualified for any requests in your region.
                Please check back later.
              </div>
          }
        </Modal>
      </div>
    );
  }
});

module.exports = JobPanel;
