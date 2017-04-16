Collection = Backbone.Collection.extend({
    model: Trans_Model,
    localStorage: new Backbone.LocalStorage('payroll'),
    initialize: function () {
        console.log("collection has been initialized.");
        this.fetch();
        console.log(this.models);
    },
    getData: function () {
        var elJob = $('#job');
        var elDte = $('#dte');
        var elQty = $('#qty');
        var elRate = $('#rate');
        var elOt = $('#ot');
        var elCur = $('#cur');
        var elVac = $('#vac');
        var elGross = $('#gross');
        var elStat = $('#stat');
        var vac_2DIGITS;
        // Clear the elements.
        elJob.html('');
        elDte.html('');
        elQty.html('');
        elRate.html('');
        elOt.html('');
        elCur.html('');
        elVac.html('');
        elGross.html('');
        elStat.html('');

        _.each(this.models, function (item) {

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


    }

});
