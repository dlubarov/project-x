var pubnub = PUBNUB.init({
    publish_key: 'pub-c-22aec4e6-3009-4950-a1ee-816d158ceb65',
    subscribe_key: 'sub-c-aec92fe2-1209-11e5-86e0-0619f8945a4f'
});

pubnub.subscribe({
   channel: 'demo',
   message: function(m){
     switch (m) {
       case "swipeLeft":
         onSwipeLeft();
         break;
       case "swipeRight":
         onSwipeRight();
         break;
       case "swipeUp":
         onSwipeUp();
         break;
       case "swipeDown":
         onSwipeDown();
         break;
       case "clockWise":
         onRotateClockwise();
         break;
       case "counterclockWise":
         onRotateCounterClockwise();
         break;
       case "select":
         onPress();
       case "touchpadSelect":
         onPressTouchpad();
     }
   },
   error: function (error) {
     // Handle error here
     console.log(JSON.stringify(error));
   }
});
