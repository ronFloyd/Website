function getDanData(durl) {

  var currentDate = new Date();
  $.getJSON(durl, function(json) {
    console.log(json);
    var wData = json.data.weather,
        data = json.data.weather[0].hourly,
        dataNext = json.data.weather[1].hourly;

  function appendDayForcast() {
    for (var i = 1; i < 5; i++) {
      $('#'+i).children('.min').text(wData[i].mintempF+'\u00B0F');
      $('#'+i).children('.max').text(wData[i].maxtempF+'\u00B0F');
    }
  }

  function appendHourlyForcast() {
    var shownTime = ["2am","5am","8am","11am",
                     "2pm","5pm","8pm","11pm"],
        monthNames = ['Jan','Feb','Mar','Apr','May','Jun',
                      'Jul','Aug','Sep','Oct','Nov','Dec'],
        numHrs = shownTime.length,
        index = closest(),
        inc = 1,
        dFirst = currentDate,
        dNext = new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        dThird = new Date(new Date().getTime() + 48 * 120 * 120 * 2000),
        d = [dFirst.getDate(), dNext.getDate(), dThird.getDate()],
        month = [monthNames[dFirst.getMonth()],
                 monthNames[dNext.getMonth()],
                 monthNames[dThird.getMonth()]];
    $('.date1 td:nth-child(1)').text(month[0]+' '+d[0]);

    for (var i = 1; i < 4; i++) {

      for (var j = 1; j < 5; j++) {

        $('.hour'+i+' td:nth-child('+j+')').text(shownTime[index]);
        $('.temp'+i+' td:nth-child('+j+')').text(data[index].tempF+"\u00B0F");
        if (index === 0) {
          $('.date'+i+' td:nth-child('+j+')').text(month[inc]+' '+d[inc]);
          data = json.data.weather[inc].hourly;
          inc++;
        }
        index = (index + 1) % numHrs;
      }
    }
  }//end of appendHourlyForcast


  function closest () {
    //returns index of closest number in an array that is larger than given number.
    var num = currentDate.getHours()*100,
        hrs = [200, 500, 800, 1100, 1400, 1700, 2000, 2300],
        curr = hrs[0],
        diff = Math.abs (num - curr);

    for (var val = 0; val < hrs.length; val++) {
      var newdiff = Math.abs (num - hrs[val]);
      if (newdiff < diff) {
          diff = newdiff;
          curr = hrs[val];
      }
    }

    if (num > curr && curr === 2300) {
      curr = 200;
    } else if (num >= curr) {
      curr = curr + 300;
    }
    return hrs.indexOf(curr);
  } //end of closest


  appendDayForcast();
  appendHourlyForcast();

  });

}

function makeTableDays() {
    var d = new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        tomorrow = d.getUTCDay(),
        weekDays = ["Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday"],
        len = weekDays.length;
    for (var i = 1; i < 5; i++) {
      $('#dayforcast').append("<tr id="+i+"></tr>");
      $("#"+i).append("<td>"+weekDays[tomorrow]+
        "<td class='min'></td><td class='max'></td>");
      tomorrow = (tomorrow + 1) % len;
    }
} //end of makeTable

function makeTableHours() {

  for (var i = 1; i < 4; i++) {
    var dateRow = $('.date'+i);
    var hourRow = $('.hour'+i);
    var tempRow = $('.temp'+i);

    for (var j = 0; j < 4; j++) {
      dateRow.append("<td id='date'"+i+j+"></td>");
      hourRow.append("<td id='hour'"+i+j+"></td>");
      tempRow.append("<td id='temp'"+i+j+"></td>");
    }
  }
}//end of makeTableHours

$(function() {
  makeTableDays();
  makeTableHours();
});

var geocoder;
var map;
        geocoder = new google.maps.Geocoder();
        var directions;
        var fmaddr1 = document.getElementById("fromaddress");
        var toaddr1 = document.getElementById("toaddress");
        var zip1 = document.getElementById("zip");
        var options1 = {
        types: ['(regions)'],
        componentRestrictions: {country: "us"}
        };
        var autocomplete1 = new google.maps.places.Autocomplete(fmaddr1);
        var autocomplete2 = new google.maps.places.Autocomplete(toaddr1);
        var autocomplete3 = new google.maps.places.Autocomplete(zip1,options1);

var fetchData = function(jam){
  $.getJSON(jam, function(json){
      //console.log(json);
      $('#lowTemp').text(json.data.weather[0].mintempF);
      $('#highTemp').text(json.data.weather[0].maxtempF);
      $('#currentTemp').text(json.data.current_condition[0].temp_F);
    }
)};

$('#submit').on('click',updateTable1);


//BEGIN RON FLOYD'S SCRIPT

//Put focus in zipcode textbox when page loads
$("#zip").focus();

//Caching World Weather Online link
var baseUrl = "http://api.worldweatheronline.com/free/v2/weather.ashx?key=b5c474f461014299017e2c088f017&q=";

//On click, concatenate zipcode to baseUrl and envoke getData()
$("#fansbutton").on('click', function() {
  getdirections();
  return false;
});

$("#fansbutton2").on('click', function() {
  getdirectionsAH();
  return false;
});

$("#submit").on("click", function() {
  var stopText = $('#zip').val();
  var numDays = "&num_of_days=2&tp=3&format=json";
  var theUrl = baseUrl + stopText + numDays;
  getData(theUrl);

  var dUrl = "http://api.worldweatheronline.com/free/v2/"+
              "weather.ashx?key=b5c474f461014299017e2c088f017&q=";
  var dUrlEx = "&num_of_days=5&tp=1&format=json";
  var dFull = dUrl+stopText+dUrlEx;
  console.log(dFull);
  getDanData(dFull);
  codeAddress();


//Clear textbox and put focus back in
$("#zip").val("").focus();
});

//getData takes in concatenated Url and outputs wx info
var getData = function(url) {
  $.getJSON(url, function(json) {
    var wx = json,
        curWx = json.data.current_condition[0],
        curAstro = json.data.weather[0],
        humidity = curWx.humidity,
        pressure = curWx.pressure,
        visibility = curWx.visibility,
        wxDesc = curWx.weatherDesc[0].value,
        windDir = curWx.winddirDegree,
        windSpeed = curWx.windspeedMiles,
        uvIndex = curAstro.uvIndex;

  //Weather data output
  $('#wxDesc').text(wxDesc.toLowerCase());
  $('#humidity').text(humidity + "%");
  $('#pressure').text(pressure + " mb");
  $('#visibility').text(visibility + " mi");
  $('#windSpeed').text(windSpeed + " mph");
  $('#windDir').html(windDir + '&deg;');
  $('#uvIndex').text(uvIndex);

  function show_image(src) {
          myChildNode = document.getElementById('addimage');


          // mydiv = document.getElementById('addimage');

          var img = document.createElement("img");
          while ( myChildNode.firstChild ) myChildNode.removeChild( myChildNode.firstChild );
          img.src = src;
          myChildNode.appendChild(img);


          // myChildNode2 = document.getElementsByTagName('body');
          // var body = document.createElement("body");
          // while ( myChildNode2.firstChild ) myChildNode2.removeChild( myChildNode2.firstChild );
          // body.src = src;
          // myChildNode2.appendChild(src);
        }

        if(wxDesc == "Partly Cloudy"){
          show_image("images/partlycloudy.png");
          $( "body" ).removeClass("pcChange cChange oChange sChange").addClass( "pcChange" );
        }
        console.log(wxDesc);
        if(wxDesc == "Cloudy"){
          show_image("images/cloudy.png");
          // $( "body" ).className( "" );
          $( "body" ).removeClass("pcChange cChange oChange sChange").addClass( "cChange" );
        }
        console.log(wxDesc);
        if(wxDesc == "Overcast"){
          show_image("images/cloudy.png");
          $( "body" ).removeClass("pcChange cChange oChange sChange").addClass( "oChange" );
        }
        if(wxDesc == "Sunny"){
          show_image("images/sunny.png");
          $( "body" ).removeClass("pcChange cChange oChange sChange").addClass( "sChange" );
        }
        console.log(wxDesc);
        if(wxDesc == "Mist"){
          show_image("images/cloudy.png");
        }


  }
)}; //End of function getData

// Commit last entered zipcode to local storage.
var zip = document.getElementById('zip');
zip.value = localStorage.getItem('zip');
zip.addEventListener('input', function() {
  localStorage.setItem('zip', zip.value);
}, false);
//END RON FLOYD'S SCRIPT
//
//BEGIN FAN'S SCRIPT



function updateTable1(){
  event.preventDefault();
  var theUrl = "http://api.worldweatheronline.com/free/v2/weather.ashx?key=b5c474f461014299017e2c088f017&fx=yes&num_of_days=1&format=json&maxtempF=yes&q="
  console.log(theUrl);
  finalUrl = theUrl + $("#zip").val();
  fetchData(finalUrl);
}

function getdirections() {
        var CmyOptions = {
                zoom: 14,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
        map = new google.maps.Map(document.getElementById("mapholder"), CmyOptions);
        var trafficLayer = new google.maps.TrafficLayer;

        trafficLayer.setMap(map);
        var mode = google.maps.DirectionsTravelMode.DRIVING;
        var directionsDisplay = new google.maps.DirectionsRenderer();
        var directionsService = new google.maps.DirectionsService();
        var directionsVisible = false;
        directionsDisplay.setMap(null);
        directionsDisplay.setMap(map);
        var ShowMap = document.getElementById('mapholder');
        ShowMap.style.display='block';


        var fmaddr = document.getElementById("fromaddress").value;
        var toaddr = document.getElementById("toaddress").value;
        var request = {origin: fmaddr, destination:toaddr, travelMode: mode, optimizeWaypoints: true, avoidHighways:false, avoidTolls: false};
        //var request1 = {origin: fmaddr, destination:toaddr, travelMode: mode, optimizeWaypoints: true, avoidHighways:true, avoidTolls: false};
        directionsService.route
        (
                request,
                function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        $('#mapholder').append("<td id='directionsPanel'></td>");
                         directionsDisplay.setPanel(document.getElementById("directionsPanel"));
                    }
                }
        );
        directionsVisible = true;
    }


function getdirectionsAH() {
        var CmyOptions = {
                zoom: 14,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
        map = new google.maps.Map(document.getElementById("mapholder"), CmyOptions);
        var trafficLayer = new google.maps.TrafficLayer;

        trafficLayer.setMap(map);
        var mode = google.maps.DirectionsTravelMode.DRIVING;
        var directionsDisplay = new google.maps.DirectionsRenderer();
        var directionsService = new google.maps.DirectionsService();
        var directionsVisible = false;
        directionsDisplay.setMap(null);
        directionsDisplay.setMap(map);
        var ShowMap = document.getElementById('mapholder');
        ShowMap.style.display='block';


        var fmaddr = document.getElementById("fromaddress").value;
        var toaddr = document.getElementById("toaddress").value;
        //var request = {origin: fmaddr, destination:toaddr, travelMode: mode, optimizeWaypoints: true, avoidHighways:false, avoidTolls: false};
        var request1 = {origin: fmaddr, destination:toaddr, travelMode: mode, optimizeWaypoints: true, avoidHighways:true, avoidTolls: false};
        directionsService.route
        (
                request1,
                function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        $('#mapholder').append("<td id='directionsPanel'></td>");
                         directionsDisplay.setPanel(document.getElementById("directionsPanel"));
                    }
                }
        );
        directionsVisible = true;
    }

     function codeAddress() {
      var CmyOptions1 = {
                zoom: 14,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
        map = new google.maps.Map(document.getElementById("mapholder"), CmyOptions1);
        var ShowMap1 = document.getElementById('mapholder');
        ShowMap1.style.display='block';
        var trafficLayer = new google.maps.TrafficLayer;

        trafficLayer.setMap(map);
            var address = document.getElementById("zip").value;
            geocoder.geocode({
                'address' : address
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location);
                    var Amarker = new google.maps.Marker({
                        map : map,
                        position : results[0].geometry.location,
                        title : address,
                        animation : google.maps.Animation.DROP
                    });
                    var display = " " + results[0].formatted_address;
                    var infowindow = new google.maps.InfoWindow({
                        content : "<span style='font-size:11px'>"
                                 + "<br>" + display + "</span>",
                        pixelOffset : 0,
                        position : results[0].geometry.location

                    });
                    infowindow.open(map, Amarker);
                    google.maps.event.addListener(Amarker, 'click', function() {
                        infowindow.open(map, Amarker);
                    });
                } else {
                    alert("Geocode was not successful for the following reason: " + status);
                }
            });
        }


