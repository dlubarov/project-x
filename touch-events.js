// TODO: enable for the demo.
var SMS_ENABLED = false;

function onSwipeLeft() {
  $('.slide1').css({position: 'absolute', height: '100%'});
  $('.slide1').animate({ left: '-100%' }, 500);
  $('.slide2').animate({ left: '0' }, 500);
}

function onSwipeRight() {
  $('.slide1').animate({ left: '0' }, 500, function() { $('.slide1').css({position: 'static', height: 'auto'}); });
  $('.slide2').animate({ left: '100%' }, 500);
}

function onSwipeUp() {
}

function onSwipeDown() {
  $('.slide1').animate({ top: '0' }, 500);
  $('.slide2').animate({ top: '0' }, 500);
  $('.slide3').animate({ top: '100%' }, 500, function() { $('.slide3').hide(); });
}

function onRotateClockwise() {
  modifyActiveId(true, getEventList())
  refreshAll()
  hardRefreshMap()
  scroll();
}

function onRotateCounterClockwise() {
  modifyActiveId(false, getEventList())
  refreshAll()
  hardRefreshMap()
  scroll();
}

function onPress() {
  $('.slide3').show();
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

  if (SMS_ENABLED && element.attendees && element.attendees.length >= 2) {
    $.ajax({
      type: "POST",
      url: "https://api.twilio.com/2010-04-01/Accounts/AC9a515596e3fa86df283414da18876d05/Messages.json",
      data: {
        To: "+1 650 215 8697",
        From: "+1 650 817 7427",
        Body: "Peter is on his way to " + element.event_location + "!"
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
}

function scroll() {
    if( $( '.selected-item' ).length ) {
        $('#pager').scrollTo('.selected-item');
        //var pagerHeight = $('#pager').height();
        //var scroll = $(".selected-item").offset().top - pagerHeight/2;
        //var min = 0;
        //var max = $('.slide1').height() - pagerHeight;
        //if (max < 0) max = 0;
        //if (scroll < min) scroll = min;
        //if (scroll > max) scroll = max;
        //$('#pager').animate({
        //    scrollTop: scroll
        //}, 100);
    }
}

$.fn.scrollTo = function( target, options, callback ){
  if(typeof options == 'function' && arguments.length == 2){ callback = options; options = target; }
  var settings = $.extend({
    scrollTarget  : target,
    offsetTop     : 50,
    duration      : 250,
    easing        : 'swing'
  }, options);
  return this.each(function(){
    var scrollPane = $(this);
    var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
    var pagerHeight = $('#pager').outerHeight();
    var scrollY = scrollTarget.offset().top + scrollPane.scrollTop() - pagerHeight/2 + 50;
    var max = $('.slide1').outerHeight() - pagerHeight + 10;
    if (max < 0) max = 0;
    if (scrollY > max) scrollY = max;
    scrollPane.animate({scrollTop : scrollY }, parseInt(settings.duration), settings.easing, function(){
      if (typeof callback == 'function') { callback.call(this); }
    });
  });
}

function scrollToView(element){
    var offset = element.offset().top;
    if(!element.is(":visible")) {
        element.css({"visiblity":"hidden"}).show();
        var offset = element.offset().top;
        element.css({"visiblity":"", "display":""});
    }

    var visible_area_start = $(window).scrollTop();
    var visible_area_end = visible_area_start + window.innerHeight;

    if(offset < visible_area_start || offset > visible_area_end){
         // Not in view so scroll to it
         $('#pager').animate({scrollTop: offset - window.innerHeight/3}, 1000);
         return false;
    }
    return true;
}
