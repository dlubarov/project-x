function onSwipeLeft() {
  $('.slide1').animate({ left: '-100%' }, 500);
  $('.slide2').animate({ left: '0' }, 500);
}

function onSwipeRight() {
  $('.slide1').animate({ left: '0' }, 500);
  $('.slide2').animate({ left: '100%' }, 500);
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

  $('.slide1').animate({ top: '-100%' }, 500);
  $('.slide2').animate({ top: '-100%' }, 500);
  $('.slide3').animate({ left: '0' }, 500);
  display_route();
}
