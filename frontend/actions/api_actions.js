var Dispatcher = require('../dispatcher'),
    JobConstants = require('../constants/job_constants');

var ApiActions = {
  receiveAll: function (jobs) {
    Dispatcher.dispatch({
      actionType: JobConstants.JOBS_RECEIVED,
      jobs: jobs
    });
  },

  jobCreated: function () {
    Dispatcher.dispatch({
      actionType: JobConstants.JOB_CREATED
    });
  },

  receiveRegions: function () {
    Dispatcher.dispatch({
      actionType: JobConstants.REGIONS_RECEIVED
    });
  },

  receiveTests: function () {
    Dispatcher.dispatch({
      actionType: JobConstants.TESTS_RECEIVED
    });
  },

  receiveQuals: function () {
    Dispatcher.dispatch({
      actionType: JobConstants.QUALS_RECEIVED
    });
  },
};

module.exports = ApiActions;
