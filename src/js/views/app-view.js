AppView = Backbone.View.extend({
    el: '.select-panel',

    appTemplate: _.template($('#app-template').html()),

    initialize: function() {

        // this.listenTo(collection, 'populate', this.addData);
        this.render();
    },


    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {

        this.$el.append(this.appTemplate);
        for (var i = 0; i < 200; i++) {
            $('#sel-qty').append('<option>' + i + '</option>');
            $('#sel-qty').append('<option>' + (i + .5) + '</option>');
            $('#sel-rate').append('<option>' + i + '</option>');
            $('#sel-rate').append('<option>' + (i + .5) + '</option>');
        }

    }

});
