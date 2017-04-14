// Global Constants


// Class's

// Load Methods and Launch APP.
var Start = function () {
    'use strict';
    var self = this;
    self.init();
    self.records();
    this.calender();
};

// Instantiate the APP
Start.prototype.init = function () {
    'use strict';
    this.transaction = transModel; // Backbone Class Trans_Model
    this.application = appModel; // Backbone Class Trans_Model
    var devElem = $("#dev");
    devElem.append(this.application.project + ' -- ' +
        this.application.dev + ': ' +
        this.application.name + ' Version: ' +
        this.application.version + ' Framework: ' +
        this.application.framework + ' Library: ' +
        this.application.library + ' CSS: ' +
        this.application.cssframework);
    var appV = new AppView(),
        transView = new LastTransView();
};

// Reusable progress bar class.
Start.prototype.progress = function () {
    'use strict';
    var elem = $("#myBar"),
        elemContainer = $("#myProgress");
    elemContainer.show();
    var width = 1,
        id = setInterval(frame, 1);
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

Start.prototype.records = function () {
    'use strict';
    this.records = new Collection();
    console.log("Transactions in collection: " + this.records.length);
};

Start.prototype.calender = function () {
    'use strict';
    var self = this,
        pickerObj = {
            defaultDate: TIME,
            changeMonth: true,
            numberOfMonths: 2
        };
    var dateFormat = "mm/dd/yy",
        selDate = $("#select-date")
        .datepicker(pickerObj)
        .on("change", function () {
            to.datepicker("option", "minDate", self.getDate(this));
        }),
        from = $("#from")
        .datepicker(pickerObj)
        .on("change", function () {
            to.datepicker("option", "minDate", self.getDate(this));
        }),
        to = $("#to").datepicker(pickerObj)
        .on("change", function () {
            from.datepicker("option", "maxDate", self.getDate(this));
        });
};

Start.prototype.getDate = function (element) {
    'use strict';
    try {
        DATE = $.datepicker.parseDate(dateFormat, element.value);
    } catch (error) {

        var DATE = null;
    }
    return DATE;
};

Start.prototype.save = function () {
    'use strict';
    this.records.fetch();
    // Create model to save to collections.
    console.log("Transactions in collection: " + this.records.length);
};

var app = new Start();
