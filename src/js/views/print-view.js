PrintView = Backbone.View.extend({

    el: '.print-panel',
    printTemplate: _.template($('#print-template').html()),

    initialize: function () {

        this.render();
    },
    render: function () {
        this.$el.append(this.printTemplate);

    }

});
