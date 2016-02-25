var ApiActions = require('../actions/api_actions');

var ApiUtil = {
  //Job API
  fetchJobsAsClient: function() {
    var that = this;
    $.ajax({
     method: 'GET',
     url: 'api/jobs',
     dataType: 'json',
     data: {requestType: 'client'},
     success: function(resp) {
        console.log(resp);
        ApiActions.receiveAll(resp);
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
        console.log(resp);
        ApiActions.receiveAll(resp);
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
        console.log(resp);
        ApiActions.receiveAll(resp);
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
        console.log(resp);
        ApiActions.receiveAll(resp);
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
        console.log(resp);
        ApiActions.receiveAll(resp);
     }
   });
  },

  updateJob: function(jobId, job) {
    var that = this;
    $.ajax({
     method: 'PATCH',
     url: 'api/jobs/' + jobId,
     dataType: 'json',
     job: job,
     success: function(resp) {
        console.log(resp);
        ApiActions.receiveAll(resp);
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
        console.log(resp);
        ApiActions.receiveAll(resp);
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
        console.log(resp);
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
        console.log(resp);
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
        console.log(resp);
        ApiActions.receiveQuals(resp);
     }
   });
  },
};

module.exports = ApiUtil;
