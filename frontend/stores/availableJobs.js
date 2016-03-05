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
    case ApiConstants.JOB_ACCEPTED:
      this.removeJob(payload.job);
      this.__emitChange();
      break;
  }
};

AvailableJobStore.setJobList = function(jobs) {
  _jobList = jobs;
};

AvailableJobStore.getJobList = function() {
  return _jobList.slice(0);
};

AvailableJobStore.removeJob = function(job) {
  var newList = [];
  for (var i = 0; i < _jobList.length; i++ ) {
    if (!(_jobList[i].id === job.id)) {
      newList.push(_jobList[i]);
    }
  }
  _jobList = newList;
};

module.exports = AvailableJobStore;
