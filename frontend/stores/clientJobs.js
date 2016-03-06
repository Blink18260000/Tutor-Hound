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
    case ApiConstants.JOB_CREATED:
      this.addJob(payload.job);
      this.__emitChange();
      break;
    case ApiConstants.JOB_DELETED:
      this.deleteJob(payload.job);
      this.__emitChange();
      break;
  }
};

ClientJobStore.setJobList = function(jobs) {
  _jobList = jobs;
};

ClientJobStore.getJobList = function() {
  return _jobList.slice(0);
};

ClientJobStore.addJob = function(job) {
  _jobList.push(job);
};

ClientJobStore.deleteJob = function(job) {
  var newList = [];
  for (var i = 0; i < _jobList.length ; i++ ) {
    if (!(_jobList[i].id === job.id)) {
      newList.push(_jobList[i]);
    }
  }
  _jobList = newList;
};

module.exports = ClientJobStore;
