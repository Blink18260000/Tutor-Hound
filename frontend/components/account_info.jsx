var React = require('react'),
    ApiUtil = require('../util/ApiUtil'),
    SessionStore = require('../stores/session'),
    TestStore = require('../stores/test'),
    HashHistory = require('react-router').hashHistory;

var AccountInfo = React.createClass({
  getInitialState: function () {
    return {userData: SessionStore.info(), tests: TestStore.getTestData()};
  },

  _onChange: function () {
    this.setState({userData: SessionStore.info()});
  },

  _edit: function() {
    HashHistory.push("/account/edit");
  },

  componentDidMount: function () {
    this.listenerToken = SessionStore.addListener(this._onChange);
    this._buildQuals();
  },

  _buildQuals: function () {
    var qualArray = this.state.userData.quals.slice(0);
    qualArray = qualArray.map(function(qual){
      for (var i = 0; i < this.state.tests.length; i++) {
        if (this.state.tests[i].id === qual.test_id) {
          return (
            <div key={qual.id} className="account-qual">
              {this.state.tests[i].name}</div>
          );
        }
      }
    } ,this);
    this.setState({builtQuals: qualArray});
  },

  _upload: function (e) {
    e.preventDefault();
    cloudinary.openUploadWidget({
      copping: 'server',
      cloud_name: 'dz9mezxg3',
      upload_preset: 'dayzfi8w'
    }, function(error, results) {
      if (!error) {
        ApiUtil.uploadPhoto(results[0].url);
      }
    }.bind(this));
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  render: function () {
    return (
      <div className="account-option-container">
        <div className="account-panel-header">
          <h3 >Account</h3>
          <div className="blue-button button-small header-button"
            onClick={this._edit}>Edit</div>
        </div>
        <div className="account-panel-body">
          <div className="account-info-profile-pic-container">
            {
              this.state.userData.url ?
              <div className="account-info-profile-pic"><img className="profile-pic-wrapper" src={this.state.userData.url}/></div> :
              <div className="account-info-profile-pic default-pic" />
            }
            <div className="blue-button" onClick={this._upload}>Upload</div>
          </div>
          <div className="account-panel-text-label">Username: </div>
          <div className="account-panel-text-field">
            {this.state.userData.username}</div>
          <div className="spacer" />
            <div className="account-panel-text-label">Phone Number: </div>
          <div className="account-panel-text-field">
            {this.state.userData.phone_number}</div>
          <div className="spacer" />
            <div className="account-panel-text-label">Address: </div>
          <div className="account-panel-text-field">
            {this.state.userData.address}</div>
          <div className="spacer" />
            <div className="account-panel-text-label">Account Status: </div>
          <div className="account-panel-text-field">
            {this.state.userData.tutor_id ?
                              "Student and Tutor" : "Student Only"}</div>
                            <div className="spacer" />
          {
            this.state.userData.tutor_id ?
            (
              <div>
                <div className="account-panel-text-label">Name: </div>
                <div className="account-panel-text-field">
                  {this.state.userData.f_name+ " " +this.state.userData.l_name}
                </div>
                <div className="spacer" />
                <div className="account-panel-text-label">Qualifications: </div>
                {this.state.builtQuals ? this.state.builtQuals : <div/>}
              </div>
            ) : (
              <div/>
            )
          }
        </div>
      </div>
    );
  }
});

module.exports = AccountInfo;
