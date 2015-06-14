function display_route(start_coords, end_coords) {
    // Check whether the environment should use hi-res maps
    var hidpi = ('devicePixelRatio' in window && devicePixelRatio > 1);

    var mapContainer = document.getElementById('mapContainer'),

    maptypes = platform.createDefaultLayers(hidpi ? 512 : 256, hidpi ? 320 : null),

    map = new H.Map(mapContainer, maptypes.normal.map,
        {
            center: new H.geo.Point((start_coords.lat + end_coords.lat) / 2, (start_coords.lng + end_coords.lng) / 2),
            zoom: 12
        }
    );

    // add behavior control
    new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Enable the default UI
    var ui = H.ui.UI.createDefault(map, maptypes);
    //add JS API Release information
    releaseInfoTxt.innerHTML+="JS API: 3."+ H.buildInfo().version;

    //add MRS Release information
    loadMRSVersionTxt();

    //helper
    var releaseRoutingShown = false;

    // setup the Streetlevel imagery
    platform.configure(H.map.render.panorama.RenderEngine);

    window.addEventListener('resize', function() { map.getViewPort().resize(); });

    function calculateRoute()
    {
        var calculateRouteParams = {
            'waypoint0': start_coords.lat + "," + start_coords.lng,
            'waypoint1': end_coords.lat + "," + end_coords.lng,
            'mode': 'fastest;car;traffic:disabled',
            'representation': 'display'
        },
        onResult = function(result) {
              //add Routing Release number if not already done
            if (releaseRoutingShown== false){
                releaseInfoTxt.innerHTML+="<br />HLP Routing: "+result.response.metaInfo.moduleVersion;
                releaseRoutingShown = true;
            }
            var strip = new H.geo.Strip(),
                shape = result.response.route[0].shape,
                i,
                l = shape.length;

            for(i = 0; i < l; i++)
            {
                strip.pushLatLngAlt.apply(strip, shape[i].split(',').map(function(item) { return parseFloat(item); }));
            }
            var polyline = new H.map.Polyline(strip,
            {
                style:
                {
                    lineWidth: 10,
                    strokeColor: "rgba(0, 128, 0, 0.7)"
                }
            });

            map.addObject(polyline);
        },
        onError = function(error) {
            console.log(error);
        }
        router.calculateRoute(calculateRouteParams, onResult, onError);
    }

    var displayReady = function(e)
    {
        console.log("fire");
        map.removeEventListener("mapviewchangeend", displayReady);
        calculateRoute();
    };

    map.addEventListener("mapviewchangeend", displayReady);
    // calculateRoute();
}
