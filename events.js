var MAX_EVENTS = 4;
var REFRESH_INTERVAL = 500000;

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
    e.coordinates = reverseGeocoderResults[e.location];
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
  setInterval(refreshEvents, REFRESH_INTERVAL);
  refreshEvents();
}

function refreshEvents() {
  var timeMin = new Date();
  var timeMax = new Date();
  timeMax.setHours(timeMax.getHours() + 12);

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
    events = resp.items.map(function(gcal_event) {
      requestCoordinates(gcal_event.location);
      return {
        'name': gcal_event.summary,
        'location': gcal_event.location,
      };
    });
  });
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
