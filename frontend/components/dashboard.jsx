var React = require('react'),
    SessionStore = require('../stores/session'),
    TestStore = require('../stores/test'),
    ClientJobStore = require('../stores/clientJobs'),
    ApiUtil = require('../util/ApiUtil'),
    HashHistory = require('react-router').hashHistory,
    Modal = require('react-modal'),
    LinkedStateMixin = require('react-addons-linked-state-mixin');

var customStyles = {

};

var Dashboard = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return {options: [], builtIncompleteJobs: [],
      builtCompleteJobs: [], testData: TestStore.getTestData(),
      userData: SessionStore.info(), modalIsOpen: false,
      clientJobs: []};
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
    ApiUtil.fetchUserData();
    ApiUtil.fetchTutor();
    this.listenerToken = SessionStore.addListener(this._onSessionChange);
    this.listenerToken2 = TestStore.addListener(this._onTestChange);
    this.listenerToken3 = ClientJobStore.addListener(this._onClientJobChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
    this.listenerToken2.remove();
    this.listenerToken3.remove();
  },

  openModal: function () {
    this.setState({modalIsOpen: true});
  },

  handleNewJob: function (event) {
    event.preventDefault();
    var testDate = new Date();
    ApiUtil.createJob(
      {
        test_id: this.linkState('test').value,
        date: (Math.floor(testDate.valueOf() / 1000))
      }
    );
    console.log(this.linkState('test').value);
    console.log(this.linkState('date').value);
  },

  closeModal: function () {
    this.setState({modalIsOpen: false});
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
            <div className="blue-button" onClick={this.openModal}>
              Request a Tutor</div>
            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              style={customStyles} >
              <h2>Hello</h2>
              <button onClick={this.closeModal}>close</button>
              <div>I am a modal</div>
              <form onSubmit={this.handleNewJob}>
                <select className="dropdown" valueLink={this.linkState('test')}>
                  {this.state.options}
                </select>
                <input type="datetime-local" valueLink={this.linkState('date')} />
                <input type="submit" className="blue-button" value="Request Tutor"/>
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
