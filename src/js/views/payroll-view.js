PayrollView = Backbone.View.extend({

    el: '.container',
    collection: new Collection(),
    transTemplate: _.template($('#trans-template').html()),
    events: {
        'click [data-test]': 'reload'
    },

    initialize: function() {

        $('#datepicker').datepicker({
            defaultDate: TIME,
            changeMonth: true,
            numberOfMonths: 2
        });
        this.collection.fetch();
        this.render();
    },
    render: function() {
        this.$el.append(this.transTemplate);

        this.collection.populate();
    },
    reload: function() {
        alert("This page will reload to feed in fresh data from storage to confirm your changes.")
        location.reload();
    }

});

var payRoll = new PayrollView();
