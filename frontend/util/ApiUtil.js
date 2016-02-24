var ApiActions = require('../actions/api_actions');

var ApiUtil = {
  //make an api call using AJAX in here
  fetchJobsByRegion: function(regionId) {
    var that = this;
    $.ajax({
     method: 'GET',
     url: 'api/jobs',
     dataType: 'json',
     regionId: regionId,
     success: function(resp) {
        ApiActions.receiveAll(resp);
     }
   });
  },
};

module.exports = ApiUtil;
