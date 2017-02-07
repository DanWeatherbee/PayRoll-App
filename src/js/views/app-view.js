/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
        'use strict';

        app.AppView = Backbone.View.extend({

                template: _.template( $('#nutritionx-template').html() ),

                initialize: function () {
                        $('#health-tracker').html(this.template());
                },

                el: '#health-tracker',
                events: {
                        "click .submit": "query",
                        "click .items-bt": "computeCalories"
                },

                query: function () {
                        app.queryApi = new GetJsonData($('#search').val());

                },

                computeCalories: function (totalCal) {
                        this.totalCal = "not configured yet.";
                        console.log("computeCalories is being run" + this.totalCal);
                        alert("has been clicked.");

                },

                render: function () {

                }
        });
})(jQuery);
