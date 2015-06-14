window.activeId = null

var INTERVAL = 1000;

function setupAll() {
  setInterval(refreshAll, INTERVAL);
  var event_list = getEventList();
  if (activeId == null && (event_list.length != 0)){
    activeId = event_list[0].id
  }
  refreshAll()
  hardRefreshMap()

  // Say the content of the heading
  responsiveVoice.speak( $('h1').text() );
}

function refreshAll(){
  var event_list = getEventList();
  refreshList(event_list)
  refreshMap()
}

function modifyActiveId(increase, dataPoints) {
  index = _.findIndex(dataPoints, function(i){ return i.id == activeId })
  if (increase) {
    newIndex = index + 1
  } else {
    newIndex = index - 1
  }
  newIndex += dataPoints.length
  newIndex %= dataPoints.length
  activeId = dataPoints[newIndex].id
}
