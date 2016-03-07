var ApiActions = require('../actions/api_actions');

var ApiUtil = {
  //User data API
  fetchUserData: function() {
    var that = this;
    $.ajax({
      method: 'GET',
      url: 'api/users',
      dataType: 'json',
      success: function(resp) {
        ApiActions.receiveUser(resp);
      }
    });
  },

  uploadPhoto: function (url) {
    var that = this;
    $.ajax({
      method: 'PATCH',
      url: 'api/users/image',
      dataType: 'json',
      data: {url: url},
      success: function(resp) {
        ApiActions.receiveUser(resp);
      }
    });
  },

  //Tutor API
  fetchTutor: function() {
    var that = this;
    $.ajax({
      method: 'GET',
      url: 'api/tutors',
      dataType: 'json',
      success: function(resp) {
        ApiActions.receiveTutor(resp);
      }
    });
  },

  registerTutor: function(fName, lName) {
    var that = this;
    $.ajax({
      method: 'POST',
      url: 'api/tutors',
      dataType: 'json',
      data: {tutor: {f_name: fName, l_name: lName}},
      success: function(resp) {
        ApiActions.registeredTutor(resp);
      }
    });
  },

  updateTutor: function(fName, lName , id) {
    var that = this;
    $.ajax({
      method: 'PATCH',
      url: 'api/tutors/' + id.to_s,
      dataType: 'json',
      data: {tutor: {f_name: fName, l_name: lName}},
      success: function(resp) {
        ApiActions.receiveTutor(resp);
      }
    });
  },

  unregisterTutor: function(fName, lName, id) {
    var that = this;
    $.ajax({
      method: 'DELETE',
      url: 'api/tutors',
      dataType: 'json',
      success: function(resp) {
        ApiActions.deletedTutor(resp);
      }
    });
  },

  //Job API
  fetchJobsAsClient: function() {
    var that = this;
    $.ajax({
      method: 'GET',
      url: 'api/jobs',
      dataType: 'json',
      data: {requestType: 'client'},
      success: function(resp) {
        ApiActions.receivedClientJobs(resp);
      }
    });
  },

  fetchJobsAsTutor: function() {
    var that = this;
    $.ajax({
      method: 'GET',
      url: 'api/jobs',
      dataType: 'json',
      data: {requestType: 'tutor'},
      success: function(resp) {
        ApiActions.receivedTutorJobs(resp);
      }
    });
  },

  fetchAvailableJobs: function() {
    var that = this;
    $.ajax({
      method: 'GET',
      url: 'api/jobs',
      dataType: 'json',
      data: {requestType: 'available'},
      success: function(resp) {
        ApiActions.receivedAvailableJobs(resp);
      }
    });
  },

  createJob: function(job) {
    var that = this;
    $.ajax({
      method: 'POST',
      url: 'api/jobs',
      dataType: 'json',
      data: {job: job},
      success: function(resp) {
        ApiActions.jobCreated(resp);
      }
    });
  },

  fetchSingleJob: function(jobId) {
    var that = this;
    $.ajax({
      method: 'GET',
      url: 'api/jobs/' + jobId,
      dataType: 'json',
      success: function(resp) {
        ApiActions.jobReceived(resp);
      }
    });
  },

  updateJob: function(jobId, job) {
    var that = this;
    $.ajax({
      method: 'PATCH',
      url: 'api/jobs/' + jobId,
      dataType: 'json',
      data: {job: job},
      success: function(resp) {
        ApiActions.jobReceived(resp);
      }
    });
  },

  acceptJob: function(jobId, job) {
    var that = this;
    $.ajax({
      method: 'PATCH',
      url: 'api/jobs/accept/' + jobId,
      dataType: 'json',
      data: {job: job},
      success: function(resp) {
        ApiActions.jobAccepted(resp);
      }
    });
  },

  declineJob: function(jobId, job) {
    var that = this;
    $.ajax({
      method: 'PATCH',
      url: 'api/jobs/decline/' + jobId,
      dataType: 'json',
      data: {job: job},
      success: function(resp) {
        ApiActions.jobDeclined(resp);
      }
    });
  },

  registerAsTutor: function(jobId) {
    var that = this;
    $.ajax({
      method: 'PATCH',
      url: 'api/jobs/' + jobId,
      dataType: 'json',
      success: function(resp) {
        ApiActions.jobReceived(resp);
      }
    });
  },

  deleteJob: function(jobId) {
    var that = this;
    $.ajax({
      method: 'DELETE',
      url: 'api/jobs/' + jobId,
      dataType: 'json',
      success: function(resp) {
        ApiActions.jobDeleted(resp);
      }
    });
  },

  //Test API
  fetchTests: function() {
    var that = this;
    $.ajax({
      method: 'GET',
      url: 'api/tests',
      dataType: 'json',
      success: function(resp) {
        ApiActions.receiveTests(resp);
      }
    });
  },

  //Region API
  fetchRegions: function() {
    var that = this;
    $.ajax({
      method: 'GET',
      url: 'api/regions',
      dataType: 'json',
      success: function(resp) {
        ApiActions.receiveRegions(resp);
      }
    });
  },

  //Qualification API
  fetchQuals: function() {
    var that = this;
    $.ajax({
      method: 'GET',
      url: 'api/quals',
      dataType: 'json',
      success: function(resp) {
        ApiActions.receiveQuals(resp);
      }
    });
  },

  registerQual: function(testId) {
    var that = this;
    $.ajax({
      method: 'GET',
      url: 'api/quals',
      dataType: 'json',
      data: {qual: {test_id: testId}},
      success: function(resp) {
        ApiActions.qualRegistered(resp);
      }
    });
  },

  unregisterQual: function(id) {
    var that = this;
    $.ajax({
      method: 'DELETE',
      url: 'api/quals/' + id.to_s,
      dataType: 'json',
      success: function(resp) {
        ApiActions.qualUnregistered(resp);
      }
    });
  },

  //Sign Out
  logOut: function() {
    var that = this;
    $.ajax({
      method: 'DELETE',
      url: '/session',
      success: function(resp) {
        window.location.href= "/session/new";
      }
    });
  },

  //Deactivate account
  deactivate: function() {
    var that = this;
    $.ajax({
      method: 'DELETE',
      url: 'api/users',
      success: function(resp) {
        window.location.href= "/session/new";
      }
    });
  }
};

module.exports = ApiUtil;
