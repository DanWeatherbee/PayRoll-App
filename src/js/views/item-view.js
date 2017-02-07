/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
        'use strict';

                // Dom Element
        app.ItemView = Backbone.View.extend({

                    // Cache the template function for a single item.
                template: _.template($('#nutritionx-template').html()),


                initialize: function () {
                        this.listenTo(this.model, 'change', this.render);

                },

                render: function () {
                        console.log("model has changed.")
                }
        });
})(jQuery);
