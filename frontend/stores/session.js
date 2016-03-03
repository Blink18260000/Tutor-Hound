var Dispatcher = require('../dispatcher'),
    Store = require('flux/utils').Store,
    ApiConstants = require('../constants/api_constants');

var _userData = {};

var SessionStore = new Store(Dispatcher);

SessionStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case ApiConstants.USER_RECEIVED:
      this.updateUserData(payload.user);
      this.__emitChange();
      break;
    case ApiConstants.TUTOR_RECEIVED:
      this.updateTutorData(payload.tutor);
      this.__emitChange();
      break;
    case ApiConstants.TUTOR_REGISTERED:
      this.updateTutorData(payload.tutor);
      this.__emitChange();
      break;
  }
};

SessionStore.updateUserData = function(user) {
  _userData["address"] = user.address;
  _userData["phone_number"] = user.phone_number;
  _userData["region_id"] = user.region_id;
  _userData["username"] = user.username;
  _userData["tutor_id"] = user.tutor_id;
};

SessionStore.updateTutorData = function(tutor) {
  _userData["tutor_id"] = tutor.id;
  _userData["f_name"] = tutor.f_name;
  _userData["l_name"] = tutor.l_name;
};

SessionStore.info = function () {
  var tempUserData = {};
  tempUserData["address"] = _userData["address"];
  tempUserData["phone_number"] = _userData["phone_number"];
  tempUserData["region_id"] = _userData["region_id"];
  tempUserData["username"] = _userData["username"];
  tempUserData["tutor_id"] = _userData["tutor_id"];
  tempUserData["f_name"] = _userData["f_name"];
  tempUserData["l_name"] = _userData["l_name"];
  return tempUserData;
};

module.exports = SessionStore;
