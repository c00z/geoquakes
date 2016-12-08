// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

$(document).on("ready", function() {
  //load page with map
var quakeData =  $.ajax( {
        method:"GET",
        url:"http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson",
        dataType: "json",
        data: $('body').serialize(),
        success: onSuccess,
        // error: onError,
        // complete: onCompletion
      })


function onSuccess(quakes){
    quakes.features.forEach(function(quakes){
      var timeSince = time(quakes);
      var developerHtml = template({
      magnitude: quakes.properties.mag,
      place: quakes.properties.place,
      time: timeSince //create funct later
    });
    $('#info').append(developerHtml);
  });
}

      // var timeSince = time(quakes);
      // var earthquake-template



    var source = $('#earthquake-template').html();
    var template = Handlebars.compile(source);

    // shake.forEach(function(object) {
    //  $('#shaker').append(developerHtml) //HANDLE BARS

  //    var developerHtml = template({
  //      title: responseData.feature.properties.title,
  //      lat: responseData.feature.geometry.coordinates[0],
  //      lon: responseData.feature.geometry.coordinates[1],
  //      });
  //
  // };

  function time(quakes) {
    var quakeTime = quakes.properties.time;
    var now = Date.now();
    return ((now - quakeTime) /(1000 * 60 * 60 * 24)).toFixed(2);

  }

})

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
