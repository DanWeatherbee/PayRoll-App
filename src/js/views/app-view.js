/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
        'use strict';

        // The Application
        // ---------------

        // Our overall **AppView** is the top-level piece of UI.
        app.AppView = Backbone.View.extend({
                nutritionxTemplate: _.template( $('#nutritionx-template').html() ),
                initialize: function () {
                        new GetJsonData("cheese", "salad");
                        console.log(foodArray);
                        $('#health-tracker').html(this.nutritionxTemplate());
                },

                // Re-rendering the App just means refreshing the statistics -- the rest
                // of the app doesn't change.
                render: function () {


                }
        });
})(jQuery);
