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
            proTax,
            fedTax,
            totalTax,
            cpp,

            ui,
            uiPercent,
            totalUIplusCPP,
            totalAllDeductions,
            netPay,
            // Year estimates
            yearCpp,
            yearUi,
            yearNetPay,
            yearFedTax,
            yearProTax,
            yearTotDeductions,
            yearTotEarnings,
            yearTotCur,
            yearToVac,

            // Government Tax variables.
            cppPercent,
            biWeekly26,
            fedPercent,
            proPercent,
            proPercentAfterCredits,
            taxCredits,
            proTaxCredit,

            // Tax Formula variables
            A,
            T3;


        /*
         TODO create a option panel for this.
        --------------------------------------------------------
        2017 BC Canada effective Jan 1
        */
        biWeekly26 = 26;
        fedPercent = 0.150;
        taxCredits = 13738.00;
        proPercent = 0.018;
        cppPercent = 0.0495;
        uiPercent = 0.0163;
        //--------------------------------------------------------


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
        self.elCurProStub = $('#cur-pro-stub');
        self.elCurTotStub = $('#cur-tot-stub');
        self.elYtdCppStub = $('#ytd-cpp-stub');
        self.elYtdUiStub = $('#ytd-ui-stub');
        self.elYtdFedStub = $('#ytd-fed-stub');
        self.elYtdProStub = $('#ytd-pro-stub');
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
            totalYtd = (totalYtd + item.get('cur') * biWeekly26);
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
        A = pay * biWeekly26;
        /*
                This annual taxable income amount is factor A.


        Calculate the basic federal tax on the estimated annual taxable income,
         after allowable federal personal tax credits. The basic federal tax is factor T3.


        http://www.cra-arc.gc.ca/tx/ndvdls/tpcs/ncm-tx/rtrn/cmpltng/ddctns/lns300-350/300-eng.html

                ----------Factor T3-----------
        */


        T3 = A - taxCredits;

        /*

        Calculate the annual federal tax payable. This is factor T1.

                ----------Factor T1-----------

                15% on the first $45,916 of taxable income.
        */

        yearFedTax = T3 * fedPercent;
        fedTax = yearFedTax / biWeekly26;

        if (fedTax < 1) {
            fedTax = 0;
            yearFedTax = 0;
        }

        /*

        Calculate the annual provincial or territorial tax deduction.
         This is factor T2.

                ----------Factor T2-----------
        */
        yearProTax = T3 * proPercent;
        proTax = yearProTax / biWeekly26;

        if (proTax < 1) {
            proTax = 0;
            yearProTax = 0;
        }

        totalTax = fedTax + proTax;
        /*

        Formula to determine CPP contributions for employees receiving salary or wages
        C = The lesser of:
        (i) $2,564.10* – D; and
        (ii) 0.0495** × [PI − ($3,500 ÷ P)].
        If the result is negative, C = $0.

        D = Employee's year-to-date Canada Pension Plan contribution with the employer
         (cannot be more than the annual maximum.)

        P = The number of pay periods in the year

        PI = Pensionable income for the pay period,
         or the gross income plus any taxable benefits for the pay period,
         including bonuses and retroactive pay increases where applicable

        */


        cpp = cppPercent * (pay - (3500 / biWeekly26));

        yearCpp = cpp * biWeekly26;

        if (cpp < 1) {
            cpp = 0;
            yearCpp = 0;
        }

        yearUi = uiPercent * (pay * biWeekly26);


        ui = yearUi / biWeekly26;

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
        self.elCurProStub.html('- ' + proTax.toFixed(2));
        self.elCurTotStub.html('- ' + (totalTax + totalUIplusCPP).toFixed(2));
        self.elYtdCppStub.html('- ' + yearCpp.toFixed(2));
        self.elYtdUiStub.html('- ' + yearUi.toFixed(2));
        self.elYtdFedStub.html('- ' + yearFedTax.toFixed(2));
        self.elYtdProStub.html('- ' + yearProTax.toFixed(2));
        self.elYtdTotStub.html('- ' + yearTotDeductions.toFixed(2));

    }
});
