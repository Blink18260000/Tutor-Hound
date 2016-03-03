var Dispatcher = require('../dispatcher'),
    Store = require('flux/utils').Store,
    ApiConstants = require('../constants/api_constants');

var _jobList = [];

var AvailableJobStore = new Store(Dispatcher);

AvailableJobStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case ApiConstants.AVAILABLE_JOBS_RECEIVED:
      this.setJobList(payload.jobs);
      this.__emitChange();
      break;
    case ApiConstants.JOB_CREATED: //TODO other actions
      this.addJob(payload.job);
      this.__emitChange();
      break;
    case ApiConstants.JOB_RECEIVED:

      break;
  }
};

AvailableJobStore.setJobList = function(jobs) {
  _jobList = jobs;
};

AvailableJobStore.getJobList = function() {
  return _jobList.slice(0);
};

AvailableJobStore.addJob = function(job) {
  job["completed"] = false;
  job["tutor_id"] = null;
  _jobList.push(job);
};

module.exports = AvailableJobStore;
