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
  }
};

module.exports = ApiActions;
