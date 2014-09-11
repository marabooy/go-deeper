/**
 * Created by David Kaguma on 9/8/2014.
 */


$(document).ajaxStart(function () {
    NProgress.start();
});

$(document).ajaxComplete(function () {
    NProgress.done();
})

var markers = [];
//setup leaflet
var map = L.map('map').setView([-1.2833, 36.8167], 8);
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18
}).addTo(map);

map.locate({setView: true, maxZoom: 9});


function onMapClick(e) {
//        gib_uni();
    var marker = new L.marker(e.latlng);
    marker.on('dragend', function (event) {
        var marker = event.target;
        var position = marker.getLatLng();
        alert(position);
        marker.setLatLng([position], {draggable: 'true'}).bindPopup(position).update();
    });
    map.addLayer(marker);

    markers.push(marker);
    if (markers.length >= 2) {
        if (markers.length > 2) {

            var markerToDelete = markers.shift();
            map.removeLayer(markerToDelete);
        }
        makeThatCall(markers);
    }
};

map.on('click', onMapClick);


function makeThatCall(markers) {

    var values = [markers[0].getLatLng(), markers[1].getLatLng()];
    var query = [
        [
            values[0].lng,
            values[0].lat
        ],
        [
            values[1].lng,
            values[1].lat
        ]
    ];
//    console.log(query);

    $.ajax({
        method: 'POST',
        dataType: "json",
        url: '/search',
        contentType: 'application/json',
        data: JSON.stringify(query),
        success: function (response) {
            createList(response);
            console.log(response);
        }
    });


//

}


function createList(elements) {
    var list = "";
    for (var i = 0; i < elements.hits.hits.length; i++) {
        var element = elements.hits.hits[i];
        list += "<li> <span>" + element._id.substr(0, 5) + "</span> " +
        "<a  class='more-details' href=\"/search/document/" + element._type + "/" + element._id + "\" data-element-id='" + element._id + "'>Deeper <i class='glyphicon glyphicon-zoom-in'></i>  </a> "
        + "<a href=\"/playback/" + element._id + "\">Deeper<i class=\'glyphicon glyphicon-play-circle \'></i></a>" +
        "</li>";
        console.log(element);
    }

    if (elements.hits.hits.length !== 0) {
        $('.no-data').addClass('hide');
        $('#results > ul').html(list);
    }


}

$('#results  ul').on('click', 'li  a.more-details', function () {
    console.log(this.href);
    var elementId = $(this).data('element-id');
    console.log(elementId);
    //showTracks(elementId);
    populateGraphs(this.href);
    return false;
});

var tracksLayer;

function showTracks(id) {
    $.get('/search/geo-json/csv/' + id, function (geoJsonDoc) {

        //geoJson = geoJsonDoc._source;
        //console.log(geoJsonDoc);
        //tracksLayer = L.geoJson().addTo(map);
        //geoJson.geometry.type="MultiPoint";
        ////tracksLayer.addData(geoJson);


    });
}


