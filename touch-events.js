function onSwipeLeft() {
  $('.slide1').animate({ left: '-100%' }, 500);
  $('.slide2').animate({ left: '0' }, 500);
}

function onSwipeRight() {
  $('.slide1').animate({ left: '0' }, 500);
  $('.slide2').animate({ left: '100%' }, 500);
}

function onSwipeUp() {
}

function onSwipeDown() {
  $('.slide1').animate({ top: '0' }, 500);
  $('.slide2').animate({ top: '0' }, 500);
  $('.slide3').animate({ top: '100%' }, 500);
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
  responsiveVoice.speak( 'Getting directions to ' + l );

  $('.slide1').animate({ top: '-100%' }, 500);
  $('.slide2').animate({ top: '-100%' }, 500);
  $('.slide3').animate({ top: '0' }, 500);

  display_route(window.homeLocation, element.coords, n, l, t);

  $.ajax({
    type: "POST",
    url: "https://api.twilio.com/2010-04-01/Accounts/AC9a515596e3fa86df283414da18876d05/Messages.json",
    data: {
      To: "+1 650 215 8697",
      From: "+1 650 817 7427",
      Body: "Daniel is on his way to " + element.event_location + "!"
    },
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "Basic " + btoa("AC9a515596e3fa86df283414da18876d05:5c1b7d68eb1d7757103674b1556d6467"));
    },
  })
  .fail(function(e) {
    console.log("failed to send SMS");
    console.log(e);
  });
}
