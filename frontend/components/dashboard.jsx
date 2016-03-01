var React = require('react'),
    SessionStore = require('../stores/session'),
    ApiUtil = require('../util/ApiUtil'),
    HashHistory = require('react-router').hashHistory;



var Dashboard = React.createClass({
  getInitialState: function () {
    return {userData: SessionStore.info()};
  },

  _onChange: function () {
    this.setState({userData: SessionStore.info()});
  },

  componentDidMount: function () {
    ApiUtil.fetchUserData();
    ApiUtil.fetchTutor();
    this.listenerToken = SessionStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  render: function () {
    return (
      <div className="container">
        <div className="content-container">
          <div className="salute-container">
            <div className="profile-pic" />
            <div className="text-content">
              <h1>Welcome to TutorHound, {this.state.userData["f_name"] ? this.state.userData["f_name"] : this.state.userData["username"]}!</h1>
              <input autoComplete="off" className="job-search-input" name="words" placeholder="What do you need help with?" type="text" />
            </div>
          </div>
          <div className="job-list-container">

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
                      <span className="test-icon-sub-text" >The most accepted standardized test.</span>
                    </div>
                  </div>
                </div>
                <div className="test-icon-block">
                  <div className="test-icon-shadow-block">
                    <div className="test-icon-image tib-act" />
                    <div className="test-icon-text">
                      <span className="test-icon-main-text" >ACT</span>
                      <span className="test-icon-sub-text" >The most accepted SAT alternative.</span>
                    </div>
                  </div>
                </div>
                <div className="test-icon-block">
                  <div className="test-icon-shadow-block">
                    <div className="test-icon-image tib-sat2math" />
                    <div className="test-icon-text">
                      <span className="test-icon-main-text" >SAT 2: Math 2</span>
                      <span className="test-icon-sub-text" >Skip freshman math!</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="test-icon-row">
                <div className="test-icon-block">
                  <div className="test-icon-shadow-block">
                    <div className="test-icon-image tib-sat2chem" />
                    <div className="test-icon-text">
                      <span className="test-icon-main-text" >SAT 2: Chemistry</span>
                      <span className="test-icon-sub-text" >An easy way to get lab credit.</span>
                    </div>
                  </div>
                </div>
                <div className="test-icon-block">
                  <div className="test-icon-shadow-block">
                    <div className="test-icon-image tib-sat2span" />
                    <div className="test-icon-text">
                      <span className="test-icon-main-text" >SAT 2: Spanish</span>
                      <span className="test-icon-sub-text" >Get your language credit before college starts.</span>
                    </div>
                  </div>
                </div>
                <div className="test-icon-block">
                  <div className="test-icon-shadow-block">
                    <div className="test-icon-image tib-sat2phys" />
                    <div className="test-icon-text">
                      <span className="test-icon-main-text" >SAT 2: Physics</span>
                      <span className="test-icon-sub-text" >The most popular subject test.</span>
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
