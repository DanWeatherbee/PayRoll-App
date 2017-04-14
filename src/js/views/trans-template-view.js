TransactionView = Backbone.View.extend({

    el: '.trans-panel',
    transTemplate: _.template($('#trans-template').html()),

    initialize: function () {

        this.render();
    },
    render: function () {
        this.$el.append(this.transTemplate);

    }

});
