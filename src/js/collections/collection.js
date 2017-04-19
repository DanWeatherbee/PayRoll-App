Collection = Backbone.Collection.extend({
    model: Trans_Model,
    localStorage: new Backbone.LocalStorage('payroll'),
    initialize: function () {

        console.log("Collection has been initialized.");
        this.fetch();
        console.log(this.models);
    },
    getData: function () {
        //Last Transaction variables.

        var totalQty = 0,
            totalYtd = 0,
            totalVac = 0,
            totalCur = 0,
            //Pay Period Variables.
            payStart,
            payEnd,
            dateNow = Date(),
            pay,
            fed,
            totalTax,
            cpp,
            ui,
            totalUIplusCPP,
            totalAllDeductions,
            netPay;

        //Last Transaction Elements.
        var elDteLast = $('#dte-l'),
            elQtyLast = $('#qty-l'),
            elRateLast = $('#rate-l'),
            elOtLast = $('#ot-l'),
            elCurLast = $('#cur-l'),

            elVacLast = $('#vac-l'),
            elGrossLast = $('#gross-l'),
            elStatLast = $('#stat-l'),
            elJobLast = $('#job-l');


        //Transaction List Elements
        var elJob = $('#job'),
            elDte = $('#dte'),
            elQty = $('#qty'),
            elRate = $('#rate'),
            elOt = $('#ot'),
            elCur = $('#cur'),
            elVac = $('#vac'),
            elGross = $('#gross'),
            elStat = $('#stat'),
            vac_2DIGITS;

        //Last Transaction Elements.
        var elDteLast = $('#dte-l'),
            elQtyLast = $('#qty-l'),
            elRateLast = $('#rate-l'),
            elOtLast = $('#ot-l'),
            elCurLast = $('#cur-l'),

            elVacLast = $('#vac-l'),
            elGrossLast = $('#gross-l'),
            elStatLast = $('#stat-l'),
            elJobLast = $('#job-l'),

            prevRecord = this.models.length - 1;

        //Wrap Earnings Template Elements.
        var elQtyHrStub = $('#qty-hr-stub'),
            elRateHrStub = $('#rate-hr-stub'),
            elCurHrStub = $('#cur-hr-stub'),
            elCurVacStub = $('#cur-vac-stub'),
            elYtdHrStub = $('#ytd-hr-stub'),
            elYtdVacStub = $('#ytd-vac-stub'),
            elCurVacPStub = $('#cur-vacP-stub'),
            elYtdVacPStub = $('#ytd-vacP-stub');

        //Pay Period Elements.
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
        elCur.html('');
        elVac.html('');
        elGross.html('');
        elStat.html('');

        //Populate from local storage(collection).
        _.each(this.models, function (item) {
            //Iterate and add values.
            totalQty = totalQty + item.get('qty');
            totalYtd = totalYtd + item.get('cur');
            totalVac = totalVac + item.get('vac');
            totalCur = totalCur + item.get('cur');

            // Repopulate elements.
            elJob.append(item.get('job') + '<br><hr>');
            elDte.append(item.get('dte') + '<br><hr>');
            elQty.append(item.get('qty') + '<br><hr>');
            elRate.append(item.get('rate') + '<br><hr>');
            elOt.append(item.get('ot') + '<br><hr>');
            elCur.append(item.get('cur') + '<br><hr>');
            vac_2DIGITS = item.get('vac');

            elVac.append(vac_2DIGITS.toFixed(2) + '<br><hr>');
            elGross.append(item.get('gross') + '<br><hr>');
            elStat.append(item.get('stat') + '<br><hr>');
        });

        payStart = this.models[0].get('periodB');

        payEnd = this.models[0].get('periodE');



        //Append and update elements from collection.
        elPayPerHeader.html(" Today is " + dateNow + " Choose a pay period below.");
        elEmployeeH.html(" Period start: " + payStart + " Period end: " + payEnd);
        eltotalModels.append("Total Transactions in this: " + prevRecord + 1);


        //Populate Earnings Template Elements from collection.
        elQtyHrStub.html(totalQty);
        elRateHrStub.html(this.models[prevRecord].get('rate'));
        elCurHrStub.html(totalCur);
        elCurVacStub.html(totalVac.toFixed(2));
        elYtdHrStub.html(totalYtd);
        elYtdVacStub.html(totalVac.toFixed(2));
        elCurVacPStub.html(totalCur + totalVac);
        elYtdVacPStub.html(totalCur + totalVac);

        //Populate Last Transaction Elements.
        elDteLast.html(this.models[prevRecord].get('dte'));
        elQtyLast.html(this.models[prevRecord].get('qty'));
        elRateLast.html(this.models[prevRecord].get('rate'));
        elOtLast.html(this.models[prevRecord].get('ot'));
        elCurLast.html(this.models[prevRecord].get('cur'));
        var VAC_2DIGITS = this.models[prevRecord].get('vac');
        elVacLast.html(VAC_2DIGITS.toFixed(2));
        elGrossLast.html(this.models[prevRecord].get('gross'));
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
