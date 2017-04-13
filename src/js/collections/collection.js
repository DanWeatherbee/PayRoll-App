Collection = Backbone.Collection.extend({
    model: Trans_Model,
    localStorage: new Backbone.LocalStorage('payroll'),

    /*
     Grab all the data from collections saved in local storage.
     Populate the DOM with the retrieved information.
     */
    populate: function() {

        /*
         TODO start wrapping all these jquery element methods in variables.
        instead of calling them in a for loop.
        */

        for (var i = 0; i < 200; i++) {
            $('#sel-qty').append('<option>' + i + '</option>');
            $('#sel-qty').append('<option>' + (i + .5) + '</option>');
            $('#sel-rate').append('<option>' + i + '</option>');
            $('#sel-rate').append('<option>' + (i + .5) + '</option>');
        }

        for (var i = 0; i < this.models.length; i++) {
            $('#sel-qty').append('<option>' + i + '</option>');

            totalQty = totalQty + this.models[i].attributes.qty;
            totalYtd = totalYtd + this.models[i].attributes.cur;
            totalVac = totalVac + this.models[i].attributes.vac;
            totalCur = totalCur + this.models[i].attributes.cur;

            // This data is appended to Transaction List.
            $('#job').prepend('<p>' + this.models[i].attributes.job + '</p><hr>');
            $('#dte').prepend('<p>' + this.models[i].attributes.dte + '</p><hr>');
            $('#qty').prepend('<p>' + this.models[i].attributes.qty + '</p><hr>');
            $('#rate').prepend('<p>' + this.models[i].attributes.rate + '</p><hr>');
            $('#ot').prepend('<p>' + this.models[i].attributes.ot + '</p><hr>');
            $('#cur').prepend('<p>' + this.models[i].attributes.cur + '</p><hr>');
            var vac_2DIGITS = this.models[i].attributes.vac;
            $('#vac').prepend('<p>' + vac_2DIGITS.toFixed(2) + '</p><hr>');
            $('#gross').prepend('<p>' + this.models[i].attributes.gross + '</p><hr>');
            $('#stat').prepend('<p>' + this.models[i].attributes.stat + '</p><hr>');
        }

        payStart = this.models[0].attributes.periodB;

        payEnd = this.models[0].attributes.periodE;
        $('.pay-period-panel').fadeOut();

        var dateNow = Date();
        $('#pay-per-header').append(" Today is " + dateNow + " Choose a pay period below.");
        $('#employee-h').html(" Period start: " + payStart + " Period end: " + payEnd);
        $('#total-models').append("Total Transactions in this: " + this.models.length);
        $('#qty-hr-stub').html(totalQty);
        $('#rate-hr-stub').html(this.models[this.models.length - 1].attributes.rate);
        $('#cur-hr-stub').html(totalCur);
        $('#cur-vac-stub').html(totalVac.toFixed(2));
        $('#ytd-hr-stub').html(totalYtd);
        $('#ytd-vac-stub').html(totalVac.toFixed(2));
        $('#cur-vacP-stub').html(totalCur + totalVac);
        $('#ytd-vacP-stub').html(totalCur + totalVac);
        $('#dte-l').html(this.models[this.models.length - 1].attributes.dte);
        $('#qty-l').html(this.models[this.models.length - 1].attributes.qty);
        $('#rate-l').html(this.models[this.models.length - 1].attributes.rate);
        $('#ot-l').html(this.models[this.models.length - 1].attributes.ot);
        $('#cur-l').html(this.models[this.models.length - 1].attributes.cur);
        var VAC_2DIGITS = this.models[this.models.length - 1].attributes.vac;
        $('#vac-l').html(VAC_2DIGITS.toFixed(2));
        $('#gross-l').html(this.models[this.models.length - 1].attributes.gross);
        $('#stat-l').html(this.models[this.models.length - 1].attributes.stat);
        $('#job-l').html(this.models[this.models.length - 1].attributes.job);
        // $('#job-opt')[0].value = this.models[this.models.length - 1].attributes.job;

        $('#sel-qty').prepend('<option>' +
            this.models[this.models.length - 1].attributes.qty + '</option>');
        $('#sel-rate').prepend('<option>' +
            this.models[this.models.length - 1].attributes.rate + '</option>');
        $('#sel-stat').prepend('<option>' +
            this.models[this.models.length - 1].attributes.stat + '</option>');

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

            // Append Calculated Data received from collections.
            $('#cur-netPay-stub').html(netPay.toFixed(2));
            $('#ytd-netPay-stub').html(netPay.toFixed(2));
            $('#cur-cpp-stub').html('- ' + cpp.toFixed(2));
            $('#cur-ui-stub').html('- ' + ui.toFixed(2));
            $('#cur-fed-stub').html('- ' + fed.toFixed(2));
            $('#cur-tot-stub').html('- ' + (totalTax + totalUIplusCPP).toFixed(2));
            $('#ytd-cpp-stub').html('- ' + cpp.toFixed(2));
            $('#ytd-ui-stub').html('- ' + ui.toFixed(2));
            $('#ytd-fed-stub').html('- ' + fed.toFixed(2));
            $('#ytd-tot-stub').html('- ' + (totalTax + totalUIplusCPP).toFixed(2));
        }
    }
});
