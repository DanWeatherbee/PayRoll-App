Collection = Backbone.Collection.extend({
    model: Trans_Model,
    localStorage: new Backbone.LocalStorage('payroll'),
    initialize: function () {

        console.log("Collection has been initialized.");
        this.fetch();
        console.log(this.models);
    },
    getData: function () {
        // Last Transaction variables.

        var totalQty = 0,
            totalYtd = 0,
            totalVac = 0,
            totalCur = 0,
            // Pay Period Variables.
            payStart,
            payEnd,
            dateNow = Date(),
            // Tax Variables.
            pay,
            fed,
            totalTax,
            cpp,
            ui,
            totalUIplusCPP,
            totalAllDeductions,
            netPay;

        // Last Transaction Elements.
        var elDteLast = $('#dte-l'),
            elQtyLast = $('#qty-l'),
            elRateLast = $('#rate-l'),
            elOtLast = $('#ot-l'),
            elStatLast = $('#stat-l'),
            elJobLast = $('#job-l');


        // Transaction List Elements
        var elJob = $('#job'),
            elDte = $('#dte'),
            elQty = $('#qty'),
            elRate = $('#rate'),
            elOt = $('#ot'),
            elStat = $('#stat');


        prevRecord = this.models.length - 1;

        // Wrap Earnings Template Elements.
        var elQtyHrStub = $('#qty-hr-stub'),
            elRateHrStub = $('#rate-hr-stub'),
            elCurHrStub = $('#cur-hr-stub'),
            elCurVacStub = $('#cur-vac-stub'),
            elYtdHrStub = $('#ytd-hr-stub'),
            elYtdVacStub = $('#ytd-vac-stub'),
            elCurVacPStub = $('#cur-vacP-stub'),
            elYtdVacPStub = $('#ytd-vacP-stub');

        // Pay Period Elements.
        var elPayPerHeader = $('#pay-per-header'),
            elEmployeeH = $('#employee-h'),
            eltotalModels = $('#total-models');


        // Withholdings Template Elements.
        var elCurNetPayStub = $('#cur-netPay-stub'),
            elYtdNetPayStub = $('#ytd-netPay-stub'),
            elCurCppStub = $('#cur-cpp-stub'),
            elCurUiStub = $('#cur-ui-stub'),
            elCurFedStub = $('#cur-fed-stub'),
            elCurTotStub = $('#cur-tot-stub'),
            elYtdCppStub = $('#ytd-cpp-stub'),
            elYtdUiStub = $('#ytd-ui-stub'),
            elYtdFedStub = $('#ytd-fed-stub'),
            elYtdTotStub = $('#ytd-tot-stub');

        // Clear the Transaction List before repopulating.
        elJob.html('');
        elDte.html('');
        elQty.html('');
        elRate.html('');
        elOt.html('');
        elStat.html('');

        // Populate from local storage(collection).
        _.each(this.models, function (item) {
            // Iterate and add values.
            totalQty = totalQty + item.get('qty');
            totalYtd = totalYtd + item.get('cur');
            totalVac = totalVac + item.get('vac');
            totalCur = totalCur + item.get('cur');

            // Repopulate elements.
            elJob.append(item.get('job') + '<br>');
            elDte.append(item.get('dte') + '<br>');
            elQty.append(item.get('qty') + '<br>');
            elRate.append(item.get('rate') + '<br>');
            elOt.append(item.get('ot') + '<br>');
            elStat.append(item.get('stat') + '<br>');
        });
        console.log(this.models[0].collection.length);
        payStart = this.models[this.models[0].collection.length - 1].get('periodB');

        payEnd = this.models[this.models[0].collection.length - 1].get('periodE');



        // Append and update elements from collection.
        elPayPerHeader.html(" Date: " + dateNow);
        elEmployeeH.html(" Period start: " + payStart + " Period end: " + payEnd);
        eltotalModels.append("Total Transactions: " + this.models.length);


        // Populate Earnings Template Elements from collection.
        elQtyHrStub.html(totalQty);
        elRateHrStub.html(this.models[prevRecord].get('rate'));
        elCurHrStub.html(totalCur);
        elCurVacStub.html(totalVac.toFixed(2));
        elYtdHrStub.html(totalYtd);
        elYtdVacStub.html(totalVac.toFixed(2));
        elCurVacPStub.html(totalCur + totalVac);
        elYtdVacPStub.html(totalCur + totalVac);

        // Populate Last Transaction Elements.
        elDteLast.html(this.models[prevRecord].get('dte'));
        elQtyLast.html(this.models[prevRecord].get('qty'));
        elRateLast.html(this.models[prevRecord].get('rate'));
        elOtLast.html(this.models[prevRecord].get('ot'));
        elStatLast.html(this.models[prevRecord].get('stat'));
        elJobLast.html(this.models[prevRecord].get('job'));

        pay = totalCur + totalVac;

        // 2017 Tax Calculations.
        if (pay > 0) {

            fed = pay * 0.014;
            totalTax = fed
            cpp = pay * 0.0495;
            ui = pay * 0.0163;
            totalUIplusCPP = cpp + ui;
            totalAllDeductions = totalTax + totalUIplusCPP;
            netPay = pay - totalAllDeductions;


            /*
             Append Calculated Data received from Collections
              to Withholdings Template Elements.
             */
            elCurNetPayStub.html(netPay.toFixed(2));
            elYtdNetPayStub.html(netPay.toFixed(2));
            elCurCppStub.html('- ' + cpp.toFixed(2));
            elCurUiStub.html('- ' + ui.toFixed(2));
            elCurFedStub.html('- ' + fed.toFixed(2));
            elCurTotStub.html('- ' + (totalTax + totalUIplusCPP).toFixed(2));
            elYtdCppStub.html('- ' + cpp.toFixed(2));
            elYtdUiStub.html('- ' + ui.toFixed(2));
            elYtdFedStub.html('- ' + fed.toFixed(2));
            elYtdTotStub.html('- ' + (totalTax + totalUIplusCPP).toFixed(2));
        }

    }

});
