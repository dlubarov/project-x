/**
 * Adds two SVG markers over the homes of the Chicago Bears and Chicago Cubs
 *
 * @param  {H.Map} map      A HERE Map instance within the application
 */
function addSVGMarkers(map, data, activeId){
  //Create the svg mark-up
  var svgMarkup = '<svg  width="${OUTER_WIDTH}" height="24" xmlns="http://www.w3.org/2000/svg">' +
    '<rect fill="${FILL}" x="1" fill-opacity="0.9" y="1" width="${WIDTH}" height="22" />' +
    '<text x="${X}" y="18" font-size="12pt" font-family="Courier" font-weight="bold" ' +
    'text-anchor="middle" fill="${STROKE}" >${TEXT}</text></svg>';

  // Add the first marker
  var textMarker = function(item) {
    var text = item.name;
    return new H.map.Icon(
      svgMarkup
        .replace('${FILL}', (item.id === activeId) ? 'orange' : 'white')
        .replace('${STROKE}', '000')
        .replace('${OUTER_WIDTH}', text.length*12)
        .replace('${WIDTH}', text.length*12)
        .replace('${X}', text.length*6)
        .replace('${TEXT}', text)
      )
  }

  for (i = 0; i < data.length; i++) {
    item = data[i]
    if(item.coordinates != undefined && item.coordinates.lat != undefined && item.coordinates.lng != undefined){
      marker = new H.map.Marker({lat: item.coordinates.lat, lng: item.coordinates.lng },
        {icon: textMarker(item)});
      map.addObject(marker);
    }
  }
}

//Step 1: initialize communication with the platform
var platform = new H.service.Platform({
  app_id: 'DemoAppId01082013GAL',
  app_code: 'AJKnXv84fjrb0KIHawS0Tg',
  useCIT: true,
  useHTTPS: true
});
var defaultLayers = platform.createDefaultLayers();

//Step 2: initialize a map - this map is centered over Chicago.
var map = new H.Map(document.getElementById('map'),
  defaultLayers.normal.map,{
  center: {lat:37.485, lng:-122.209},
  zoom: 11
});

//Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers);

function hardRefreshMap(){
  var dataPoints = getEventList();
  map.removeObjects(map.getObjects())
  addSVGMarkers(map, dataPoints, activeId);
}

window.oldDataPoints = []
function refreshMap() {
  var dataPoints = getEventList();
  if ((dataPoints == undefined) || (window.oldDataPoints.length != dataPoints.length)){
    hardRefreshMap()
  }
  window.oldDataPoints = dataPoints
}



