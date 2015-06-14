$('.slide2').hide()


window.activeId = null

var INTERVAL = 1000;

function setupAll() {
  setInterval(refreshAll, INTERVAL);
  window.activeId = getEventList()[0].id
  refreshAll()
}

function refreshAll(){
  var event_list = getEventList();
  if (activeId == null && (event_list.length != 0)){
    activeId = event_list[0].id
  }
  refreshList(event_list)
  setupMap(event_list)
}
