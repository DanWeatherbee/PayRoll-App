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
                        "click button": "query"
                },

                query: function () {
                        new GetJsonData($('#search').val());

                },

                render: function () {

                }
        });
})(jQuery);
