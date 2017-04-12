// Global Constants
var TIME = new Date();
var D = TIME.getDay();
var M = TIME.getMonth();
var Y = TIME.getFullYear();

/*global $ */
/*jshint unused:false */
var app = app || {};
var ENTER_KEY = 13;
var ESC_KEY = 27;
var totalQty = 0;
var totalYtd = 0;
var totalVac = 0;
var totalCur = 0;
var pay;
var fed;
var totalTax;
var cpp;
var ui;
var totalUIplusCPP;
var totalAllDeductions;
var netPay;
var payStart;
var payEnd;


app = {
	name: "Dan Weatherbee",
	dev: "Developer",
	version: 1.0
	};

app.start = function () {



		$( function() {
		  $('#pay-per-header').append(" " + '<span style="color: red;">Please enter a pay period.</span>')
		  var dateFormat = "mm/dd/yy",
		    from = $( "#from" )
		      .datepicker({
		        defaultDate: TIME,
		        changeMonth: true,
		        numberOfMonths: 2
		      })
		      .on( "change", function() {
		        to.datepicker( "option", "minDate", getDate( this ) );
		      }),
		    to = $( "#to" ).datepicker({
		      defaultDate: TIME,
		      changeMonth: true,
		      numberOfMonths: 2
		    })
		    .on( "change", function() {
		      from.datepicker( "option", "maxDate", getDate( this ) );

		    });

		  function getDate( element ) {

		    try {
		      DATE = $.datepicker.parseDate( dateFormat, element.value );
		    } catch( error ) {

		      DATE = null;
		    }
		    return DATE;
		  };
		} );

		function move() {
			console.log("move has initiated.");
		  var elem = document.getElementById("myBar");
		  var width = 1;
		  var id = setInterval(frame, 10);
		  function frame() {
		    if (width >= 100) {
		      clearInterval(id);
		    } else {
		      width++;
		      elem.style.width = width + '%';
		    }
		  }
		};
		        // Todo create a print hide show function and Panel.

		$('.btn-print').click(function() {

		    $('.option-panel').hide();
		    $('.btn-print').hide();
		    $('.btn-add').hide();
		    $('.btn-del').hide();
		    $('.sel-panel').hide();
		    $('.last-trans-panel').hide();

		    var sign = prompt("What's your username?");

		    if (sign.toLowerCase() == "tina") {
		      alert("He Beh beh's wuz up!");

		      window.print();
		    }
		    else if (sign.toLowerCase() == "dan") {
		      alert("Hi Master I love you!");

		      window.print();

		    }
		    else {
		     alert("Sorry I don't know you.");
		     return;
		    }


		});
		$('.btn-del').click(function() {

		    app.clear();

		    location.reload();

		});




	var appStart = new AppView();

};



