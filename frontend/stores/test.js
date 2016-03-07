var Dispatcher = require('../dispatcher'),
    Store = require('flux/utils').Store,
    ApiConstants = require('../constants/api_constants');

var _testList = [];

var TestStore = new Store(Dispatcher);

TestStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case ApiConstants.TESTS_RECEIVED:
      this.setTestData(payload.tests);
      this.__emitChange();
      break;
  }
};

TestStore.setTestData = function(tests) {
  _testList = tests;
};

TestStore.getTestData = function() {
  if (_testList) {
    return _testList.slice(0);    
  } else {
    return _testList;
  }
};

module.exports = TestStore;
