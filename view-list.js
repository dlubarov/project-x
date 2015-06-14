function refreshList(event_list) {
    $('#items').empty();

    for(var e = 0; e < event_list.length; e += 1) {
        // Create an 'item' div
        var item = document.createElement('div');
        item.id = 'item_' + e;
        item.className = 'item';
        item.event_id = event_list[e].id;
        item.event_location = event_list[e].location;
        item.coords = event_list[e].coordinates;
        item.attendees = event_list[e].attendees;

        if( event_list[e].id == window.activeId ) {
            item.className += ' selected-item';
        }

        // Time
        var time = document.createElement('div');
        time.appendChild(document.createTextNode(event_list[e].time));
        time.className = 'time';
        item.appendChild(time);

        // Timing details
        var details = document.createElement('div');
        var travelTimeMinutes = event_list[e].travelTime();
        details.appendChild(document.createTextNode('Travel time ' + travelTimeMinutes + ' minutes. Leave by ' + event_list[e].leaveTime() + '.'));
        details.className = 'time-details';
        item.appendChild(details);

        // Name
        var n = document.createElement('div');
        var t = document.createTextNode( event_list[e].name );
        n.appendChild( t );
        item.appendChild( n );
        n.className += ' name';

        // Location
        var location = document.createElement('div');
        var t = document.createTextNode( event_list[e].location );
        location.appendChild( t );
        item.appendChild( location );
        location.className += ' location';

        // Append to 'items' div
        var items = document.getElementById('items');
        items.appendChild( item );
    }

    if( $('.item').length > 0 && $( '.selected-item' ).length == 0 ) {
        selectItem($('.item')[0].event_id);
    }
}

function selectItem(id) {
    activeId = id;
    $('.item').filter(function() { return this.event_id == id; }).addClass('selected-item');
}
