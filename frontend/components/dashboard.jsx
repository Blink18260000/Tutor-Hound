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
    LinkedStateMixin = require('react-addons-linked-state-mixin');

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

var Dashboard = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return {testOptions: [], timeOptions: [], builtIncompleteJobs: [],
      builtCompleteJobs: [], builtAcceptedJobs: [], builtAvailableJobs: [],
      availableJobs: [], acceptedJobs: [], testData: TestStore.getTestData(),
      userData: SessionStore.info(), requestModalIsOpen: false,
      workModalIsOpen: false, clientJobs: [],
      appointmentDate: Moment().startOf('day').add(1, 'day')};
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

  _generateTimes: function () {
    //Generate a time offset from 9AM to every 30 minutes from 9 AM to 5 PM
    //8 * 60 * 60 = 28,800 seconds from 9 AM to 5 PM
    //17 times, 30 minutes each, 30 minutes = 30 * 60 = 1800 seconds
    for (var t = 0; t <= (28800); t += 1800) {
      this.state.timeOptions.push(
        <option key={t} value={t}>
          {
            new Moment().startOf('day').add(9, 'hours').add(t, 'seconds').format('h:mm A')
          }
        </option>
      );
    }
  },

  _setValidTime: function () {

  },

  _parseDate: function (unixDate) {
    var dateHold = new Date(0);
    dateHold.setUTCSeconds(unixDate);
    return dateHold.toLocaleDateString();
  },

  _onClientJobChange: function () {
    this.state.builtCompleteJobs = [];
    this.state.builtIncompleteJobs = [];
    var clientJobs = ClientJobStore.getJobList();
    for (var i = 0; i < clientJobs.length; i++) {
      var job = clientJobs[i];
      if (job.completed) {
        this.state.builtCompleteJobs.push(
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
      } else {
        this.state.builtIncompleteJobs.push(
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
      }
    }
    this.setState({clientJobs: clientJobs});
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

  componentDidMount: function () {
    this.listenerToken = SessionStore.addListener(this._onSessionChange);
    this.listenerToken2 = TestStore.addListener(this._onTestChange);
    this.listenerToken3 = ClientJobStore.addListener(this._onClientJobChange);
    this.listenerToken4 = AvailableJobStore.addListener(this._onAvailableJobChange);
    this.listenerToken5 = AcceptedJobStore.addListener(this._onAcceptedJobChange);
    this._onClientJobChange();
    this._onTestChange();
    this._generateTimes();
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
    this.listenerToken2.remove();
    this.listenerToken3.remove();
    this.listenerToken4.remove();
    this.listenerToken5.remove();
  },

  openRequestModal: function () {
    this.setState({requestModalIsOpen: true});
  },

  openRequestModalWithTest: function (test) {
    this.setState({test: test});
    this.openRequestModal();
  },

  openWorkModal: function () {
    this.setState({workModalIsOpen: true});
  },

  handleDateChange: function (date) {
    this.setState({appointmentDate: date});
  },

  handleNewJob: function (event) {
    event.preventDefault();
    var studyTimeDate = this.state.appointmentDate.add(9, 'hours').add(this.state.time, 'seconds');
    console.log(studyTimeDate.unix());
    ApiUtil.createJob(
      {
        test_id: this.linkState('test').value,
        date: studyTimeDate.unix()
      }
    );
    this.closeRequestModal();
  },

  _getMoreWork: function () {
    this.openWorkModal();
  },

  closeRequestModal: function () {
    this.setState({requestModalIsOpen: false});
  },

  closeWorkModal: function () {
    this.setState({workModalIsOpen: false});
  },

  render: function () {
    return (
      <div className="content-container">
        <div className="salute-container">
          <div className="profile-pic" />
          <div className="text-content">
            <h1>Welcome to TutorHound, {this.state.userData["f_name"] ?
              this.state.userData["f_name"] :
              this.state.userData["username"]}!</h1>
              {/*<input autoComplete="off" className="job-search-input"
              name="words" placeholder="What do you need help with?"
              type="text" />*/}
          </div>
          <div className="blue-button" onClick={this.openRequestModal}>
            Request a Tutor</div>
          <Modal
            isOpen={this.state.requestModalIsOpen}
            onRequestClose={this.closeRequestModal}
            style={customStyles} >
            <h2>Request a Tutor</h2>
            <button onClick={this.closeRequestModal} className="modal-close">close</button>
            <form onSubmit={this.handleNewJob}>
              <label htmlFor="test" >Test to study for:</label>
              <select className="dropdown" name="test" valueLink={this.linkState('test')} required={true} >
                <option value="" key={-1} />
                {this.state.testOptions}
              </select>
              <div className="spacer" />
              <label htmlFor="date" >Date to study on:</label>
              <DatePicker
                selected={this.state.appointmentDate}
                onChange={this.handleDateChange}
                minDate={Moment().add(1, 'days')}
                maxDate={Moment().add(90, 'days')}
                popoverAttachment='middle left'
                popoverTargetAttachment='middle right'
                name="date"/>
              <div className="spacer" />
              <label htmlFor="time" >Time to study at:</label>
              <select className="dropdown" name="time" valueLink={this.linkState('time')} required={true} >
                <option value="" key={-1} />
                {this.state.timeOptions}
              </select>
              <div className="spacer" />
              <input type="submit" className="blue-button register-button" value="Request Tutor"/>
            </form>
          </Modal>
        </div>
        <div className="job-list-container">
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
                <Modal
                  isOpen={this.state.workModalIsOpen}
                  onRequestClose={this.closeWorkModal}
                  style={customStyles} >
                  <h2>Get New Tutoring Jobs</h2>
                  <button onClick={this.closeWorkModal} className="modal-close">close</button>
                  {
                    this.state.builtAvailableJobs.length > 0 ?
                      this.state.builtAvailableJobs :
                      <div className="notification">
                        You are not qualified for any requests in your region. Please check back later.
                      </div>
                  }
                </Modal>
              </div> ) :
              <div />
          }
        </div>
        <div className="test-list-container">
          <h2>Top Tests to Study For</h2>
          <div className="test-icon-container">
            <div className="test-icon-row">
              <div className="test-icon-block" onClick={this.openRequestModalWithTest.bind(this,1)}>
                <div className="test-icon-shadow-block">
                  <div className="test-icon-image tib-sat" />
                  <div className="test-icon-text">
                    <span className="test-icon-main-text" >SAT</span>
                    <span className="test-icon-sub-text" >
                      The most accepted standardized test.</span>
                  </div>
                </div>
              </div>
              <div className="test-icon-block" onClick={this.openRequestModalWithTest.bind(this,23)}>
                <div className="test-icon-shadow-block">
                  <div className="test-icon-image tib-act" />
                  <div className="test-icon-text">
                    <span className="test-icon-main-text" >ACT</span>
                    <span className="test-icon-sub-text" >
                      The most accepted SAT alternative.</span>
                  </div>
                </div>
              </div>
              <div className="test-icon-block" onClick={this.openRequestModalWithTest.bind(this,9)}>
                <div className="test-icon-shadow-block">
                  <div className="test-icon-image tib-sat2ush" />
                  <div className="test-icon-text">
                    <span className="test-icon-main-text" >
                      SAT 2: U.S. History</span>
                    <span className="test-icon-sub-text" >
                      Everything from pre-revolution to the modern day.</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="test-icon-row">
              <div className="test-icon-block" onClick={this.openRequestModalWithTest.bind(this,10)}>
                <div className="test-icon-shadow-block">
                  <div className="test-icon-image tib-sat2wh" />
                  <div className="test-icon-text">
                    <span className="test-icon-main-text" >
                      SAT 2: World History</span>
                    <span className="test-icon-sub-text" >
                      A thorough test of knowledge of international events and history.</span>
                  </div>
                </div>
              </div>
              <div className="test-icon-block" onClick={this.openRequestModalWithTest.bind(this,11)}>
                <div className="test-icon-shadow-block">
                  <div className="test-icon-image tib-sat2span" />
                  <div className="test-icon-text">
                    <span className="test-icon-main-text" >
                      SAT 2: Spanish</span>
                    <span className="test-icon-sub-text" >
                      Get your language credit before college starts.</span>
                  </div>
                </div>
              </div>
              <div className="test-icon-block" onClick={this.openRequestModalWithTest.bind(this,5)}>
                <div className="test-icon-shadow-block">
                  <div className="test-icon-image tib-sat2phys" />
                  <div className="test-icon-text">
                    <span className="test-icon-main-text" >
                      SAT 2: Physics</span>
                    <span className="test-icon-sub-text" >
                      The most popular subject test.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Dashboard;
