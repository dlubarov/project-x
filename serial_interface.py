#!/usr/bin/env python

import serial, sys
from Pubnub import Pubnub

# Each test bench is labeled with the serial device name on the USB cable
#device_name = '/dev/cu.usbserial-FTWDTKXJ'
device_name = sys.argv[1]
baud_rate   = 115200

# Set up the serial port connection
ser = serial.Serial(device_name, baud_rate)
ser.flushInput()
ser.flushOutput()

while True:
    raw_data = ser.readline()
    print raw_data
    # Parse the raw message from the serial port into a 'command' string and 'params' dictionary
    parts = raw_data.split()
    command = parts[0]
    params = dict((k, int(v)) for k, v in (p.split(':') for p in parts[1:]))

    # Print for debugging
    print command, params
    pubnub = Pubnub(publish_key="pub-c-22aec4e6-3009-4950-a1ee-816d158ceb65", subscribe_key="sub-c-aec92fe2-1209-11e5-86e0-0619f8945a4f")
    
    if command == 'cceRotate' and params['change']==1:
          print 'I detected clockwise rotation!'
          print(pubnub.publish('demo', 'clockWise'))
    elif command == 'cceRotate' and params['change']==-1:
          print 'I detected counterclockwise rotation!'
          print(pubnub.publish('demo', 'counterclockWise'))
    elif command =='cceBackPressed' or command =='touchpadBackTouched':
          print 'I detected Back button pressed or touched!'
          print(pubnub.publish('demo', 'Back'))
    elif command =='cceFavoritePressed' or command =='touchpadFavoriteTouched': 
          print 'I detected Favorite button pressed or touched!'
          print(pubnub.publish('demo', 'Favorite'))
    elif command =='selectPressed' or command=='touchpadAreaPressed':
          print 'I detected Select option!'
          print(pubnub.publish('demo', 'select'))
    elif command =='swipeUp':
          print 'I detected swipeUp!'
          print(pubnub.publish('demo', 'swipeUp'))
    elif command =='swipeRight':
          print 'I detected swipeRight!'
          print(pubnub.publish('demo', 'swipeRight'))
    elif command =='swipeDown':
          print 'I detected swipeDown!'
          print(pubnub.publish('demo', 'swipeDown'))
    elif command =='swipeLeft':
          print 'I detected swipeLeft!'
          print(pubnub.publish('demo', 'swipeLeft'))
#    else:
#          print 'More'

    # Force the system to flush the data buffer and write the output immediately
    sys.stdout.flush()
