$('#map-overlay-eventbox').hide();
mapboxgl.accessToken = 'pk.eyJ1IjoiZGFhbnZyIiwiYSI6ImNpdTJmczN3djAwMHEyeXBpNGVndWtuYXEifQ.GYZf7r9gTfQL3W-GpmmJ3A';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/daanvr/ciw1eozkr00dd2jscswkbdfvg',
    center: [6.85220718383789, 52.24346350501319],
    zoom: 16,
    bearing: 10,
    pitch: 20,
    maxBounds: [[6.805686225891112, 52.223266707775876], [6.891775856018066, 52.264813883912355]],
    minZoom: 14
});

// function myFunction() {
//     document.getElementById("slider").stepUp(1);
//         console.log("+1 test!");
// }

map.on('click', function (e) {
    var features = map.queryRenderedFeatures(e.point, {});
    if (!features.length) {return;}
    var feature = features[0];
    
    document.getElementById('infobox_img').setAttribute('src', feature.properties.img);
    document.getElementById('infobox_imgurl').setAttribute('href', feature.properties.imgurl);
    document.getElementById('infobox_name').innerHTML = (feature.properties.name);
    document.getElementById('infobox_info').innerHTML = (feature.properties.info);
    document.getElementById('infobox_date').innerHTML = (feature.properties.start_date + " - " +feature.properties.end_date);
});

map.addControl(new mapboxgl.NavigationControl());
// map.on('load', function () {
//     // Change the cursor to a pointer when the mouse is over the places layer.
//     map.on('mouseenter', 'pois', function () {
//         map.getCanvas().style.cursor = 'pointer';
//     });
//     // Change it back to a pointer when it leaves.
//     map.on('mouseleave', 'pois', function () {
//         map.getCanvas().style.cursor = '';
//     });
// });

$(document).ready(function() {
    console.log("ready!");
    function filterBy(year) {
        var yearvar = document.getElementById("slider").value;
        var yearplus1N = Number(yearvar) + 1;
        var yearminus1N = Number(yearvar) - 1;
        var yearplus2N = Number(yearvar) + 2;
        var yearminus2N = Number(yearvar) - 2;
        var yearplus1 = yearplus1N.toString();
        var yearminus1 = yearminus1N.toString();
        var yearplus2 = yearplus2N.toString();
        var yearminus2 = yearminus2N.toString();
        map.setFilter('buildingslayer', [ "all", ['<=', 'start_date', year], ['>=', 'end_date', year]]);            //Buildings timeline
        map.setFilter('buildingslayer_name', [ "all", ['<=', 'start_date', year], ['>=', 'end_date', year]]);            //Buildings timeline
        map.setFilter('buildingslayer_shadow', [ "all", ['<=', 'start_date', year], ['>=', 'end_date', year]]);       //Buildings shadow timeline
        map.setFilter('waterlayer', [ "all", ['<=', 'start_date', year], ['>=', 'end_date', year]]);                //Water timeline
        map.setFilter('waysdataset', [ "all", ['<=', 'start_date', year], ['>=', 'end_date', year]]);               //Roads timeline
        map.setFilter('waysdataset_shadow', [ "all", ['<=', 'start_date', year], ['>=', 'end_date', year]]);          //Roads timeline
        map.setFilter('pois', [ "all", ['<=', 'start_date', year], ['>=', 'end_date', year]]);                      //Roads timeline
        map.setFilter('sports', [ "all", ['<=', 'start_date', year], ['>=', 'end_date', year]]);                      //Roads timeline
        map.setFilter('sports_name', [ "all", ['<=', 'start_date', year], ['>=', 'end_date', year]]);                      //Roads timeline
        map.setFilter('forestcampus', [ "all", ['<=', 'start_date', year], ['>=', 'end_date', year]]);                      //Roads timeline
        map.setFilter('photos', [ "any", ['==', 'date', year], ['==', 'date', yearplus1], ['==', 'date', yearminus1], ['==', 'date', yearplus2], ['==', 'date', yearminus2]]);                      //photo_pois timeline
        
        // Set the label above the selecor to the year
        //document.getElementById('yearlable').textContent = year;
        document.getElementById('yearlable').textContent = year;
        if (year == 1960) {
          document.getElementById('eventlable').textContent = "1960: The Drienerlo estate";
          $('#map-overlay-eventbox').show(); };
        if (year == 1961) {
          document.getElementById('eventlable').textContent = "1961: Official announcement of the THT";
          $('#map-overlay-eventbox').show(); };
        if (year == 1962) {
          document.getElementById('eventlable').textContent = "1962: Start of the construction works";
          $('#map-overlay-eventbox').show(); };
        if (year == 1964) {
          document.getElementById('eventlable').textContent = "1964: The first students arrive!";
          $('#map-overlay-eventbox').show(); };
        if (year == 1986) {
          document.getElementById('eventlable').textContent = "1986: The THT becomes the University of Twente";
          $('#map-overlay-eventbox').show(); };
        if (year == 2002) {
          document.getElementById('eventlable').textContent = "2002: Fire in the Cubicus destroying the east wing";
          $('#map-overlay-eventbox').show(); };
        if (year != 1986 && year != 1961 && year != 1962 && year != 1964 && year != 2002)  {
          document.getElementById('eventlable').textContent = "";
          $('#map-overlay-eventbox').hide(); };
    }

    map.on('load', function test() {
        //Set filter to first year of the year
        //filterBy("" + 2002 + "");
        //This has nowbeen doen earlyer in the code
        filterBy("" + 2002 + "");
        document.getElementById('slider').addEventListener('input', function(e) {
            var year = "" + parseInt(e.target.value, 10) + "";
            filterBy(year);
        });
            map.flyTo({
        center: [6.85220718383789, 52.24346350501319],
        zoom: 14.3,
        pitch: 0,
        bearing: 14,
        speed: 0.4, // make the flying slow
        curve: 1, // change the speed at which it zooms out
    });

    });
});

//The values in this variable are the layer names that will have a toggle.
var toggleableLayerIds = ['1960', '1963', '1965', '1968', '2003' ];

//The following code is to creatie the  buttons to toggle layers ON or OFF. This will be used to show layers of scanned maps.
for (var i = 0; i < toggleableLayerIds.length; i++) { //begining of the 
    var id = toggleableLayerIds[i];
    var link = document.createElement('a');
    link.href = '#';
    link.className = '';
    link.textContent = id;
    link.onclick = function (e) {
        //The following commented lines are some experiments to make the time jump to a year and to hide the infobox
        // var year = id;
        // filterBy(year);
        //$('#map-overlay-infobox').hide();
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();
        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');
        
        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
    };
    var layers = document.getElementById('menu');
    layers.appendChild(link);
}

function ConfirmContributionFunction() {
    var txt;
    var r = confirm("Did you press 'submit' at the bottom of the contribution?\nOK: I Submited my contribution or did not contribut.\nCancel: I forgot to submit my contribution.");
    if (r == true) {
        document.getElementById('contribute_iframe_background').style.display = 'none'
    } else {
        
    }
}

