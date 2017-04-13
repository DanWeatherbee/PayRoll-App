// Global Constants
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



// Class's

// Load Methods and Launch APP.
var Start = function() {

    var self = this;
    self.init();
    self.records();
};

// Instantiate the APP
Start.prototype.init = function() {
    this.transaction = transModel // Backbone Class Trans_Model
    this.application = appModel // Backbone Class Trans_Model
    var devElem = $("#dev");
    devElem.append(this.application.project + '<br>');
    devElem.append(this.application.dev + ": " + '<br>');
    devElem.append(this.application.name + '<br>');
    devElem.append("Version: " + '<br>');
    devElem.append(this.application.version + '<br>');
    console.log("Project: " + this.application.project);
    console.log(this.application.dev);
    console.log(this.application.name);
    console.log("Version: " + this.application.version);
    new AppView();
};

// Reusable progress bar class.
Start.prototype.progress = function() {
    var elem = $("#myBar");
    var elemContainer = $("#myProgress");
    elemContainer.show();
    var width = 1;
    var id = setInterval(frame, 1);

    function frame() {
        if (width >= 100) {

            clearInterval(id);
            elem.html('<br>Transaction Saved to Collection.');
        } else {
            width++;
            elem.css({ width: width + '%' });
            elem.html("");
        }
    }

};

Start.prototype.records = function() {
    this.records = new Collection();
    console.log("Transactions in collection: " + this.records.length);
};
var app = new Start();

// app.start = function () {



// 		$( function() {
// 		  $('#pay-per-header').append(" " + '<span style="color: red;">Please enter a pay period.</span>')
// 		  var dateFormat = "mm/dd/yy",
// 		    from = $( "#from" )
// 		      .datepicker({
// 		        defaultDate: TIME,
// 		        changeMonth: true,
// 		        numberOfMonths: 2
// 		      })
// 		      .on( "change", function() {
// 		        to.datepicker( "option", "minDate", getDate( this ) );
// 		      }),
// 		    to = $( "#to" ).datepicker({
// 		      defaultDate: TIME,
// 		      changeMonth: true,
// 		      numberOfMonths: 2
// 		    })
// 		    .on( "change", function() {
// 		      from.datepicker( "option", "maxDate", getDate( this ) );

// 		    });

// 		  function getDate( element ) {

// 		    try {
// 		      DATE = $.datepicker.parseDate( dateFormat, element.value );
// 		    } catch( error ) {

// 		      DATE = null;
// 		    }
// 		    return DATE;
// 		  };
// 		} );

// 		        // Todo create a print hide show function and Panel.

// 		$('.btn-print').click(function() {

// 		    $('.option-panel').hide();
// 		    $('.btn-print').hide();
// 		    $('.btn-add').hide();
// 		    $('.btn-del').hide();
// 		    $('.sel-panel').hide();
// 		    $('.last-trans-panel').hide();

// 		    var sign = prompt("What's your username?");

// 		    if (sign.toLowerCase() == "tina") {
// 		      alert("He Beh beh's wuz up!");

// 		      window.print();
// 		    }
// 		    else if (sign.toLowerCase() == "dan") {
// 		      alert("Hi Master I love you!");

// 		      window.print();

// 		    }
// 		    else {
// 		     alert("Sorry I don't know you.");
// 		     return;
// 		    }


// 		});
// 		$('.btn-del').click(function() {

// 		    app.clear();

// 		    location.reload();

// 		});




// 	var appStart = new AppView();

// };
