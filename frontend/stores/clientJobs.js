var Dispatcher = require('../dispatcher'),
    Store = require('flux/utils').Store,
    ApiConstants = require('../constants/api_constants');

var _jobList = [];

var ClientJobStore = new Store(Dispatcher);

ClientJobStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case ApiConstants.CLIENT_JOBS_RECEIVED:
      this.setJobList(payload.jobs);
      this.__emitChange();
      break;
    case ApiConstants.JOB_CREATED: //TODO other actions
      this.addJob(payload.job);
      this.__emitChange();
      break;
  }
};

ClientJobStore.setJobList = function(jobs) {
  _jobList = jobs;
  console.log(_jobList);
};

ClientJobStore.getJobList = function() {
  return _jobList.slice(0);
};

ClientJobStore.addJob = function(job) {
  job["completed"] = false;
  job["tutor_id"] = null;
  _jobList.push(job);
};

ClientJobStore.editJob = function() {

};

module.exports = ClientJobStore;
