var INTERVAL = 1000;

var selected_event_id;

function setupList() {
    setInterval(refreshList, INTERVAL);
    refreshList();
}

function refreshList() { 
    $('#items').empty();

    var event_list = getEventList();

    for(var e = 0; e < event_list.length; e += 1) {
        // Create an 'item' div
        var item = document.createElement('div');
        item.id = 'item_' + e;
        item.className = 'item';
        item.event_id = event_list[e].id;

        if( event_list[e].id == selected_event_id ) {
            item.className += ' selected-item';
        }

        // Add onclick event (for now)
        item.onclick = function(e) {
            $('.selected-item').removeClass('selected-item');
            this.className += ' selected-item';
            selected_event_id = this.event_id;
        }

        // Add the name and location divs
        var n = document.createElement('div');
        var t = document.createTextNode( event_list[e].name );
        n.appendChild( t );
        item.appendChild( n );
        n.className += ' name';

        var location = document.createElement('div');
        var t = document.createTextNode( event_list[e].location );
        location.appendChild( t );
        item.appendChild( location );
        location.className += ' location-name';

        // Append to 'items' div
        var items = document.getElementById('items');
        items.appendChild( item );
    }

    console.log( $( '.selected-item' ).length );
    if( $( '.selected-item' ).length == 0 ) {
        $('.item').first().addClass('selected-item');
    }
}
