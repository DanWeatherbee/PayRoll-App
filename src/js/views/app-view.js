AppView = Backbone.View.extend({
    el: '.container',
    collection: new Collection(),
    appTemplate: _.template($('#app-template').html()),
    events: {
        'click [data-test]': 'addData'
    },
    initialize: function () {
      this.fetch();

      // this.listenTo(collection, 'populate', this.addData);
      this.render();
    },

    addData: function () {
        // Initiate progress bar.
        app.move();
        // Grab data from Date Elements.
        var DATE_PERIOD_BEGIN = $('#from')[0].value;
        var DATE_PERIOD_END = $('#to')[0].value;
        var DATE = $('#datepicker')[0].value;
        var JOB = $('#job-opt')[0].value;

        // Run Error method to check if empty.
        DATE_PERIOD_BEGIN = this.errorCheck(DATE_PERIOD_BEGIN);
        DATE_PERIOD_END = this.errorCheck(DATE_PERIOD_END);

        // Make sure Date Element is not empty.
        if (JOB == "") {
          alert("please enter a job and date.")
          return;
        }
        if (DATE == "") {
          alert("please enter a job and date.")
          return;
        }
          $('#pay-per-header').html("Pay Period Panel: " + DATE_PERIOD_BEGIN);
          $('#pay-per-header').html("Pay Period Panel: " + DATE_PERIOD_END);
        // Grab values from options selected.
        var QTY = Number($('#sel-qty option:selected').text());
        var RATE = Number($('#sel-rate option:selected').text());
        var CUR = QTY * RATE;
        var VAC = CUR * .04;
        var GROSS = CUR + VAC;
        var STAT = $('#sel-stat option:selected').text();
        var OT = $('#sel-ot option:selected').text();

        // New Transaction.
        var TransModel = {
            dte: DATE,
            qty: QTY,
            ot: OT,
            rate: RATE,
            cur: CUR,
            vac: VAC,
            gross: GROSS,
            stat: STAT,
            periodB: DATE_PERIOD_BEGIN,
            periodE: DATE_PERIOD_END,
            job: JOB
            };

        var newTrans = new Model(TransModel);

        this.add(newTrans);

        // Save the new transaction, views will rely on thiss for data.
        newTrans.save();
        this.populate();
    },
    clear: function () {
      var arrayLength = this.models.length - 1;
      if (arrayLength > 0) {
        this.models[arrayLength].destroy();
      } else {

        this.models[0].destroy();
        alert("All records are deleted.");
      }

    },
    errorCheck: function (ifEmpty) {
      alert("Error Checking is running.")
      if (ifEmpty == "") {
        console.log("String is Empty");
        console.log(ifEmpty);
        ifEmpty = "No Date";
        console.log("Empty-string, Checking is complete.");
        return ifEmpty;
      };
      console.log("Error Checking is complete.");
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function () {
        console.log("render has initiated.");
        this.$el.prepend(this.appTemplate);

    }

});

