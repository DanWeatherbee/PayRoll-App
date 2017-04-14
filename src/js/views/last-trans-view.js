LastTransView = Backbone.View.extend({

    el: '.last-trans-panel',
    transTemplate: _.template($('#last-trans-template').html()),

    initialize: function () {

        this.render();
    },
    render: function () {
        this.$el.append(this.transTemplate);

    }

});


