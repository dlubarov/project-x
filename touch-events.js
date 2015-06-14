function onSwipeLeft() {
  $('.slide1').hide();
  $('.slide2').show();
}

function onSwipeRight() {
  $('.slide1').show();
  $('.slide2').hide();
}

function onRotateClockwise() {
  modifyActiveId(true, getEventList())
  refreshAll()
  hardRefreshMap()
}

function onRotateCounterClockwise() {
  modifyActiveId(false, getEventList())
  refreshAll()
  hardRefreshMap()
}

function onSelect() {
  alert('select');
}
