//Function to rename page title.********************
$(function() {
  var $textInput = $('input:text');

  $('#formTitle').on('submit', function(e) {
    e.preventDefault();
    var newText = $('input:text').val();
    $('#title').text(newText);
    $textInput.val('');
  });
})
//**************************************************

function Voodoo(location, id, hours, traffic, entered, ordered) {
  this.location = location;
  this.id = id;
  this.hours = hours;
  this.traffic = traffic;
  this.entered = entered;
  this.ordered = ordered;

  this.report = function(content, element) {
    var loc = document.getElementById(this.id);
    var newEl = document.createElement(element);
    var newText = document.createTextNode(content);
    newEl.appendChild(newText);
    loc.appendChild(newEl);
  };

  this.report(location, 'th');

  this.calculate = function() {
    var open = this.hours[0],
        close = this.hours[1],
        total = 0,
        donutsPerHour,
        randomTraffic;

    for(var i = open; i <= close; i++) {
      randomTraffic = Math.floor(Math.random() * (this.traffic[1] - this.traffic[0]) + this.traffic[0]);
      donutsPerHour = Math.floor(randomTraffic * this.entered * this.ordered);
      this.report(donutsPerHour, 'td');
      total += donutsPerHour;
    }

    this.report(total, 'td');
  };
}

//Assign origin table data to variables for each location.*********************
var downtown = new Voodoo("Downtown", "downtown", [7,18], [80, 220], 0.10, 4),
    capitolHill = new Voodoo("Capitol Hill", "capitolHill", [7,18], [5,45], 0.45, 2),
    southLakeUnion = new Voodoo("South Lake Union", "southLakeUnion", [7,18], [180, 250], 0.05, 6),
    wedgewood = new Voodoo("Wedgewood", "wedgewood", [7,18], [20, 60], 0.20, 1.5),
    ballard = new Voodoo("Ballard", "ballard", [7,18], [25, 175], 0.33, 1);
//*****************************************************************************

var shops = [downtown, capitolHill, southLakeUnion, wedgewood, ballard];

for(var i = 0; i < shops.length; i++) {
  shops[i].calculate();

  $("#location" + i).text(shops[i].location);
  var $editCell = $('#hours' + i);
  $editCell.text("0" + shops[i].hours[0] + "00" + " - " + shops[i].hours[1] + "00");
  $editCell.on('click', editTableData);

  $("#traffic" + i).text(shops[i].traffic[0]);
  var $editCell = $('#traffic' + i);
  $editCell.text(shops[i].traffic[0] + " - " + shops[i].traffic[1]);
  $editCell.on('click', editTableData);

  $("#entered" + i).text((shops[i].entered * 100) + "%");
  var $editCell = $('#entered' + i);
  $editCell.text((shops[i].entered * 100) + "%");
  $editCell.on('click', editTableData);

  $("#ordered" + i).text(shops[i].ordered);
  var $editCell = $('#ordered' + i);
  $editCell.text(shops[i].ordered);
  $editCell.on('click', editTableData);
}

//Function to edit td data on click.******************
function editTableData(event) {
  this.textContent = prompt("Edit this cell:");
}
//****************************************************
