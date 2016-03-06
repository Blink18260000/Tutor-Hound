var React = require('react'),
    SessionStore = require('../stores/session'),
    TestStore = require('../stores/test'),
    ClientJobStore = require('../stores/clientJobs'),
    AcceptedJobStore = require('../stores/tutorJobs'),
    AvailableJobStore = require('../stores/availableJobs'),
    ApiUtil = require('../util/ApiUtil'),
    HashHistory = require('react-router').hashHistory,
    Modal = require('react-modal'),
    JobPanel = require('./job_panel'),
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
      clientJobs: [],
      appointmentDate: Moment().startOf('day').add(1, 'day')};
  },

  componentDidMount: function () {
    this.listenerToken =
      SessionStore.addListener(this._onSessionChange);
    this.listenerToken2 =
      TestStore.addListener(this._onTestChange);
    this._onTestChange();
    this._generateTimes();
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
    this.listenerToken2.remove();
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
            new Moment()
              .startOf('day')
              .add(9, 'hours')
              .add(t, 'seconds')
              .format('h:mm A')
          }
        </option>
      );
    }
  },

  openRequestModal: function () {
    this.setState({requestModalIsOpen: true});
  },

  openRequestModalWithTest: function (test) {
    this.setState({test: test});
    this.openRequestModal();
  },


  handleDateChange: function (date) {
    this.setState({appointmentDate: date});
  },

  handleNewJob: function (event) {
    event.preventDefault();
    var studyTimeDate = this.state.appointmentDate
      .add(9, 'hours').add(this.state.time, 'seconds');
    ApiUtil.createJob(
      {
        test_id: this.linkState('test').value,
        date: studyTimeDate.unix()
      }
    );
    this.closeRequestModal();
    this.setState({
      test: undefined,
      time: undefined,
      appointmentDate: Moment().startOf('day').add(1, 'day')
     });
  },

  closeRequestModal: function () {
    this.setState({requestModalIsOpen: false});
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
          </div>
          <div className="blue-button" onClick={this.openRequestModal}>
            Request a Tutor</div>
        </div>

        <JobPanel />

        <TestBlockContainer callback={this.openRequestModalWithTest} />

        <Modal
          isOpen={this.state.requestModalIsOpen}
          onRequestClose={this.closeRequestModal}
          style={customStyles} >
          <h2>Request a Tutor</h2>
          <button onClick={this.closeRequestModal}
            className="modal-close">close</button>
          <form onSubmit={this.handleNewJob}>
            <label htmlFor="test" >Test to study for:</label>
            <select className="dropdown" name="test"
              valueLink={this.linkState('test')} required={true} >
              <option value="" key={-1} />
              {this.state.testOptions}
            </select>
            <div className="spacer" />
            <label htmlFor="date" >Date to study on:</label>
            <DatePicker
              selected={this.state.appointmentDate}
              onChange={this.handleDateChange}
              placeHolderText="Select an appointment date!"
              minDate={Moment().add(1, 'days')}
              maxDate={Moment().add(90, 'days')}
              popoverAttachment='middle left'
              popoverTargetAttachment='middle right'
              name="date"/>
            <div className="spacer" />
            <label htmlFor="time" >Time to study at:</label>
            <select className="dropdown" name="time"
              valueLink={this.linkState('time')} required={true} >
              <option value="" key={-1} />
              {this.state.timeOptions}
            </select>
            <div className="spacer" />
            <input type="submit" className="blue-button register-button"
              value="Request Tutor"/>
          </form>
        </Modal>

      </div>
    );
  }
});

module.exports = Dashboard;
