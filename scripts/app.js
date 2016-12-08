// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

$(document).on("ready", function() {
  //load page with map
$.ajax( {
        method:"GET",
        url:"http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson",
        dataType: "json",
        success: onSuccess,
        // error: onError,
        // complete: onCompletion
      })

map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 1
              });

function onSuccess(quakes){
    quakes.features.forEach(function(quakes){
        var lngLat = {
          lng: quakes.geometry.coordinates[1],
          lat: quakes.geometry.coordinates[0]
        }
        var timeSince = time(quakes);
        var developerHtml = template({
          magnitude: quakes.properties.mag,
          place: quakes.properties.place,
          time: timeSince
        });
        $('#info').append(developerHtml);
        marker = new google.maps.Marker({
          map: map,
          position: lngLat
    });
  });
}


// function plotCoordinates (feature) {
//   new google.maps.Marker( {
//     position: {
//     long: feature.geometry.coordinates[1],
//     lat: feature.geometry.coordinates[0]
//   })



    var source = $('#earthquake-template').html();
    var template = Handlebars.compile(source);



  function time(quakes) {
    var quakeTime = quakes.properties.time;
    var now = Date.now();
    return ((now - quakeTime) /(1000 * 60 * 60 * 24)).toFixed(2);

  }

})

// function plotCoordinates (feature) {
//   new google.maps.Marker( {
//     position: {
//     long: feature.geometry.coordinates[1],
//     lat: feature.geometry.coordinates[0]
//   })
// }
  // function onError(){
  // // alert("Sorry, there was a problem!");
  // // console.log("Error: " + errorThrown);
  // // console.log("Status: " + status);
  // // console.dir(xhr);
  //
  // };
  //
  // function onCompletion(){
  //
  // };
