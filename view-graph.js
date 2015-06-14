/**
 * Adds two SVG markers over the homes of the Chicago Bears and Chicago Cubs
 *
 * @param  {H.Map} map      A HERE Map instance within the application
 */
function addSVGMarkers(map, data, activeId){
  //Create the svg mark-up
  var svgMarkup = '<svg  width="${OUTER_WIDTH}" height="26" xmlns="http://www.w3.org/2000/svg">' +
    '<rect fill="${FILL}" stroke="#fff" stroke-width="0" x="1" fill-opacity="${OPACITY}" y="1" width="${WIDTH}" height="30" />' +
    '<text x="90" y="20" font-size="13pt" font-family="Arial" text-anchor="start"  fill="${STROKE}" >${TEXT}</text>' +
    '<text x="${X}" y="20" font-size="14pt" font-family="Arial" font-weight="bold" text-anchor="end" fill="${TIME_STROKE}" >${TIME_INFO}</text>' +
    '</svg>';

  // Add the first marker
  var textMarker = function(item) {
    var time = item.leaveTime().toUpperCase().replace(/\s/g, '')
    var text = item.name
    return new H.map.Icon(
      svgMarkup
        .replace('${FILL}', (item.id === activeId) ? "#F58100" : "#666")
        .replace('${FONT_WEIGHT}', (item.id === activeId) ? "bold" : "normal")
        .replace('${STROKE}', '#fff')
        .replace('${TIME_STROKE}', '#fff')
        .replace('${TIME_INFO}', time)
        .replace('${OPACITY}', (item.id === activeId) ? "1" : item.opacity())
        .replace('${STROKE_WIDTH}', (item.id === activeId) ? "1" : "0")
        .replace('${OUTER_WIDTH}', (text.length*11 + 50))
        .replace('${WIDTH}', text.length*11 + 40)
        .replace('${X}', text.length*1.5 + 40)
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
var homeLocation = {lat:37.485, lng:-122.209}
var map = new H.Map(document.getElementById('map'),
  defaultLayers.normal.map,{
  center: window.homeLocation,
  zoom: 11
});

map.setBaseLayer(defaultLayers.normal.traffic);
map.addLayer(defaultLayers.incidents);
//Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers);


graphInitialized = false

function hardRefreshMap(){
  var dataPoints = getEventList();
  map.removeObjects(map.getObjects())
  addSVGMarkers(map, dataPoints, activeId);
  if (graphInitialized == false){
    var icon = new H.map.Icon('mercedes-benz-xxl-small.png');
    var marker = new H.map.Marker({ lat: window.homeLocation.lat, lng: window.homeLocation.lng }, { icon: icon });
    map.addObject(marker);
    graphInitialized == true
  }
}

window.oldDataPoints = []
function refreshMap() {
  var dataPoints = getEventList();
  if ((dataPoints == undefined) || (window.oldDataPoints == undefined) || (window.oldDataPoints.length != dataPoints.length)){
    hardRefreshMap()
  }
  window.oldDataPoints = dataPoints
}
