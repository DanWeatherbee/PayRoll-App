/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
        'use strict';

        // The Application
        // ---------------

        // Our overall **AppView** is the top-level piece of UI.
        app.AppView = Backbone.View.extend({

                initialize: function () {
                        new app.ItemView();
                },

                // Re-rendering the App just means refreshing the statistics -- the rest
                // of the app doesn't change.
                render: function () {


                }
        });
})(jQuery);
