// MBTA Lab JavaScript
southStation = new google.maps.LatLng(42.352271, -71.05524200000001);
andrew = new google.maps.LatLng(42.330154, -71.057655);
porter = new google.maps.LatLng(42.3884, -71.11914899999999);
harvard = new google.maps.LatLng(42.373362, -71.118956);
umass = new google.maps.LatLng(42.320685, -71.052391);
savin = new google.maps.LatLng(42.31129, -71.053331);
parkSt = new google.maps.LatLng(42.35639457, -71.0624242);
broadway = new google.maps.LatLng(42.342622, -71.056967);
northQuincy = new google.maps.LatLng(42.275275, -71.029583);
shawmut = new google.maps.LatLng(42.29312583, -71.06573796000001);
davis = new google.maps.LatLng(42.39674, -71.121815);
alewife = new google.maps.LatLng(42.395428, -71.142483);
kendall = new google.maps.LatLng(42.36249079, -71.08617653);
charlesMGH = new google.maps.LatLng(42.361166, -71.070628);
dtnCrs = new google.maps.LatLng(42.355518, -71.060225);
quincyCtr = new google.maps.LatLng(42.251809, -71.005409);
quincyAdams = new google.maps.LatLng(42.233391, -71.007153);
ashmont = new google.maps.LatLng(42.284652, -71.06448899999999);
wollaston = new google.maps.LatLng(42.2665139, -71.0203369);
fields = new google.maps.LatLng(42.300093, -71.061667);
central = new google.maps.LatLng(42.365486, -71.103802);
braintree = new google.maps.LatLng(42.2078543, -71.0011385);

redLineStops = [{name: "South Station", location: southStation},
                {name: "Andrew", location: andrew},
                {name: "Porter Square", location: porter},
                {name: "Harvard Square", location: harvard},
                {name: "JFK/UMass", location: umass},
                {name: "Savin Hill", location: savin},
                {name: "Park Street", location: parkSt},
                {name: "Broadway", location: broadway},
                {name: "North Quincy", location: northQuincy},
                {name: "Shawmut", location: shawmut},
                {name: "Davis Square", location: davis},
                {name: "Alewife", location: alewife},
                {name: "Kendall Square/MIT", location: kendall},
                {name: "Charles/MGH", location: charlesMGH},
                {name: "Downtown Crossing", location: dtnCrs},
                {name: "Quincy Center", location: quincyCtr},
                {name: "Quincy Adams", location: quincyAdams},
                {name: "Ashmont", location: ashmont},
                {name: "Wollaston", location: wollaston},
                {name: "Fields Corner", location: fields},
                {name: "Central Square", location: central},
                {name: "Braintree", location: braintree}];

route = [alewife, davis, porter, harvard, central, kendall, charlesMGH,
             parkSt, dtnCrs, southStation, broadway, andrew, umass,
             northQuincy, wollaston, quincyCtr, quincyAdams, braintree];

branch = [umass, savin, fields, shawmut, ashmont];

var options = {
        center: southStation,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
}


function createMap() {         
        map = new google.maps.Map(document.getElementById('map'), options);

        makeRedLine();

        addGeoLoc();

        
}

function makeRedLine() {
        redLineStops.forEach(addStop);

        var redLine = new google.maps.Polyline ({
                path: route,
                strokeColor: "#ef1a2c",
                strokeWeight: 2,
                map: map
        });

        var redLineBranch = new google.maps.Polyline ({
                path: branch,
                strokeColor: "#ef1a2c",
                strokeWeight: 2,
                map: map
        });
}

function addStop (element, index, array) {
        var marker = new google.maps.Marker({
                position:element.location,
                title: element.name,
                map: map,
                icon: 'favicon.ico'
        });
        var info = new google.maps.InfoWindow({
                content: element.name
        });
        marker.addListener('click', function() {
                info.open(map,marker);
        });
}

function addGeoLoc () {
        navigator.geolocation.getCurrentPosition(findPosition);
        
}

function findClosest () {
        closestStop = redLineStops[0];
        closestDistance = google.maps.geometry.spherical.computeDistanceBetween(myPosition, closestStop.location);

        for (var i = 0; i < redLineStops.length; i++) {
                var currentDistance = google.maps.geometry.spherical.computeDistanceBetween(myPosition, redLineStops[i].position);
                if (currentDistance < closestDistance) {
                        closestStop = redLineStops[i];
                        closestDistance = currentDistance;
                }
        }
        console.log(closestStop.name);

}

function findPosition (position) {
        myPosition =  new google.maps.LatLng(position.coords.latitude, 
                position.coords.longitude);

        findClosest();

        var marker = new google.maps.Marker({
                position: myPosition,
                title: "Your Location",
                map: map,
        });
        var info = new google.maps.InfoWindow({
                content: "The closest stop is " + closestStop.name
        });
        marker.addListener('click', function() {
                info.open(map,marker);
        });
}




