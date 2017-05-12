AppView = Backbone.View.extend({

    el: '.select-panel',

    appTemplate: _.template($('#app-template').html()),

    initialize: function () {
        // Render the template before quering its elements.
        this.render();
        var elSelQty = $('#sel-qty'),
            elSelRate = $('#sel-rate'),
            elSelFedRate = $('#sel-fed-rate'),
            o = '<option>',
            e = '</option>';

        // These elements are for looped in because there are hundreds of them.
        for (var i = 0; i < 500; i++) {
            elSelQty.append(o + i + e, o + (i + .5) + e);
            elSelRate.append(o + i + e, o + (i + .5) + e);
        }

        // Federal percent options.
        for (var i = 0; i < 30; i++) {
            elSelFedRate.append(o + i + e);
        }
    },

    /*
     Re-rendering the App just means refreshing the statistics,
     the rest of the app doesn't change.
    */
    render: function () {

        this.$el.append(this.appTemplate);

    }

});
