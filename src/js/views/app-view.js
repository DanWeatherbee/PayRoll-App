/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
        'use strict';

        // The Application
        // ---------------

        // Our overall **AppView** is the top-level piece of UI.
        app.AppView = Backbone.View.extend({

                template: _.template( $('#nutritionx-template').html() ),

                initialize: function () {
                        var healthQuery = new GetJsonData("cheese", "salad");
                        $('#health-tracker').html(this.template());
                },

                el: '#health-tracker',
                events: {
                        "click button": "render"
                },


                // Re-rendering the App just means refreshing the statistics -- the rest
                // of the app doesn't change.
                render: function () {

                        console.log('hello world');
                }
        });
})(jQuery);
