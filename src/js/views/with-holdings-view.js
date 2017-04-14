WithHoldingsView = Backbone.View.extend({

    el: '.with-holdings-panel',
    withHoldingsTemplate: _.template($('#with-holdings-template').html()),

    initialize: function () {

        this.render();
    },
    render: function () {
        this.$el.append(this.withHoldingsTemplate);

    }

});
