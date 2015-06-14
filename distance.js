function routeDistanceInSeconds(to) {
    var calculateRouteParams = {
        'waypoint0': homeLocation.lat + "," + homeLocation.lng,
        'waypoint1': to.coordinates.lat + "," + to.coordinates.lng,
        'mode': 'fastest;car;traffic:disabled',
    },
    onError = function(error) {
      console.log(error);
    },
    onResult = function(result) {
      to.routeSummary = result.response.route[0].summary
    };
  router.calculateRoute(calculateRouteParams, onResult, onError);
};

