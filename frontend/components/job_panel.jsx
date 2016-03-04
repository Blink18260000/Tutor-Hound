var React = require('react'),
    SessionStore = require('../stores/session'),
    TestStore = require('../stores/test'),
    ClientJobStore = require('../stores/clientJobs'),
    AcceptedJobStore = require('../stores/tutorJobs'),
    AvailableJobStore = require('../stores/availableJobs'),
    ApiUtil = require('../util/ApiUtil'),
    HashHistory = require('react-router').hashHistory,
    Modal = require('react-modal'),
    Moment = require('moment'),
    DatePicker = require('react-datepicker'),
    TestBlockContainer = require('./test_block_container'),
    LinkedStateMixin = require('react-addons-linked-state-mixin');
//PROPS LIST:
//jobType - Job type: pending, completed, accepted, available
//job - The actual Job

var customStyles = {
  overlay: {
    paddingLeft: '50%'
  },
  content: {
    position: 'relative',
    left: '-250px',
    width: '500px'
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

  _onClientJobChange: function () {
    this.state.builtCompleteJobs = [];
    this.state.builtIncompleteJobs = [];
    var clientJobs = ClientJobStore.getJobList();
    for (var i = 0; i < clientJobs.length; i++) {
      var job = clientJobs[i];
      var builtJob = (
        <div key={i} className="job-container">
          <div className="job-text-field">
            Test: {job.test}
          </div>
          <div className="job-text-field">
            Date: {this._parseDate(job.date)}
          </div>
          <div className="job-text-field">
            Tutor: {job.tutor_f_name ?
              job.tutor_f_name + " " + job.tutor_l_name :
              "No tutor assigned yet."}
          </div>
        </div>
      );
      if (job.completed || (new Moment().unix() > job.date)) {
        this.state.builtCompleteJobs.push(builtJob);
      } else {
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
        <div key={i} className="job-container">
          <div className="job-text-field">
            Test: {job.test}
          </div>
          <div className="job-text-field">
            Date: {this._parseDate(job.date)}
          </div>
          <div className="job-text-field">
            Client: {job.client}
          </div>
        </div>
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
        <div key={i} className="job-container">
          <div className="job-text-field">
            Test: {job.test}
          </div>
          <div className="job-text-field">
            Date: {this._parseDate(job.date)}
          </div>
          <div className="job-text-field">
            Client: {job.client}
          </div>
        </div>
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

  //TODO deprecate
  _parseDate: function (unixDate) {
    var dateHold = new Date(0);
    dateHold.setUTCSeconds(unixDate);
    return dateHold.toLocaleDateString();
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
              You have no current jobs.
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
              You have no past jobs.
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
            onClick={this._selectCurrent} >Current Jobs</li>
          <li key={2} className={this.state.navbarPast}
            onClick={this._selectPast} >Past Jobs</li>
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
        <div className="blue-button" onClick={this._getMoreWork}
          >Get More Work</div>
      </div> ) :
      <div />
  }
*/
