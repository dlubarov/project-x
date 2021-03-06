var MAX_EVENTS = 20;
var REFRESH_INTERVAL = 2000;

var events = [];
var reverseGeocoderResults = {};

// Start fetching events. Should be called once after the document loads.
function calendarSetup() {
  var CLIENT_ID = '966845390272-mo4l390psfatd0a90ht3hlddikupo227.apps.googleusercontent.com';
  var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
  gapi.auth.authorize(
      {
        client_id: CLIENT_ID,
        scope: SCOPES,
        immediate: false
      },
      handleAuthResult);
}

// Get the latest availble list of events. Should be called repeatedly in order to see new events.
function getEventList() {
  return events.map(function(e) {
    e.setup()
    return e;
  });
}

function handleAuthResult(authResult) {
  if (authResult && !authResult.error) {
    gapi.client.load('calendar', 'v3', startFetchingEvents);
  } else {
    console.log('Google authentication failed.');
    console.log(authResult);
  }
}

function startFetchingEvents() {
  //setInterval(refreshEvents, REFRESH_INTERVAL);
  refreshEvents();
}

function CalEvent(gcal_event){
  requestCoordinates(gcal_event.location);
  this.id = gcal_event.id;
  this.time = formatDate(new Date(gcal_event.start.dateTime));
  this.dateTime = gcal_event.start.dateTime;
  this.time = formatDate(new Date(gcal_event.start.dateTime));
  this.name = gcal_event.summary;
  this.location = gcal_event.location;
  this.attendees = gcal_event.attendees;
  this.setup = function(){
    this.coordinates = reverseGeocoderResults[this.location];
    routeDistanceInSeconds(this)
  }.bind(this)
  this.travelTime = function(){
    fl =  (this.routeSummary.trafficTime / 60.0)
    return Math.ceil(fl)
  }.bind(this)
  this.trafficTime = function(){
    fl =  ((this.routeSummary.trafficTime - this.routeSummary.baseTime) / 60.0)
    return Math.ceil(fl)
  }.bind(this)
  this.toTime = function(){
    now = new Date
    then = new Date(this.dateTime)
    fl =  ((then - now) / 60 / 1000)
    return Math.ceil(fl)
  }.bind(this)
  this.leaveTime = function(){
    then = new Date(this.dateTime)
    earlier = then - (this.routeSummary.trafficTime * 1000)
    earlierDate = new Date(earlier)
    return formatDate(earlierDate)
  }.bind(this)
  this.opacity = function(){
    min = 0.2
    max = 1
    diff = (1-(this.toTime() / maxToTime())) * (max - min)
    return min + diff
  }
}

function maxToTime(){
  return _.max(_.map(getEventList(), function(event){return event.toTime()}))
}

function refreshEvents() {
  var timeMin = new Date();
  var timeMax = new Date();
  timeMax.setHours(timeMax.getHours() + 24);

  var request = gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': timeMin.toISOString(),
    'timeMax': timeMax.toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': MAX_EVENTS,
    'orderBy': 'startTime'
  });

  request.execute(function(resp) {
    events = resp.items.map(function(gcal_event) { return new CalEvent(gcal_event)});
  });
}

function formatDate(date) {
  var h = date.getHours().toString();
  var suffix;
  if (h > 12) {
    h -= 12;
    suffix = 'pm'
  } else {
    suffix = 'am'
  }
  var m = date.getMinutes().toString();
  if (m.length == 1)
    m = "0" + m;
  return h + ':' + m + ' ' + suffix;
}

function requestCoordinates(location) {
  if (reverseGeocoderResults[location]) {
    return; // Already have this location's coordinates.
  }

  console.log('Making reverse geocoder request');
  var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(location);
  $.get(url, function(data) {
    if (data && data.results.length) {
      reverseGeocoderResults[location] = data.results[0].geometry.location;
    }
  });
}
