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
            selectItem(this.event_id);

            var n = $(this).find('.name').text();
            var l = $(this).find('.location').text();
            var t = $(this).find('.time').text();

            // Say the selected event
            responsiveVoice.speak( n + ' at ' + l + ' at ' + t );
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
