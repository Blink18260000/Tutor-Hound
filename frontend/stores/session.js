var Dispatcher = require('../dispatcher'),
    Store = require('flux/utils').Store,
    BenchConstants = require('../constants/bench_constants');

var _benches = [];

var SessionStore = new Store(Dispatcher);

SessionStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case BenchConstants.BENCHES_RECEIVED:
      this.resetBenchs(payload.benches);
      this.__emitChange();
      break;
    case BenchConstants.BENCH_CREATED:
      this.__emitChange();
      break;
  }
};

SessionStore.resetBenchs = function(benches) {
  _benches = benches;
};

SessionStore.all = function () {
  return _benches.slice(0);
};

SessionStore.find = function (id) {
  return _benches[id];
};

module.exports = SessionStore;
