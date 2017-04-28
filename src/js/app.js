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
    console.log(this.records.length);
};

// Instantiate the APP
Start.prototype.init = function () {
    'use strict';
    this.application = appModel; // Backbone Class Trans_Model
    var devElem = $("#dev");
    devElem.append(this.application.dev + ': ' +
        this.application.name + ' Version: ' +
        this.application.version + ' Framework: ' +
        this.application.framework + ' Library: ' +
        this.application.library + ' CSS: ' +
        this.application.cssframework);

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

// Reusable progress bar class.
Start.prototype.progress = function () {
    'use strict';
    this.addOne();
    var elem = $("#myBar"),
        elemContainer = $("#myProgress");
    elemContainer.show();
    var width = 1,
        id = setInterval(frame, 1);

    function frame() {
        if (width >= 100) {
            clearInterval(id);
            elem.html('<br>Completed your request.');
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
    return this.records;

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

Start.prototype.addOne = function () {
    'use strict';

    var DATE_PERIOD_BEGIN = $('#from').val(),
        DATE_PERIOD_END = $('#to').val();
    // Make sure Date Element is not empty.
    if (DATE_PERIOD_BEGIN == "") {
        alert("!Please enter an begin date.");
        return;
    } else if (DATE_PERIOD_END == "") {
        alert("!Please enter an end date.");
        return;
    }
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

        // Hide Pay Period elements once input is received.
        elTo = $('#to'),
        elFrom = $('#from'),
        elPayPerLabels = $('.pay-per-labels');

    elTo.fadeOut();
    elFrom.fadeOut();
    elPayPerLabels.fadeOut();

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
        job: JOB
    };

    //Save the object as new model an add to collections
    this.save(addtrans);
    this.records.getData();
    var elTotalModels = $('#total-models');
    elTotalModels.html("Total Transactions in collection: " + this.records.length);

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

    $('#progress-panel').fadeOut();
    $('#link-canada').fadeOut();
    // Panels
    var elPayPeriodPanel = $('.pay-period-panel'),
        elSelectPanel = $('.select-panel'),
        elLastTransPanel = $('.last-trans-panel'),
        elEarningsPanel = $('.earnings-panel'),
        elWithHoldingsPanel = $('.with-holdings-panel'),
        elNetPayPanel = $('.net-pay-panel'),
        elTransPanel = $('.trans-panel');


    // Print Select Options Show Hide.
    var payPeriodPanelText = $('#p-1 option:selected').text(),
        selectPanelText = $('#p-2 option:selected').text(),
        lastTransPanelText = $('#p-3 option:selected').text(),
        earningsPanelText = $('#p-4 option:selected').text(),
        withHoldingsPanelText = $('#p-5 option:selected').text(),
        netPayPanelText = $('#p-6 option:selected').text(),
        netTransPanelText = $('#p-7 option:selected').text(),
        netColorText = $('#p-8 option:selected').text();

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

    if (netColorText == "Yes") {
        alert('Yes color is not hooked up yet');
    } else {
        alert('No color is not hooked up yet');
    };
};

Start.prototype.hidePrintPanel = function () {
    'use strict';

    $('.print-panel-row').fadeOut();
    $('.dev-panel').fadeOut();
    $('.btn-print-content').fadeIn();

};

Start.prototype.print = function () {
    'use strict';
    $('.btn-print-content').hide();
    window.print();
    location.reload();

};

Start.prototype.contrastLow = function () {
    'use strict';
    $('.container').toggleClass('color-bg');
};

Start.prototype.killPadding = function () {
    'use strict';
    $('.container').removeClass('container-top');
    $('#application-name').fadeOut();
};
var app = new Start();
