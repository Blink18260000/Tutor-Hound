var Dispatcher = require('../dispatcher'),
    ApiConstants = require('../constants/api_constants');

var ApiActions = {

  receiveTutor: function (tutor) {
    Dispatcher.dispatch({
      actionType: ApiConstants.TUTOR_RECEIVED,
      tutor: tutor
    });
  },

  registeredTutor: function (tutor) {
    Dispatcher.dispatch({
      actionType: ApiConstants.TUTOR_REGISTERED,
      tutor: tutor
    });
  },

  deletedTutor: function (tutor) {
    Dispatcher.dispatch({
      actionType: ApiConstants.TUTOR_DELETED,
      tutor: tutor
    });
  },

  receivedClientJobs: function (jobs) {
    Dispatcher.dispatch({
      actionType: ApiConstants.CLIENT_JOBS_RECEIVED,
      jobs: jobs
    });
  },

  receivedTutorJobs: function (jobs) {
    Dispatcher.dispatch({
      actionType: ApiConstants.TUTOR_JOBS_RECEIVED,
      jobs: jobs
    });
  },

  receivedAvailableJobs: function (jobs) {
    Dispatcher.dispatch({
      actionType: ApiConstants.AVAILABLE_JOBS_RECEIVED,
      jobs: jobs
    });
  },

  jobCreated: function (job) {
    Dispatcher.dispatch({
      actionType: ApiConstants.JOB_CREATED,
      job: job
    });
  },

  jobReceived: function (job) {
    Dispatcher.dispatch({
      actionType: ApiConstants.JOB_RECEIVED,
      job: job
    });
  },

  jobDeleted: function (job) {
    Dispatcher.dispatch({
      actionType: ApiConstants.JOB_DELETED,
      job: job
    });
  },

  receiveTests: function (tests) {
    Dispatcher.dispatch({
      actionType: ApiConstants.TESTS_RECEIVED,
      tests: tests
    });
  },

  receiveRegions: function (regions) {
    Dispatcher.dispatch({
      actionType: ApiConstants.REGIONS_RECEIVED,
      regions: regions
    });
  },

  receiveQuals: function (quals) {
    Dispatcher.dispatch({
      actionType: ApiConstants.QUALS_RECEIVED,
      quals: quals
    });
  },

  qualRegistered: function (qual) {
    Dispatcher.dispatch({
      actionType: ApiConstants.QUAL_REGISTERED,
      qual: qual
    });
  },

  qualUnregistered: function (qual) {
    Dispatcher.dispatch({
      actionType: ApiConstants.QUAL_UNREGISTERED,
      qual: qual
    });
  }
};

module.exports = ApiActions;
