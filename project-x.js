var event_list = [
    {   'name' : 'Fill up on gas',
        'location_name' : 'the gas station on burlingame avenue'
    },
    {   'name' : 'Drop off mail',
        'location_name': 'Burlingame post office'
    },
    {   'name' : 'Event3',
        'location_name': 'Location3'
    },
    {   'name' : 'Event4',
        'location_name': 'Location4'
    },
    {   'name' : 'Event5',
        'location_name': 'Location5'
    },
    {   'name' : 'Event6',
        'location_name': 'Location6'
    },
    {   'name' : 'Event7',
        'location_name': 'Location7'
    },
    {   'name' : 'Event8',
        'location_name': 'Location8'
    },
    {   'name' : 'Event9',
        'location_name': 'Location9'
    },
    {   'name' : 'Event10',
        'location_name': 'Location10'
    },
];

for( var e in event_list ) {
    // Create an "item" div
    var item = document.createElement("div");
    item.id = "item_" + e;
    item.className = "item";

    // Make the first item selected by default
    if( e == 0 ) {
        item.className += " selected-item";
    }

    // Add onclick event (for now)
    item.onclick = function() {
        jQuery('.selected-item').removeClass('selected-item');
        this.className += ' selected-item';
    }

    // Add the name and location divs
    var n = document.createElement("div");
    var t = document.createTextNode( event_list[e].name );
    n.appendChild( t );
    item.appendChild( n );
    n.className += " name";

    var location_name = document.createElement("div");
    var t = document.createTextNode( event_list[e].location_name );
    location_name.appendChild( t );
    item.appendChild( location_name );
    location_name.className += " location-name";

    // Append to "items" div
    var items = document.getElementById("items");
    items.appendChild( item );
}
