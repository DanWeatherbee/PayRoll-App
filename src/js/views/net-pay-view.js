NetPayView = Backbone.View.extend({

    el: '.net-pay-panel',
    netPayTemplate: _.template($('#net-pay-template').html()),

    initialize: function () {

        this.render();
    },
    render: function () {
        this.$el.append(this.netPayTemplate);

    }

});
