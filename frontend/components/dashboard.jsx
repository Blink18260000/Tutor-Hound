var React = require('react'),
    SessionStore = require('../stores/session'),
    TestStore = require('../stores/test'),
    ClientJobStore = require('../stores/clientJobs'),
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
    // top: '100px',
    width: '500px'
  }
};

var Dashboard = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return {options: [], builtIncompleteJobs: [],
      builtCompleteJobs: [], builtAcceptedJobs: [],
      testData: TestStore.getTestData(), userData: SessionStore.info(),
      requestModalIsOpen: false, workModalIsOpen: false, clientJobs: [],
      appointmentDate: Moment().startOf('day')};
  },

  _onSessionChange: function () {
    this.setState({userData: SessionStore.info()});
  },

  _onTestChange: function () {
    var testData = TestStore.getTestData();
    for (var i = 0; i < testData.length; i++) {
      var option = testData[i];
      this.state.options.push(
        <option key={i} value={option.id}>{option.name}</option>
      );
    }
    this.setState({testData: testData});
  },

  _setValidTime: function() {

  },

  _parseDate: function(unixDate) {
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

  componentDidMount: function () {
    this.listenerToken = SessionStore.addListener(this._onSessionChange);
    this.listenerToken2 = TestStore.addListener(this._onTestChange);
    this.listenerToken3 = ClientJobStore.addListener(this._onClientJobChange);
    this._onClientJobChange();
    this._onTestChange();
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
    this.listenerToken2.remove();
    this.listenerToken3.remove();
  },

  openRequestModal: function () {
    this.setState({requestModalIsOpen: true});
  },

  openWorkModal: function () {
    this.setState({workModalIsOpen: true});
  },

  handleDateChange: function (date) {
    this.setState({appointmentDate: date});
  },

  handleNewJob: function (event) {
    event.preventDefault();
    console.log(this.state.appointmentDate.unix());
    ApiUtil.createJob(
      {
        test_id: this.linkState('test').value,
        date: this.state.appointmentDate.unix()
      }
    );
    this.closeRequestModal();
  },

  _getMoreWork: function() {
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
      <div className="container">
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
                  {this.state.options}
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

                  </Modal>
                </div> ) :
                <div />
            }
          </div>
          <div className="test-list-container">
            <h2>Top Tests to Study For</h2>
            <div className="test-icon-container">
              <div className="test-icon-row">
                <div className="test-icon-block">
                  <div className="test-icon-shadow-block">
                    <div className="test-icon-image tib-sat" />
                    <div className="test-icon-text">
                      <span className="test-icon-main-text" >SAT</span>
                      <span className="test-icon-sub-text" >
                        The most accepted standardized test.</span>
                    </div>
                  </div>
                </div>
                <div className="test-icon-block">
                  <div className="test-icon-shadow-block">
                    <div className="test-icon-image tib-act" />
                    <div className="test-icon-text">
                      <span className="test-icon-main-text" >ACT</span>
                      <span className="test-icon-sub-text" >
                        The most accepted SAT alternative.</span>
                    </div>
                  </div>
                </div>
                <div className="test-icon-block">
                  <div className="test-icon-shadow-block">
                    <div className="test-icon-image tib-sat2math" />
                    <div className="test-icon-text">
                      <span className="test-icon-main-text" >
                        SAT 2: Math 2</span>
                      <span className="test-icon-sub-text" >
                        Skip freshman math!</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="test-icon-row">
                <div className="test-icon-block">
                  <div className="test-icon-shadow-block">
                    <div className="test-icon-image tib-sat2chem" />
                    <div className="test-icon-text">
                      <span className="test-icon-main-text" >
                        SAT 2: Chemistry</span>
                      <span className="test-icon-sub-text" >
                        An easy way to get lab credit.</span>
                    </div>
                  </div>
                </div>
                <div className="test-icon-block">
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
                <div className="test-icon-block">
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
      </div>
    );
  }
});

module.exports = Dashboard;
