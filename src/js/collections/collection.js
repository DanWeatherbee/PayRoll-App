Collection = Backbone.Collection.extend({
    model: Trans_Model,
    localStorage: new Backbone.LocalStorage('payroll'),
    initialize: function () {
        this.fetch();
    },
    getData: function () {
        // Retreive data from collections method.

        var self = this,
            prevRecord = this.models.length - 1;

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
            provTax,
            fedTax,
            totalTax,
            cpp,
            cppSetting,
            ui,
            uiSetting,
            totalUIplusCPP,
            totalAllDeductions,
            netPay,
            // Year estimates
            yearCpp,
            yearUi,
            yearNetPay,
            yearFedTax,
            yearTotDeductions,
            yearTotEarnings,
            yearTotCur,
            yearToVac,
            biWeekly26 = 26;

        // Last Transaction Elements.
        self.elDteLast = $('#dte-l');
        self.elQtyLast = $('#qty-l');
        self.elRateLast = $('#rate-l');
        self.elOtLast = $('#ot-l');
        self.elStatLast = $('#stat-l');
        self.elJobLast = $('#job-l');

        // Transaction List Elements
        self.elJob = $('#job');
        self.elDte = $('#dte');
        self.elQty = $('#qty');
        self.elRate = $('#rate');
        self.elOt = $('#ot');
        self.elStat = $('#stat');

        // Wrap Earnings Template Elements.
        self.elQtyHrStub = $('#qty-hr-stub');
        self.elRateHrStub = $('#rate-hr-stub');
        self.elCurHrStub = $('#cur-hr-stub');
        self.elCurVacStub = $('#cur-vac-stub');
        self.elYtdHrStub = $('#ytd-hr-stub');
        self.elYtdVacStub = $('#ytd-vac-stub');
        self.elCurVacPStub = $('#cur-vacP-stub');
        self.elYtdVacPStub = $('#ytd-vacP-stub');

        // Pay Period Elements.
        self.elPayPerHeader = $('#pay-per-header');
        self.eltotalModels = $('#total-models');


        // Withholdings Template Elements.
        self.elCurNetPayStub = $('#cur-netPay-stub');
        self.elYtdNetPayStub = $('#ytd-netPay-stub');
        self.elCurCppStub = $('#cur-cpp-stub');
        self.elCurUiStub = $('#cur-ui-stub');
        self.elCurFedStub = $('#cur-fed-stub');
        self.elCurTotStub = $('#cur-tot-stub');
        self.elYtdCppStub = $('#ytd-cpp-stub');
        self.elYtdUiStub = $('#ytd-ui-stub');
        self.elYtdFedStub = $('#ytd-fed-stub');
        self.elYtdTotStub = $('#ytd-tot-stub');

        // Clear the Transaction List before repopulating.
        self.elJob.html('');
        self.elDte.html('');
        self.elQty.html('');
        self.elRate.html('');
        self.elOt.html('');
        self.elStat.html('');

        // Populate from local storage(collection).
        _.each(this.models, function (item) {
            // Iterate and add values.
            totalQty = totalQty + item.get('qty');
            totalYtd = (totalYtd + item.get('cur') * 26);
            totalVac = totalVac + item.get('vac');
            totalCur = totalCur + item.get('cur');

            // Repopulate elements.
            self.elJob.append(item.get('job') + '<br>');
            self.elDte.append(item.get('dte') + '<br>');
            self.elQty.append(item.get('qty') + '<br>');
            self.elRate.append(item.get('rate') + '<br>');
            self.elOt.append(item.get('ot') + '<br>');
            self.elStat.append(item.get('stat') + '<br>');
        });
        yearToVac = totalVac * biWeekly26;
        yearTotEarnings = (totalCur + totalVac) * biWeekly26;
        yearTotCur = totalCur * biWeekly26;
        payStart = this.models[this.models[0].collection.length - 1].get('periodB');

        payEnd = this.models[this.models[0].collection.length - 1].get('periodE');


        // Append and update elements from collection.
        self.elPayPerHeader.html(" Date: " + dateNow);
        self.eltotalModels.html("Emp/Com Name: " +
            $('#select-emp').val() +
            " Start: " +
            payStart +
            " End: " +
            payEnd +
            " Total: " +
            this.models.length);

        // Populate Earnings Template Elements from collection.
        self.elQtyHrStub.html(totalQty);
        self.elRateHrStub.html(this.models[prevRecord].get('rate'));
        self.elCurHrStub.html(totalCur);
        self.elCurVacStub.html(totalVac.toFixed(2));
        self.elYtdHrStub.html(yearTotCur.toFixed(2));
        self.elYtdVacStub.html(yearToVac.toFixed(2));
        self.elCurVacPStub.html(totalCur + totalVac);
        self.elYtdVacPStub.html(yearTotEarnings.toFixed(2));

        // Populate Last Transaction Elements.
        self.elDteLast.html(this.models[prevRecord].get('dte'));
        self.elQtyLast.html(this.models[prevRecord].get('qty'));
        self.elRateLast.html(this.models[prevRecord].get('rate'));
        self.elOtLast.html(this.models[prevRecord].get('ot'));
        self.elStatLast.html(this.models[prevRecord].get('stat'));
        self.elJobLast.html(this.models[prevRecord].get('job'));

        // Caulate total earnings.
        pay = totalCur + totalVac;


        /*
               Fed and Pro formula.

        Determine the net taxable income for the pay period (pay minus allowable deductions) and
         multiply it by the number of pay periods in the year to get an estimated
          annual taxable income amount. This annual taxable income amount is factor A.

                ----------Factor A-----------
        */
        var A = pay * 26;
        /*
                This annual taxable income amount is factor A.


        Calculate the basic federal tax on the estimated annual taxable income,
         after allowable federal personal tax credits. The basic federal tax is factor T3.


        http://www.cra-arc.gc.ca/tx/ndvdls/tpcs/ncm-tx/rtrn/cmpltng/ddctns/lns300-350/300-eng.html

                ----------Factor T3-----------
        */
        var taxCredits = 11474.00;
        var T3 = A - taxCredits;

        /*

        Calculate the annual federal tax payable. This is factor T1.

                ----------Factor T1-----------

                15% on the first $45,916 of taxable income.
        */
        var T1 = T3 * 0.150;


        /*
        Calculate the basic provincial or territorial tax on the estimated annual taxable income,
         after allowable provincial or territorial personal tax credits.
          The annual basic provincial or territorial tax is factor T4.


                ----------Factor T4-----------
            5.06% on the first $38,898 of taxable income

        */
        var T4 = T3 * 0.0506;


        /*

        Calculate the annual provincial or territorial tax deduction.
         This is factor T2.

                ----------Factor T2-----------
        */
        var T2 = T3 * 0.018;



        /*
        To get the estimated federal and provincial or territorial tax deductions for a pay period,
         add the federal and provincial or territorial tax, and divide the result by the number of pay periods.
          This is factor T.

                ----------Factor T-----------
        */
        var T = (T1 + T2) / 26;

        // 2017 Canadian(BC) Tax Calculations.
        if (pay > 525) {

            totalTax = T;

            fedTax = T;
            yearFedTax = fedTax * biWeekly26;

            // For every 20 cents the Gov. adds .01 in the tax table after the first 134.61.
            cppSetting = (pay - 134.61) / 0.20 * 0.01;
            // For every 60 cents the Gov. adds .01 in the tax table.
            uiSetting = (pay / 0.60) * 0.01;
            cpp = cppSetting;
            yearCpp = cpp * biWeekly26;
            ui = uiSetting;
            yearUi = ui * biWeekly26;
            totalUIplusCPP = cpp + ui;
            totalAllDeductions = totalTax + totalUIplusCPP;
            netPay = pay - totalAllDeductions;
            yearNetPay = netPay * biWeekly26;
            yearTotDeductions = (totalTax + totalUIplusCPP) * biWeekly26;
            /*
             Append Calculated Data received from Collections
              to Withholdings Template Elements.
             */
            self.elCurNetPayStub.html(netPay.toFixed(2));
            self.elYtdNetPayStub.html(yearNetPay.toFixed(2));
            self.elCurCppStub.html('- ' + cpp.toFixed(2));
            self.elCurUiStub.html('- ' + ui.toFixed(2));
            self.elCurFedStub.html('- ' + fedTax.toFixed(2));
            self.elCurTotStub.html('- ' + (totalTax + totalUIplusCPP).toFixed(2));
            self.elYtdCppStub.html('- ' + yearCpp.toFixed(2));
            self.elYtdUiStub.html('- ' + yearUi.toFixed(2));
            self.elYtdFedStub.html('- ' + yearFedTax.toFixed(2));
            self.elYtdTotStub.html('- ' + yearTotDeductions.toFixed(2));
        }
    }
});
