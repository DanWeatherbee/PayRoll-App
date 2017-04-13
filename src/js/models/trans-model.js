
var TIME = new Date();
var D = TIME.getDay();
var M = TIME.getMonth();
var Y = TIME.getFullYear();



Trans_model = Backbone.Model.extend({
            d: D,
            m: M,
            y: Y,
            dte: TIME,
            qty: 0,
            ot: "NULL",
            rate: 0,
            cur: 0,
            vac: 0,
            gross: 0,
            stat: "NULL",
            periodB: "NULL",
            periodE: "NULL",
            job: "NULL"
});
var transModel = new Trans_model();