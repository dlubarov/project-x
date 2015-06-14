/*  Set authentication app_id and app_code 
*   WARNING: this is a demo-only key
*   please register on http://developer.here.com/ 
*   and obtain your own API key 
*/

/* 
    author domschuette
    (C) HERE 2015
*/      
        
var app_id = "NJlLakrwLKyS3aO8C17p",
    app_code = "5krf3DymqySlgtLP7ku-zA",
    app_id_pde = "DemoAppId01082013GAL",
    app_code_pde = "AJKnXv84fjrb0KIHawS0Tg",
    mediokey = "023c3b555b4d256c71752032700c1d1477140774013c3f366d346c5f22342b2d3f28283c2e2f172f2b375a1d2908363422121a34",
    
    core = "https://js.cit.api.here.com/v3/3.0.10.0/mapsjs-core.js",
    service = "https://js.cit.api.here.com/v3/3.0.10.0/mapsjs-service.js",
    events = "https://js.cit.api.here.com/v3/3.0.10.0/mapsjs-mapevents.js",
    pano = "https://js.cit.api.here.com/v3/3.0.10.0/mapsjs-pano.js",
    data = "https://js.cit.api.here.com/v3/3.0.10.0/mapsjs-data.js",
    clustering = "https://js.cit.api.here.com/v3/3.0.10.0/mapsjs-clustering.js",
    ui = "https://js.cit.api.here.com/v3/3.0.10.0/mapsjs-ui.js",
    medio = "https://events.medio.com/jssdk";
    
    // for nightly test
    /*
    core = "js/nightly/mapsjs-core.js",
    service = "js/nightly/mapsjs-service.js",
    events = "js/nightly/mapsjs-mapevents.js",
    pano = "js/nightly/mapsjs-pano.js",
    data = "js/nightly/mapsjs-data.js",
    clustering = "js/nightly/mapsjs-clustering.js",
    ui = "js/nightly/mapsjs-ui.js";
    */
 

document.write('<script type="text/javascript" charset="UTF-8" src="' + core + '"></script>');
document.write('<script type="text/javascript" charset="UTF-8" src="' + service + '"></script>');
document.write('<script type="text/javascript" charset="UTF-8" src="' + events + '"></script>');
document.write('<script type="text/javascript" charset="UTF-8" src="' + pano + '"></script>');
document.write('<script type="text/javascript" charset="UTF-8" src="' + ui + '"></script>');
document.write('<script type="text/javascript" charset="UTF-8" src="' + clustering + '"></script>');
document.write('<script type="text/javascript" charset="UTF-8" src="' + data + '"></script>');
// document.write('<script type="text/javascript" charset="UTF-8" src="' + medio + '" data-medio-key="' + mediokey + '"></script>');

var medioLoad = '<script type="text/javascript" ' +
                'charset="UTF-8" '+
                'src="' + medio + '" ' +
                'data-medio-key=" ' + mediokey + '"' +
                'data-medio-cprop-key-id1="page_name" ' + 
                'data-medio-cprop-value-id1="3.0_' + document.title + '">' + 
                '</script>';

document.write(medioLoad);

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        var logoDivs = document.getElementsByClassName('logo');
        for(var i=0; i < logoDivs.length; i++)
        {
            div = logoDivs[i];
            div.onclick = function() 
            { 
                var elem = document.getElementById("notecontent");
                var visible = elem.style.display; 
                if(visible == "" || visible == "block")
                    elem.style.display = 'none';
                else
                    elem.style.display = 'block';
            };
        }
        // Medio Support to all JS API Pages
        /*
        Medio.Events.logEvent({
            event_name: "ViewedContent", 
            action_type: "ViewedContent", 
            item_id: document.URL,
            content_type: "rec", 
            page_name: "3.0 " + document.title,
            placement: "top",
            item_description: document.referrer
        });
        */
    }
}
    
/*
<script type="text/javascript" charset="UTF-8" src="http://js.cit.api.here.com/v3/3.0/mapsjs-core.js"></script>
<script type="text/javascript" charset="UTF-8" src="http://js.cit.api.here.com/v3/3.0/mapsjs-service.js"></script>
<script type="text/javascript" charset="UTF-8" src="http://js.cit.api.here.com/v3/3.0/mapsjs-mapevents.js"></script>
<script type="text/javascript" charset="UTF-8" src="http://js.cit.api.here.com/v3/3.0/mapsjs-pano.js"></script>
<script type="text/javascript" charset="UTF-8" src="http://js.cit.api.here.com/v3/3.0/mapsjs-ui.js"></script>
<script type="text/javascript" charset="UTF-8" src="http://js.cit.api.here.com/v3/3.0/mapsjs-clustering.js"></script>
<link rel="stylesheet" type="text/css" href="http://js.cit.api.here.com/v3/3.0/mapsjs-ui.css">
<link rel="stylesheet" type="text/css" href="http://tcs.it.here.com/Examples/src/css/defaults.css">
*/

// inject the css
document.write('<link rel="stylesheet" type="text/css" href="https://js.cit.api.here.com/v3/3.0/mapsjs-ui.css">');
// document.write('<link rel="stylesheet" type="text/css" href="js/defaults.css">');

/*
    Use this spinner for time consuming tasks
    #pageblock and #spinner CSS is required (included in defaults.css)
*/

var Spinner = (function () {
    return {
        hideSpinner: function()
        {
            document.getElementById('spinner').style.display = 'none';
            document.getElementById("pageblock").style.display = "none";
        },

        showSpinner: function()
        {
            spinnerImg = "<img src='http://static.here.sc/maps/44468/core/img/loading-big.gif' alt='spinner'>";
            
            var w = window,
                d = document,
                e = d.documentElement,
                g = d.getElementsByTagName('body')[0],
                x = w.innerWidth || e.clientWidth || g.clientWidth,
                y = w.innerHeight|| e.clientHeight|| g.clientHeight;

            var spinner = document.getElementById('spinner');
            var pageblock = document.getElementById('pageblock');

            if (spinner === null || pageblock === null) 
                throw new Error("Did you forget to add HTML tags for spinner and pageblock?");
            
            spinner.style.display = "block";
            spinner.style.zIndex = "5";
            spinner.style.left = x/2 + "px";
            spinner.style.top = y/2 + "px";
            spinner.innerHTML = spinnerImg;

            pageblock.style.display = "block";
            pageblock.style.zIndex = "3";   
        }
    };
})();

function inherits(B, A) {
  function I() {}
  I.prototype = A.prototype;
  B.prototype = new I();
  B.prototype.constructor = B;
}

/*
    Use this marker if a SVG with Base64 encoded image is required
*/
var svgMarkerImage_Line='<svg width="__widthAll__" height="60" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
                            '<g>' +
                                '<rect id="label-box" ry="3" rx="3" stroke="#000000" height="30" width="__width__" y="11" x="45" fill="#ffffff"/>'+
                                '<text id="label-text" xml:space="preserve" text-anchor="start" font-family="Sans-serif" font-size="10" font-weight="bold" y="24" x="55" stroke-width="0" fill="#000000">__line1__</text>' +
                                '<text id="label-desc" xml:space="preserve" text-anchor="start" font-family="Sans-serif" font-size="8" y="36" x="55" stroke-width="0" fill="#000000">__line2__</text>'+
                                '<image width="50" height="50" x="8.5" y="9.5" xlink:href="data:image/png;base64,R0lGODlhfQDCAPQdAAELHgEMHgIMHw8LHRALHR8KGyAKGxEbLCEqOzE5SUBIVkFIV2Fnc3B1gHF2gYCFjoCFj4+UnJCVnZ+jqqCkq6+yuLCzuc/R1NDS1d/g4uDh4+/v8PDw8f///wAAAAAAACH5BAEAAB4ALAAAAAB9AMIAAAX+oCeOJCmcaKqubOu+cCyvZW2XxKzvfO+vhNvN8Csaj0eD0IRsOp+vpQdKrUKF1qy2aNt6v7MSEUwup5Qjs9o8yq3f3uAUTteK6vjqPc9v7vuAP3OBhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnCkICwoMEA4KCwidWgsSGB2trq+uFxEKqEcHHhUcsLu8HRsTHge1OwgTvcfIE6fDLwcQyNDIEMLMKs4b0dm9G9PVJwkZ2uK9GQnVDOPpvQzDEervuxGdBxXw9q8V1JgHF/f+rRf0VeL3r2DAS/UKFqxgSYLChxIooXv4kF2kBBQzmnt0IFzGhxkELnr2kSIERwf+sJV8uEEkIpIrH55chCDmx2WJKNjMSEHRgZ0fXQaaCLRiIgtFKfZEpDJpwQ2IFjiluOCQw6kKIxrqh9Xgoa4Pv4ItaKjm2H84AUk9668qobVs7bkNBDPuOweF6tpNN5PuXnh43/59N1ftYHWF+2A8PC4tIMbjxELOdojVZGgYrF6GprUQ3M28EgfSBXoXh6Oldy09RDR1K4uHfrp2JTSQztmrEZl17fiQ3st9fZLezKG2od+Mgy86oGGzhoubN0JqPRh2pKuDO09C+tfCpQOW42IwzjH82PGaDnAHa4H8JOxTtXOiDtQ6qgTNgWqQzszZ8I8cKOeNMyV14w0LCNz+VhAFvR1oDQMU/CcOBxQw4J6DKqhi3jGyiIZhD58s4MAoC5jy4Ykopqjiiiy26OKLMMYo44w01mgjIIPcqMMfOoaRY48x8AgkDCIMMGQMA6RxZBQjFLBkCwWU8CQLXUyJAhZWShEJAAIE0GUAYIYp5phenkAmmCpw2YIUIjjZiJpbwKlClGyOYOQiclYBQJ4nJFknloXwCcWeKfxp6KGIJiplFn4q6uijkNagRaORVmrpoYxeqummS2TK6aeg/ugEpaGWGqkVpJqqaqJjXLHqq47qAeush7bqBK24/klFrrwuYSsSvQZb5a3CFiuCG34Ya+wTyhqL7BHNLptstMHTEktttcBeiy202m7LRbe9Zgsur9yOm2u55uJqRLrkfsuuuoK8C68P8uL664710upDqvmaei+S/erLA78Bh/qsDAQXDOrACsN6MAwJN8zpDhFLrOnDLlRs8aX4bqxqxx6b6mPIIstA8qomn1wykSqv7ELLLq8Jc6ksz7wwkzbfLHPOn+LM86b/nvCzzjQMzWnQRvdMZdKbYsz0xEU/fenDUm8addWVHoy1pipszTEKGnuta59iWwp22WYLEDbaWqrNdqVuvw1p3HI/unbdeOetN6whAAA7" />'+
                            '</g>'+
                          '</svg>';
var svgMarkerBase64Image='<svg width="__widthAll__" height="60" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
                            '<g>' +
                                '<image width="50" height="50" x="8.5" y="9.5" xlink:href="data:image/png;base64,R0lGODlhfQDCAPQdAAELHgEMHgIMHw8LHRALHR8KGyAKGxEbLCEqOzE5SUBIVkFIV2Fnc3B1gHF2gYCFjoCFj4+UnJCVnZ+jqqCkq6+yuLCzuc/R1NDS1d/g4uDh4+/v8PDw8f///wAAAAAAACH5BAEAAB4ALAAAAAB9AMIAAAX+oCeOJCmcaKqubOu+cCyvZW2XxKzvfO+vhNvN8Csaj0eD0IRsOp+vpQdKrUKF1qy2aNt6v7MSEUwup5Qjs9o8yq3f3uAUTteK6vjqPc9v7vuAP3OBhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnCkICwoMEA4KCwidWgsSGB2trq+uFxEKqEcHHhUcsLu8HRsTHge1OwgTvcfIE6fDLwcQyNDIEMLMKs4b0dm9G9PVJwkZ2uK9GQnVDOPpvQzDEervuxGdBxXw9q8V1JgHF/f+rRf0VeL3r2DAS/UKFqxgSYLChxIooXv4kF2kBBQzmnt0IFzGhxkELnr2kSIERwf+sJV8uEEkIpIrH55chCDmx2WJKNjMSEHRgZ0fXQaaCLRiIgtFKfZEpDJpwQ2IFjiluOCQw6kKIxrqh9Xgoa4Pv4ItaKjm2H84AUk9668qobVs7bkNBDPuOweF6tpNN5PuXnh43/59N1ftYHWF+2A8PC4tIMbjxELOdojVZGgYrF6GprUQ3M28EgfSBXoXh6Oldy09RDR1K4uHfrp2JTSQztmrEZl17fiQ3st9fZLezKG2od+Mgy86oGGzhoubN0JqPRh2pKuDO09C+tfCpQOW42IwzjH82PGaDnAHa4H8JOxTtXOiDtQ6qgTNgWqQzszZ8I8cKOeNMyV14w0LCNz+VhAFvR1oDQMU/CcOBxQw4J6DKqhi3jGyiIZhD58s4MAoC5jy4Ykopqjiiiy26OKLMMYo44w01mgjIIPcqMMfOoaRY48x8AgkDCIMMGQMA6RxZBQjFLBkCwWU8CQLXUyJAhZWShEJAAIE0GUAYIYp5phenkAmmCpw2YIUIjjZiJpbwKlClGyOYOQiclYBQJ4nJFknloXwCcWeKfxp6KGIJiplFn4q6uijkNagRaORVmrpoYxeqummS2TK6aeg/ugEpaGWGqkVpJqqaqJjXLHqq47qAeush7bqBK24/klFrrwuYSsSvQZb5a3CFiuCG34Ya+wTyhqL7BHNLptstMHTEktttcBeiy202m7LRbe9Zgsur9yOm2u55uJqRLrkfsuuuoK8C68P8uL664710upDqvmaei+S/erLA78Bh/qsDAQXDOrACsN6MAwJN8zpDhFLrOnDLlRs8aX4bqxqxx6b6mPIIstA8qomn1wykSqv7ELLLq8Jc6ksz7wwkzbfLHPOn+LM86b/nvCzzjQMzWnQRvdMZdKbYsz0xEU/fenDUm8addWVHoy1pipszTEKGnuta59iWwp22WYLEDbaWqrNdqVuvw1p3HI/unbdeOetN6whAAA7" />'+
                            '</g>'+
                          '</svg>';
