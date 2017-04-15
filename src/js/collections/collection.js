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
            elJob.append(this.models[i].get('job') + '</p><hr>');
            elDte.append(this.models[i].get('dte') + '</p><hr>');
            elQty.append(this.models[i].get('qty') + '</p><hr>');
            elRate.append(this.models[i].get('rate') + '</p><hr>');
            elOt.append(this.models[i].get('ot') + '</p><hr>');
            elCur.append(this.models[i].get('cur') + '</p><hr>');
            elVac.append(this.models[i].get('vac') + '</p><hr>');
            elGross.append(this.models[i].get('gross') + '</p><hr>');
            elStat.append(this.models[i].get('stat') + '</p><hr>');

        };

    }

});
