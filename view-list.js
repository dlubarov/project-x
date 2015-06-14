function refreshList(event_list) {
    $('#items').empty();

    for(var e = 0; e < event_list.length; e += 1) {
        // Create an 'item' div
        var item = document.createElement('div');
        item.id = 'item_' + e;
        item.className = 'item';
        item.event_id = event_list[e].id;

        if( event_list[e].id == window.activeId ) {
            item.className += ' selected-item';
        }

        // Add onclick event (for now)
        item.onclick = function(e) {
            $('.selected-item').removeClass('selected-item');
            this.className += ' selected-item';
            window.activeId = this.event_id;
        }

        // Time
        var time = document.createElement('div');
        time.appendChild(document.createTextNode(event_list[e].time));
        time.className = 'time';
        item.appendChild(time);

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
        location.className += ' location-name';

        // Append to 'items' div
        var items = document.getElementById('items');
        items.appendChild( item );
    }

    if( $( '.selected-item' ).length == 0 ) {
        $('.item').first().addClass('selected-item');
    }
}
