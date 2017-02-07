/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Todo Collection
	// ---------------

	// The collection of todos is backed by *localStorage* instead of a remote
	// server.
	var FoodItems = Backbone.Collection.extend({
		// Reference to this collection's model.
		model: app.FoodItem,

		// Save all of the food items under the `items` namespace.
		localStorage: new Backbone.LocalStorage('items-backbone')
	});

	// Instantiate our global collection of **FoodItems**.
	app.items = new FoodItems();
})();
