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

function onPress() {
  var element = $('.item').filter(function() { return this.event_id == activeId; })[0];

  $('.selected-item').removeClass('selected-item');
  selectItem(activeId);

  var n = $(element).find('.name').text();
  var l = $(element).find('.location').text();
  var t = $(element).find('.time').text();

  // Say the selected event
  responsiveVoice.speak( n + ' at ' + l + ' at ' + t );
}
