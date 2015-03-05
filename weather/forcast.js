// function getDanData(durl) {

//   var currentDate = new Date();
//   $.getJSON(durl, function(json) {
//     console.log(json);
//     var wData = json.data.weather,
//         data = json.data.weather[0].hourly,
//         dataNext = json.data.weather[1].hourly;

//   function appendDayForcast() {
//     for (var i = 1; i < 5; i++) {
//       $('#'+i).children('.min').text(wData[i].mintempF+'\u00B0F');
//       $('#'+i).children('.max').text(wData[i].maxtempF+'\u00B0F');
//     }
//   }

//   function appendHourlyForcast() {
//     var shownTime = ["2am","5am","8am","11am",
//                      "2pm","5pm","8pm","11pm"],
//         monthNames = ['Jan','Feb','Mar','Apr','May','Jun',
//                       'Jul','Aug','Sep','Oct','Nov','Dec'],
//         numHrs = shownTime.length,
//         index = closest(),
//         inc = 1,
//         dFirst = currentDate,
//         dNext = new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
//         dThird = new Date(new Date().getTime() + 48 * 120 * 120 * 2000),
//         d = [dFirst.getDate(), dNext.getDate(), dThird.getDate()],
//         month = [monthNames[dFirst.getMonth()],
//                  monthNames[dNext.getMonth()],
//                  monthNames[dThird.getMonth()]];
//     $('.date1 td:nth-child(1)').text(month[0]+' '+d[0]);

//     for (var i = 1; i < 4; i++) {

//       for (var j = 1; j < 5; j++) {

//         $('.hour'+i+' td:nth-child('+j+')').text(shownTime[index]);
//         $('.temp'+i+' td:nth-child('+j+')').text(data[index].tempF+"\u00B0F");
//         if (index === 0) {
//           $('.date'+i+' td:nth-child('+j+')').text(month[inc]+' '+d[inc]);
//           data = json.data.weather[inc].hourly;
//           inc++;
//         }
//         index = (index + 1) % numHrs;
//       }
//     }
//   }//end of appendHourlyForcast


//   function closest () {
//     //returns index of closest number in an array that is larger than given number.
//     var num = currentDate.getHours()*100,
//         hrs = [200, 500, 800, 1100, 1400, 1700, 2000, 2300],
//         curr = hrs[0],
//         diff = Math.abs (num - curr);

//     for (var val = 0; val < hrs.length; val++) {
//       var newdiff = Math.abs (num - hrs[val]);
//       if (newdiff < diff) {
//           diff = newdiff;
//           curr = hrs[val];
//       }
//     }

//     if (num > curr && curr === 2300) {
//       curr = 200;
//     } else if (num > curr) {
//       curr = curr + 300;
//     }
//     return hrs.indexOf(curr);
//   } //end of closest


//   appendDayForcast();
//   appendHourlyForcast();

//   });

// }

// function makeTableDays() {
//     var d = new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
//         tomorrow = d.getUTCDay(),
//         weekDays = ["Sunday",
//                     "Monday",
//                     "Tuesday",
//                     "Wednesday",
//                     "Thursday",
//                     "Friday",
//                     "Saturday"],
//         len = weekDays.length;
//     for (var i = 1; i < 5; i++) {
//       $('#dayforcast').append("<tr id="+i+"></tr>");
//       $("#"+i).append("<td>"+weekDays[tomorrow]+
//         "<td class='min'></td><td class='max'></td>");
//       tomorrow = (tomorrow + 1) % len;
//     }
// } //end of makeTable

// function makeTableHours() {

//   for (var i = 1; i < 4; i++) {
//     var dateRow = $('.date'+i);
//     var hourRow = $('.hour'+i);
//     var tempRow = $('.temp'+i);

//     for (var j = 0; j < 4; j++) {
//       dateRow.append("<td id='date'"+i+j+"></td>");
//       hourRow.append("<td id='hour'"+i+j+"></td>");
//       tempRow.append("<td id='temp'"+i+j+"></td>");
//     }
//   }
// }//end of makeTableHours

// $(function() {
//   makeTableDays();
//   makeTableHours();
//   $('#submit').on('click', function() {
//     var dUrl = "http://api.worldweatheronline.com/free/v2/"+
//               "weather.ashx?key=b5c474f461014299017e2c088f017&q=";
//     var dUrlEx = "&num_of_days=5&tp=1&format=json";
//     var dLoc = $('#zip').val();
//     var dFull = dUrl+dLoc+dUrlEx;
//     console.log(dFull);
//     getDanData(dFull);
//   });
// });


