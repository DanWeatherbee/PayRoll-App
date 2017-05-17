Collection = Backbone.Collection.extend({
    model: Trans_Model,
    localStorage: new Backbone.LocalStorage('payroll'),
    initialize: function () {
        this.fetch();
    },
    getData: function () {
        // Retreive data from collections method.

        /*
         TODO append selectors in slect panel from collections,
         so user can come back and they dont have to enter everything again.
         */
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
            fedTax,
            fedTaxPercent,
            totalTax,
            cpp,
            cppSetting,
            ui,
            uiSetting,
            totalUIplusCPP,
            totalAllDeductions,
            netPay;

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
            totalYtd = totalYtd + item.get('cur');
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

        payStart = this.models[this.models[0].collection.length - 1].get('periodB');

        payEnd = this.models[this.models[0].collection.length - 1].get('periodE');

        fedTaxPercent = this.models[prevRecord].get('fed');

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
        self.elYtdHrStub.html(totalYtd);
        self.elYtdVacStub.html(totalVac.toFixed(2));
        self.elCurVacPStub.html(totalCur + totalVac);
        self.elYtdVacPStub.html(totalCur + totalVac);

        // Populate Last Transaction Elements.
        self.elDteLast.html(this.models[prevRecord].get('dte'));
        self.elQtyLast.html(this.models[prevRecord].get('qty'));
        self.elRateLast.html(this.models[prevRecord].get('rate'));
        self.elOtLast.html(this.models[prevRecord].get('ot'));
        self.elStatLast.html(this.models[prevRecord].get('stat'));
        self.elJobLast.html(this.models[prevRecord].get('job'));

        // Caulate total earnings.
        pay = totalCur + totalVac;

        // 2017 Canadian(BC) Tax Calculations.
        if (pay > 525) {

            var A, B, C, R;



            if (pay < 737) {
                // Fed Tax Table Formula.
                A = pay - 521;
                A = A.toFixed(0);

                B = A / 4.2;
                B = B.toFixed(0);

                C = B * .55;
                C = C.toFixed(2);


                R = (Number(C) + 67.50);
            }


            if (pay > 737) {
                // Fed Tax Table Formula.
                A = pay - 521;
                A = A.toFixed(0);

                B = A / 4.1;
                B = B.toFixed(0);

                C = B * .55;
                C = C.toFixed(2);


                R = (Number(C) + 67.50);
            }

            if (pay > 2040) {
                // Fed Tax Table Formula.
                A = pay - 521;
                A = A.toFixed(0);

                B = A / 3.9;
                B = B.toFixed(0);

                C = B * .55;
                C = C.toFixed(2);


                R = (Number(C) + 67.50);
            }


            if (pay > 3353) {
                // Fed Tax Table Formula.
                A = pay - 521;
                A = A.toFixed(0);

                B = A / 3.2;
                B = B.toFixed(0);

                C = B * .55;
                C = C.toFixed(2);


                R = (Number(C) + 67.50);
            }


            fedTax = R;


            totalTax = fedTax;

            // For every 20 cents the Gov. adds .01 in the tax table after the first 134.61.
            cppSetting = (pay - 134.61) / 0.20 * 0.01;
            // For every 60 cents the Gov. adds .01 in the tax table.
            uiSetting = (pay / 0.60) * 0.01;
            cpp = cppSetting;
            ui = uiSetting;
            totalUIplusCPP = cpp + ui;
            totalAllDeductions = totalTax + totalUIplusCPP;
            netPay = pay - totalAllDeductions;

            /*
             Append Calculated Data received from Collections
              to Withholdings Template Elements.
             */
            self.elCurNetPayStub.html(netPay.toFixed(2));
            self.elYtdNetPayStub.html(netPay.toFixed(2));
            self.elCurCppStub.html('- ' + cpp.toFixed(2));
            self.elCurUiStub.html('- ' + ui.toFixed(2));
            self.elCurFedStub.html('- ' + fedTax.toFixed(2));
            self.elCurTotStub.html('- ' + (totalTax + totalUIplusCPP).toFixed(2));
            self.elYtdCppStub.html('- ' + cpp.toFixed(2));
            self.elYtdUiStub.html('- ' + ui.toFixed(2));
            self.elYtdFedStub.html('- ' + fedTax.toFixed(2));
            self.elYtdTotStub.html('- ' + (totalTax + totalUIplusCPP).toFixed(2));
        }
    }
});
