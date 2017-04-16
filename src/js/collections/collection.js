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

        for (var i = 0; i < this.length; i++) {

            // Repopulate elements.
            elJob.append(this.models[i].get('job') + '<br><hr>');
            elDte.append(this.models[i].get('dte') + '<br><hr>');
            elQty.append(this.models[i].get('qty') + '<br><hr>');
            elRate.append(this.models[i].get('rate') + '<br><hr>');
            elOt.append(this.models[i].get('ot') + '<br><hr>');
            elCur.append(this.models[i].get('cur') + '<br><hr>');
            vac_2DIGITS = this.models[i].get('vac');

            elVac.append(vac_2DIGITS.toFixed(2) + '<br><hr>');
            elGross.append(this.models[i].get('gross') + '<br><hr>');
            elStat.append(this.models[i].get('stat') + '<br><hr>');

        };

    }

});
