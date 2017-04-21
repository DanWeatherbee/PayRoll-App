AppView = Backbone.View.extend({

    el: '.select-panel',

    appTemplate: _.template($('#app-template').html()),

    initialize: function () {
        // Render the template before quering its elements.
        this.render();
        var elSelQty = $('#sel-qty'),
            elselRate = $('#sel-rate'),
            o = '<option>',
            e = '</option>';
        // These elements are for looped in because there are hundreds of them.
        for (var i = 0; i < 200; i++) {
            elSelQty.append(o + i + e);
            elSelQty.append(o + (i + .5) + e);
            elselRate.append(o + i + e);
            elselRate.append(o + (i + .5) + e);
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
