var Dispatcher = require('../dispatcher'),
    Store = require('flux/utils').Store,
    ApiConstants = require('../constants/api_constants');

var _jobList = [];

var TutorJobStore = new Store(Dispatcher);

TutorJobStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case ApiConstants.TUTOR_JOBS_RECEIVED:
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

TutorJobStore.setJobList = function(jobs) {
  _jobList = jobs;
};

TutorJobStore.getJobList = function() {
  return _jobList.slice(0);
};

TutorJobStore.addJob = function(job) {
  job["completed"] = false;
  job["tutor_id"] = null;
  _jobList.push(job);
};

module.exports = TutorJobStore;
