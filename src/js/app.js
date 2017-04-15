// Global Constants
var TIME = new Date(),
    D = TIME.getDay(),
    M = TIME.getMonth(),
    Y = TIME.getFullYear(),
    ENTER_KEY = 13,
    ESC_KEY = 27,
    totalQty = 0,
    totalYtd = 0,
    totalVac = 0,
    totalCur = 0,
    pay,
    fed,
    totalTax,
    cpp,
    ui,
    totalUIplusCPP,
    totalAllDeductions,
    netPay,
    payStart,
    payEnd;

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
        transV = new LastTransView(),
        earningsV = new EarningsView(),
        withHoldV = new WithHoldingsView(),
        netPayV = new NetPayView(),
        transV = new TransactionView();
};

// Reusable progress bar class.
Start.prototype.progress = function () {
    'use strict';
    //TODO query ui to build this object literal.
    var addtrans = {
        d: D,
        m: M,
        y: Y,
        dte: TIME,
        qty: 0,
        ot: "NULL",
        rate: 0,
        cur: 0,
        vac: 0,
        gross: 0,
        stat: "NULL",
        periodB: "NULL",
        periodE: "NULL",
        job: "NULL"
    };
    //Save the object as new model an add to collections
    this.save(addtrans);
    var elTotalModels = $('#total-models');
    elTotalModels.html("Total Transactions in collection: " + this.records.length);
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

Start.prototype.save = function (addtrans) {
    'use strict';
    this.records.fetch();
    // Add new model
    var entry = new Trans_Model(addtrans);

    // Save Model to collections.
    this.records.add(entry);
    entry.save();
    console.log("Transactions in collection: " + this.records.length);


};

var app = new Start();
