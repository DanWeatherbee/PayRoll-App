// Load Methods and Launch APP.
var Start = function () {
    'use strict';
    this.startTime = Date.now();
    console.log(this.startTime);
    this.render();
    this.endTime = (Date.now() - this.startTime) / 1000;
    this.dev.prepend("Algorithm performance: " + this.endTime + " Seconds | ");
};

// Instantiate the APP
Start.prototype.init = function () {
    'use strict';
    this.application = appModel; // Backbone Class Trans_Model
    this.container = $('.container');
    this.printContentBtn = $('.btn-print-content');
    this.devElem = $("#dev");
    this.wrapper = this.application.project + ' | ' +
        this.application.dev + ': ' +
        this.application.name + ' | Version: ' +
        this.application.version + ' | Framework: ' +
        this.application.framework + ' | Library: ' +
        this.application.library + '  | CSS: ' +
        this.application.cssframework;

    this.devElem.prepend(this.wrapper);

    // Instantiate views.
    var appV = new AppView(),
        transactionsList = new Collection(),
        transV = new LastTransView(),
        earningsV = new EarningsView(),
        withHoldV = new WithHoldingsView(),
        netPayV = new NetPayView(),
        transV = new TransactionView(),
        payPerV = new PayPeriodView();

    this.printContentBtn.hide();

};

Start.prototype.records = function () {
    'use strict';
    this.records = new Collection();
    return this.records;

};

Start.prototype.calender = function () {
    'use strict';
    var self = this,
        pickerObj = {
            defaultDate: TIME,
            changeMonth: true,
            numberOfMonths: 1
        };
    var dateFormat = "mm/dd/yy",
        selDate = $("#select-date")
        .datepicker(pickerObj)
        .on("change", function () {
            to.datepicker(self.getDate(this));
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

};

Start.prototype.addOne = function () {
    'use strict';

    // Input Values.
    this.DATE_PERIOD_BEGIN = $('#from').val();
    this.DATE_PERIOD_END = $('#to').val();
    this.JOB_FIELD = $('#job-opt').val();
    this.JOB_DATE_FIELD = $('#select-date').val();
    this.EMPLOYEE_FIELD = $('#select-emp').val();
    this.QTY = Number($('#sel-qty option:selected').text());
    this.RATE = Number($('#sel-rate option:selected').text());
    this.CUR = this.QTY * this.RATE;
    this.VAC = this.CUR * .04;
    this.GROSS = this.CUR + this.VAC;
    this.STAT = $('#sel-stat option:selected').text();
    this.OT = $('#sel-ot option:selected').text();
    this.JOB = $('#job-opt').val();
    this.DATE = $('#select-date').val();
    this.FED = $('#sel-fed-rate option:selected').val();
    this.elTo = $('#to');
    this.elFrom = $('#from');
    this.elPayPerLabels = $('.pay-per-labels');




    // Error System - make sure inputs are not empty.
    if (this.EMPLOYEE_FIELD == "") {
        this.selectEmp.css('background-color', 'lightsalmon');
        this.errorMsg.html(this.required + " an employee. " + this.fix);
        this.errorMsg.toggleClass('shake');
        return;

    } else if (this.DATE_PERIOD_BEGIN == "") {
        this.from.css('background-color', 'lightsalmon');
        this.errorMsg.html(this.required + " a start date." + this.fix);
        this.errorMsg.toggleClass('shake');
        return;

    } else if (this.DATE_PERIOD_END == "") {
        this.to.css('background-color', 'lightsalmon');
        this.errorMsg.html(this.required + " an end date. " + this.fix);
        this.errorMsg.toggleClass('shake');
        return;
        console.log(this.JOB_FIELD);
    } else if (this.JOB_FIELD == "") {
        this.jobOpt.css('background-color', 'lightsalmon');
        this.errorMsg.html(this.required + " a Job. " + this.fix);
        this.errorMsg.toggleClass('shake');
        return;

    } else if (this.JOB_DATE_FIELD == "") {
        this.selectDate.css('background-color', 'lightsalmon');
        this.errorMsg.html(this.required + " a Job Date. " + this.fix);
        this.errorMsg.toggleClass('shake');
        return;

    } else {
        // Change borders to green for success.
        this.selectEmp.css('background-color', 'aquamarine');
        this.from.css('background-color', 'aquamarine');
        this.to.css('background-color', 'aquamarine');
        this.jobOpt.css('background-color', 'aquamarine');
        this.selectDate.css('background-color', 'aquamarine');
    }

    $('#trans-section').html();

    var STAT_YES;

    if (this.STAT == "No Stat") {
        STAT_YES = 0;
    } else {
        STAT_YES = 1;
    }

    //Model
    var addtrans = {
        d: D,
        m: M,
        y: Y,
        dte: this.DATE,
        qty: this.QTY,
        ot: this.OT,
        rate: this.RATE,
        cur: this.CUR,
        vac: this.VAC,
        gross: this.GROSS,
        stat: this.STAT,
        periodB: this.DATE_PERIOD_BEGIN,
        periodE: this.DATE_PERIOD_END,
        job: this.JOB,
        fed: this.FED,
        statYes: STAT_YES
    };

    //Save the object as new model an add to collections
    this.save(addtrans);
    this.records.getData();


    this.errorMsg.fadeOut();

};

Start.prototype.delLastRecord = function () {
    'use strict';
    if (this.records.length == 0) {
        alert("All records are deleted.");
        location.reload();

    } else {

        //Because of the zero based index I used this.records.length - 1 to remove last entry.
        this.records.remove(this.records.models[this.records.length - 1].destroy());
        this.records.getData();
        this.totalModels.html("Total Transactions in collection: " + this.records.length);
    };
};

Start.prototype.delFirstRecord = function () {
    'use strict';
    if (this.records.length < 0) {
        return alert("There are no Transactions.");

    } else {

        this.records.remove(this.records.models[0].destroy());
        this.records.getData();
        this.totalModels.html("Total Transactions in collection: " + this.records.length);
    };
};

Start.prototype.savePDF = function () {
    'use strict';

    var printV = new PrintView();
    this.printSelectedBtn.css("color", "black");
    this.printSelectedBtn.fadeIn();
    this.printBtn.fadeOut();
    this.addBtn.fadeOut();
    this.delLastBtn.fadeOut();
    this.delFirstBtn.fadeOut();
};

Start.prototype.printPreView = function () {
    'use strict';
    // Print Select Options Show Hide.
    this.payPeriodPanelText = $('#p-1 option:selected').text();
    this.selectPanelText = $('#p-2 option:selected').text();
    this.lastTransPanelText = $('#p-3 option:selected').text();
    this.earningsPanelText = $('#p-4 option:selected').text();
    this.withHoldingsPanelText = $('#p-5 option:selected').text();
    this.netPayPanelText = $('#p-6 option:selected').text();
    this.netTransPanelText = $('#p-7 option:selected').text();
    this.netColorText = $('#p-8 option:selected').text();

    // Hide Elements not desired for printing.
    this.selectPanelBtn.fadeOut();
    this.linkCanada.fadeOut();
    this.hr.fadeOut();
    this.img.fadeOut();
    this.dev.fadeOut();

    // Neutralize css for printing.
    this.body.css("padding", "0");
    this.inputField.css("background-color", "ghostwhite");
    this.transPanel.css("padding", "0");

    if (this.payPeriodPanelText == "Show") {
        this.payPeriodPanel.fadeIn();
    } else {
        this.payPeriodPanel.fadeOut()
    };

    if (this.selectPanelText == "Show") {
        this.selectPanel.fadeIn();
    } else {
        this.selectPanel.fadeOut();
    };

    if (this.lastTransPanelText == "Show") {
        this.lastTransPanel.fadeIn();
    } else {
        this.lastTransPanel.fadeOut();
    };

    if (this.earningsPanelText == "Show") {
        this.earningsPanel.fadeIn();
    } else {
        this.earningsPanel.fadeOut();
    };

    if (this.withHoldingsPanelText == "Show") {
        this.withHoldingsPanel.fadeIn();
    } else {
        this.withHoldingsPanel.fadeOut();
    };

    if (this.netPayPanelText == "Show") {
        this.netPayPanel.fadeIn();
    } else {
        this.netPayPanel.fadeOut();
    };

    if (this.netTransPanelText == "Show") {
        this.transPanel.fadeIn();
    } else {
        this.transPanel.fadeOut();
    };

    if (this.netColorText == "No") {
        this.noColor();
        this.container.css("width", "100%");
        this.container.css("height", "100%");
        this.printHeader.html("This Panel will be hidden when you print.");
    } else {
        this.body.css("background-color", "lightgrey");
        this.container.css("background-color", "cornsilk");
        this.container.css("color", "black");
    };
};

Start.prototype.noColor = function () {
    'use strict';

    this.container.css("background-color", "ghostwhite");
    this.container.css("color", "black");
    this.nav.css("color", "black");
    this.th.css("color", "black");
    this.body.css("background-image", "none");
    this.h5.css("color", "black");
};

Start.prototype.color = function () {
    'use strict';

    this.container.css("color", "blue");
    this.nav.css("color", "black");
    this.th.css("color", "black");
    this.container.css("background-color", "cornsilk");
    this.h5.css("color", "black");
};



Start.prototype.hidePrintPanel = function () {
    'use strict';

    this.printPanelRow.fadeOut();
    this.printContentBtn.fadeIn();
};

Start.prototype.print = function () {
    'use strict';
    this.printContentBtn.hide();
    this.dev.hide();
    window.print();
    location.reload();
};

Start.prototype.disableTooltips = function () {
    'use strict';
    this.nav.tooltip("disable");
};

Start.prototype.enableTooltips = function () {
    'use strict';
    this.nav.tooltip("enable");
};

Start.prototype.render = function () {
    'use strict';

    this.init();
    this.records();
    this.calender();
    if (this.records.length > 0) {
        this.records.getData();
    };

    // Buttons
    this.printBtn = $('.btn-print');
    this.addBtn = $('.btn-add');
    this.delLastBtn = $('.btn-del-last');
    this.delFirstBtn = $('.btn-del-first');
    this.printSelectedBtn = $('.btn-print-selected');
    this.hidePrintPanelBtn = $('.btn-hide-print-panel');
    this.nav = $('a');
    this.selectPanelBtn = $('.btn-select-panel');

    // Panels
    this.payPeriodPanel = $('.pay-period-panel');
    this.selectPanel = $('.select-panel');
    this.lastTransPanel = $('.last-trans-panel');
    this.earningsPanel = $('.earnings-panel');
    this.withHoldingsPanel = $('.with-holdings-panel');
    this.netPayPanel = $('.net-pay-panel');
    this.transPanel = $('.trans-panel');
    this.printPanelRow = $('.print-panel-row');

    // Dom Elements
    this.hr = $('hr');
    this.th = $('th');
    this.body = $('body');
    this.h5 = $('h5');
    this.printHeader = $('#print-header');
    this.totalModels = $('#total-models');
    this.errorMsg = $('#error');
    this.dev = $('#dev');

    this.selectEmp = $('#select-emp');
    this.from = $('#from');
    this.to = $('#to');
    this.jobOpt = $('#job-opt');
    this.selectDate = $('#select-date');
    this.totalModels.html("Total Transactions in collection: " +
        this.records.length);
    this.nav.tooltip("enable");
    this.linkCanada = $('#link-canada');
    this.img = $('img');
    this.inputField = $('input');
    this.required = "Required! You did not enter";
    this.fix = "Click/Tap here to fix."
};

var app = new Start();
var animate = new WOW().init();
