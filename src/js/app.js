// Load Methods and Launch APP.
var Start = function () {
    'use strict';
    var self = this;
    self.init();
    self.records();
    this.calender();
    if (this.records.length > 0) {
        this.records.getData();
    }
};

// Instantiate the APP
Start.prototype.init = function () {
    'use strict';
    this.application = appModel; // Backbone Class Trans_Model
    var devElem = $("#dev");
    var wrapper = this.application.project + ' ' +
        this.application.dev + ': ' +
        this.application.name + ' Version: ' +
        this.application.version + ' Framework: ' +
        this.application.framework + ' Library: ' +
        this.application.library + ' CSS: ' +
        this.application.cssframework;

    devElem.prepend(wrapper);

    // Instantiate views.
    var appV = new AppView(),
        transactionsList = new Collection(),
        transV = new LastTransView(),
        earningsV = new EarningsView(),
        withHoldV = new WithHoldingsView(),
        netPayV = new NetPayView(),
        transV = new TransactionView(),
        payPerV = new PayPeriodView();

    $('.btn-print-content').hide();


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

    var DATE_PERIOD_BEGIN = $('#from').val(),
        DATE_PERIOD_END = $('#to').val(),
        JOB_FIELD = $('#job-opt').val(),
        JOB_DATE_FIELD = $('#select-date').val(),
        EMPLOYEE_FIELD = $('#select-emp').val();

    // Make sure inputs are not empty.
    if (EMPLOYEE_FIELD == "") {
        $('#select-emp').css('background-color', 'magenta');
        $('#error').html("Required! You did not enter an employee. Click/Tap here to fix");
        $('#error').toggleClass('shake');
        return;

    } else if (DATE_PERIOD_BEGIN == "") {
        $('#from').css('background-color', 'magenta');
        $('#error').html("Required! You did not enter a start date. Click/Tap here to fix");
        $('#error').toggleClass('shake');
        return;

    } else if (DATE_PERIOD_END == "") {
        $('#to').css('background-color', 'magenta');
        $('#error').html("Required! You did not enter an end date. Click/Tap here to fix");
        $('#error').toggleClass('shake');
        return;

    } else if (JOB_FIELD == "") {
        $('#job-opt').css('background-color', 'magenta');
        $('#error').html("Required! You did not enter a Job. Click/Tap here to fix");
        $('#error').toggleClass('shake');
        return;

    } else if (JOB_DATE_FIELD == "") {
        $('#select-date').css('background-color', 'magenta');
        $('#error').html("Required! You did not enter a Job Date. Click/Tap here to fix");
        $('#error').toggleClass('shake');
        return;

    } else {
        // Change borders to green for succes.
        $('#select-emp').css('background-color', 'aquamarine');
        $('#from').css('background-color', 'aquamarine');
        $('#to').css('background-color', 'aquamarine');
        $('#job-opt').css('background-color', 'aquamarine');
        $('#select-date').css('background-color', 'aquamarine');
    }





    $('#trans-section').html();
    // Retrieve and assign values to Variables from Selection Panel.
    var QTY = Number($('#sel-qty option:selected').text()),
        RATE = Number($('#sel-rate option:selected').text()),
        CUR = QTY * RATE,
        VAC = CUR * .04,
        GROSS = CUR + VAC,
        STAT = $('#sel-stat option:selected').text(),
        OT = $('#sel-ot option:selected').text(),
        JOB = $('#job-opt').val(),
        DATE = $('#select-date').val(),
        FED = $('#sel-fed-rate option:selected').val(),
        STAT_YES,

        // Hide Pay Period elements once input is received.
        elTo = $('#to'),
        elFrom = $('#from'),
        elPayPerLabels = $('.pay-per-labels');

    if (STAT == "No Stat") {
        STAT_YES = 0;
    } else {
        STAT_YES = 1;
    }

    var addtrans = {
        d: D,
        m: M,
        y: Y,
        dte: DATE,
        qty: QTY,
        ot: OT,
        rate: RATE,
        cur: CUR,
        vac: VAC,
        gross: GROSS,
        stat: STAT,
        periodB: DATE_PERIOD_BEGIN,
        periodE: DATE_PERIOD_END,
        job: JOB,
        fed: FED,
        statYes: STAT_YES
    };

    //Save the object as new model an add to collections
    this.save(addtrans);
    this.records.getData();
    var elTotalModels = $('#total-models');
    elTotalModels.html("Total Transactions in collection: " + this.records.length);
    $('#error').fadeOut();

};

Start.prototype.delLastRecord = function () {
    'use strict';
    if (this.records.length == 0) {
        alert("All records are deleted.");
        location.reload();

    } else {

        //Because of the zero based index I used this.records.length - 1 to remove last entry.
        this.records.remove(this.records.models[this.records.length - 1].destroy());

        console.log("Delete last Trans was used.")
        console.log(this.records.length);
        this.records.getData();
        var elTotalModels = $('#total-models');
        elTotalModels.html("Total Transactions in collection: " + this.records.length);

    };
};

Start.prototype.delFirstRecord = function () {
    'use strict';
    if (this.records.length < 0) {
        return alert("There are no Transactions.");

    } else {

        this.records.remove(this.records.models[0].destroy());

        console.log("Delete Prev Trans was used.")
        console.log(this.records.length);
        this.records.getData();
        var elTotalModels = $('#total-models');
        elTotalModels.html("Total Transactions in collection: " + this.records.length);
    };
};

Start.prototype.savePDF = function () {
    'use strict';

    var printV = new PrintView(),

        // Buttons
        elBtnPrint = $('.btn-print'),
        elBtnAdd = $('.btn-add'),
        elBtnDelLast = $('.btn-del-last'),
        elBtnDelFirst = $('.btn-del-first'),
        elBtnPrintSelected = $('.btn-print-selected');


    elBtnPrintSelected.fadeIn();
    elBtnPrint.fadeOut();
    elBtnAdd.fadeOut();
    elBtnDelLast.fadeOut();
    elBtnDelFirst.fadeOut();
};

Start.prototype.printPreView = function () {
    'use strict';
    // Panels
    var elPayPeriodPanel = $('.pay-period-panel'),
        elSelectPanel = $('.select-panel'),
        elLastTransPanel = $('.last-trans-panel'),
        elEarningsPanel = $('.earnings-panel'),
        elWithHoldingsPanel = $('.with-holdings-panel'),
        elNetPayPanel = $('.net-pay-panel'),
        elTransPanel = $('.trans-panel'),
        elContainer = $('.container');


    // Print Select Options Show Hide.
    var payPeriodPanelText = $('#p-1 option:selected').text(),
        selectPanelText = $('#p-2 option:selected').text(),
        lastTransPanelText = $('#p-3 option:selected').text(),
        earningsPanelText = $('#p-4 option:selected').text(),
        withHoldingsPanelText = $('#p-5 option:selected').text(),
        netPayPanelText = $('#p-6 option:selected').text(),
        netTransPanelText = $('#p-7 option:selected').text(),
        netColorText = $('#p-8 option:selected').text();

    // Hide Elements not desired for printing.
    $('.btn-select-panel').fadeOut();
    $('#link-canada').fadeOut();
    $('hr').fadeOut();
    $('img').fadeOut();
    $('#dev').fadeOut();
    $('body').css("padding", "0");
    $('input').css("background-color", "white");
    elTransPanel.css("padding", "0");

    if (payPeriodPanelText == "Show") {
        elPayPeriodPanel.fadeIn();
    } else {
        elPayPeriodPanel.fadeOut()
    };

    if (selectPanelText == "Show") {
        elSelectPanel.fadeIn();
    } else {
        elSelectPanel.fadeOut();
    };

    if (lastTransPanelText == "Show") {
        elLastTransPanel.fadeIn();
    } else {
        elLastTransPanel.fadeOut();
    };

    if (earningsPanelText == "Show") {
        elEarningsPanel.fadeIn();
    } else {
        elEarningsPanel.fadeOut();
    };

    if (withHoldingsPanelText == "Show") {
        elWithHoldingsPanel.fadeIn();
    } else {
        elWithHoldingsPanel.fadeOut();
    };

    if (netPayPanelText == "Show") {
        elNetPayPanel.fadeIn();
    } else {
        elNetPayPanel.fadeOut();
    };

    if (netTransPanelText == "Show") {
        elTransPanel.fadeIn();
    } else {
        elTransPanel.fadeOut();
    };

    if (netColorText == "No") {
        elContainer.css("background-color", "white");
        elContainer.css("color", "black");
        elContainer.css("width", "100%");
        elContainer.css("height", "100%");
        $('a').css("color", "black");
        $('th').css("color", "black");
        $('body').css("background-image", "none");
        $('h3').css("color", "black");
        $('#print-header').html("This Panel will be hidden when you print.");
    } else {
        $('body').css("background-color", "lightgrey");
        elContainer.css("background-color", "cornsilk");
        elContainer.css("color", "black");
        $('a').css("color", "indianred");
    };
};

Start.prototype.hidePrintPanel = function () {
    'use strict';

    $('.print-panel-row').fadeOut();
    $('.btn-print-content').fadeIn();


};

Start.prototype.print = function () {
    'use strict';
    $('.btn-print-content').hide();
    $('#dev').hide();
    window.print();

    location.reload();

};

var app = new Start();
$('a').tooltip();
