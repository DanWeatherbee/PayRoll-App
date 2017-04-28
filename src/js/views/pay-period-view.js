PayPeriodView = Backbone.View.extend({

    el: '.pay-period-panel',
    payPerTemplate: _.template($('#pay-per-template').html()),

    initialize: function () {

        this.render();
    },
    render: function () {
        this.$el.append(this.payPerTemplate);

    }

});
