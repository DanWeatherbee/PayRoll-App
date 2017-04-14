EarningsView = Backbone.View.extend({

    el: '.earnings-panel',
    earningsTemplate: _.template($('#earnings-template').html()),

    initialize: function () {

        this.render();
    },
    render: function () {
        this.$el.append(this.earningsTemplate);

    }

});
