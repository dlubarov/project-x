var platform = new H.service.Platform({
  app_id: [your app_id],       //set your app_id
  app_code: [your app_code],   //set your app_code
})

var router = platform.getRoutingService();
	

function routeDistanceInSeconds(router, from, to, callback) {
  var params = {
      'waypoint0': 'geo!' + from,
      'waypoint1': 'geo!' + to,
      'mode': 'fastest;car;traffic:disabled'
    },
    onError = function(error) {
      console.log(error);
    },
    onResult = function(result) {
      return callback(result.response.route.summary.distance);
    };
  router.calculateRoute(params, onResult, onError);
};
