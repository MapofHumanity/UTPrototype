// $('#map-overlay-eventbox').hide();
mapboxgl.accessToken = 'pk.eyJ1IjoiZGFhbnZyIiwiYSI6ImNpdTJmczN3djAwMHEyeXBpNGVndWtuYXEifQ.GYZf7r9gTfQL3W-GpmmJ3A';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/daanvr/ciw1eozkr00dd2jscswkbdfvg',
  center: [6.85220718383789, 52.24346350501319],
  zoom: 16,
  // bearing: 10,
  pitch: 30,
  maxBounds: [[6.805686, 52.223266], [6.891775, 52.264813]],
  minZoom: 14
});

// populate the infobox with data from the clicked feature properties
map.on('click', function (e) {
  var features = map.queryRenderedFeatures(e.point, {});
  if (!features.length) { return; }
  var feature = features[0];

  document.getElementById('infobox_img').setAttribute('src', feature.properties.img);
  document.getElementById('infobox_imgurl').setAttribute('href', feature.properties.imgurl);
  document.getElementById('infobox_name').innerHTML = (feature.properties.name);
  document.getElementById('infobox_info').innerHTML = (feature.properties.info);
  document.getElementById('infobox_date').innerHTML = (feature.properties.start_date + " - " + feature.properties.end_date);
});

map.addControl(new mapboxgl.NavigationControl());

// make the mouse a pointer for clickable map features
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

$(document).ready(function () {
  console.log("ready!");
  function filterBy(year) {
    var yearvar = document.getElementById("slider_input").value;
    var yearplus1N = Number(yearvar) + 1;
    var yearminus1N = Number(yearvar) - 1;
    var yearplus2N = Number(yearvar) + 2;
    var yearminus2N = Number(yearvar) - 2;
    var yearplus1 = yearplus1N.toString();
    var yearminus1 = yearminus1N.toString();
    var yearplus2 = yearplus2N.toString();
    var yearminus2 = yearminus2N.toString();

    // todo set filter once for all layers. The filter does not change per layer
    map.setFilter('buildingslayer', ["all", ['<=', 'start_date', year], ['>=', 'end_date', year]]);            //Buildings timeline
    map.setFilter('buildingslayer_name', ["all", ['<=', 'start_date', year], ['>=', 'end_date', year]]);            //Buildings timeline
    map.setFilter('buildingslayer_shadow', ["all", ['<=', 'start_date', year], ['>=', 'end_date', year]]);       //Buildings shadow timeline
    map.setFilter('waterlayer', ["all", ['<=', 'start_date', year], ['>=', 'end_date', year]]);                //Water timeline
    map.setFilter('waysdataset', ["all", ['<=', 'start_date', year], ['>=', 'end_date', year]]);               //Roads timeline
    map.setFilter('waysdataset_shadow', ["all", ['<=', 'start_date', year], ['>=', 'end_date', year]]);          //Roads timeline
    map.setFilter('pois', ["all", ['<=', 'start_date', year], ['>=', 'end_date', year]]);                      //Roads timeline
    map.setFilter('sports', ["all", ['<=', 'start_date', year], ['>=', 'end_date', year]]);                      //Roads timeline
    map.setFilter('sports_name', ["all", ['<=', 'start_date', year], ['>=', 'end_date', year]]);                      //Roads timeline
    map.setFilter('forestcampus', ["all", ['<=', 'start_date', year], ['>=', 'end_date', year]]);                      //Roads timeline

    // This filter is different for the other layers
    map.setFilter('photos', ["any", ['==', 'date', year], ['==', 'date', yearplus1], ['==', 'date', yearminus1], ['==', 'date', yearplus2], ['==', 'date', yearminus2]]);                      //photo_pois timeline





    // Set the year label to the selected year
    // document.getElementById('yearlable').textContent = year;

    // Show the eventbox and populate it if there is an event in the selected year
    // if (year == 1960) {
    //   document.getElementById('eventlable').textContent = "1960: The Drienerlo estate";
    //   $('#map-overlay-eventbox').show();
    // };
    // if (year == 1961) {
    //   document.getElementById('eventlable').textContent = "1961: Official announcement of the THT";
    //   $('#map-overlay-eventbox').show();
    // };
    // if (year == 1962) {
    //   document.getElementById('eventlable').textContent = "1962: Start of the construction works";
    //   $('#map-overlay-eventbox').show();
    // };
    // if (year == 1964) {
    //   document.getElementById('eventlable').textContent = "1964: The first students arrive!";
    //   $('#map-overlay-eventbox').show();
    // };
    // if (year == 1986) {
    //   document.getElementById('eventlable').textContent = "1986: The THT becomes the University of Twente";
    //   $('#map-overlay-eventbox').show();
    // };
    // if (year == 2002) {
    //   document.getElementById('eventlable').textContent = "2002: Fire in the Cubicus destroying the east wing";
    //   $('#map-overlay-eventbox').show();
    // };
    // if (year != 1986 && year != 1961 && year != 1962 && year != 1964 && year != 2002) {
    //   document.getElementById('eventlable').textContent = "";
    //   $('#map-overlay-eventbox').hide();
    // };
  }


  map.on('load', function test() {
    //Set filter to first year of the year
    //filterBy("" + 2002 + "");
    //This has nowbeen doen earlyer in the code
    filterBy("" + 2002 + "");

    document.getElementById('slider_input').addEventListener('input', function (e) {
      var year = "" + parseInt(e.target.value, 10) + "";
      filterBy(year);
    });

    map.flyTo({
      center: [6.85220718383789, 52.24346350501319],
      zoom: 14.3,
      pitch: 0,
      // bearing: 14,
      speed: 0.4, // make the flying slow
      curve: 1, // change the speed at which it zooms out
    });

  });
});


// raster layer switcher
document.getElementById("layerbox-menu").addEventListener("click", function (event) {
  const rasterLayers = ['1960', '1963', '1965', '1968', '2003'];
  
  // hide all raster layers
  for (const rasterLayer of rasterLayers) {
    map.setLayoutProperty(rasterLayer, 'visibility', 'none');
  }

  // show selected raster layer if any
  const layername = event.target.dataset.name;
  if (layername) {
    map.setLayoutProperty(layername, 'visibility', 'visible');
  }
});





// custom js for slider
const slider_input = document.getElementById('slider_input');
const slider_thumb = document.getElementById('slider_thumb');
const slider_line = document.getElementById('slider_line');

function showSliderValue() {
  slider_thumb.innerHTML = slider_input.value; // show value on thumb
  const bulletPosition = ((slider_input.value - slider_input.min) / (slider_input.max - slider_input.min)); // calculate bullet position
  const space = slider_input.offsetWidth - slider_thumb.offsetWidth; // calculate available space

  slider_thumb.style.left = (bulletPosition * space) + 'px'; // set bullet position
  // slider_line.style.width = slider_input.value + '%'; // set line length (not needed)
}

showSliderValue();
window.addEventListener("resize", showSliderValue);
slider_input.addEventListener('input', showSliderValue, false);
