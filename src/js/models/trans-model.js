// Globals Date and Time.
var TIME = new Date(),
    D = TIME.getDay(),
    M = TIME.getMonth(),
    Y = TIME.getFullYear();

Trans_Model = Backbone.Model.extend({
    defaults: {
        d: D,
        m: M,
        y: Y,
        dte: TIME,
        qty: 80,
        ot: "NULL",
        rate: 15,
        cur: 0,
        vac: 0,
        gross: 0,
        stat: "NULL",
        periodB: "NULL",
        periodE: "NULL",
        job: "NULL"
    }

});

// Instantiate the new Object.
var transModel = new Trans_Model();
