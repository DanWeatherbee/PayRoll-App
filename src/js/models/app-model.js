var App_Model = Backbone.Model.extend({
    name: "Dan Weatherbee",
    dev: "Developer",
    version: 1.2,
    project: "Payroll App",
    framework: "Backbone.js",
    library: "jQuery.js",
    cssframework: "BootStrap",
    initiate: function () {
        "use strict";
        console.log("Model instantiated.");
    }
});
// Instantiate the new Object.
var appModel = new App_Model();
