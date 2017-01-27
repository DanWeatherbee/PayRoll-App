/*
Individual Todo View
Now let’s look at the TodoView view.
This will be in charge of individual Todo records, making sure the view updates when the todo does.
To enable this functionality,
we will add event listeners to the view that listen for events on an individual todo’s HTML representation.
*/

  var app = app || {};

  // Todo Item View
  // --------------

  // The DOM element for a todo item...
  app.TodoView = Backbone.View.extend({

    //... is a list tag.
    tagName: 'li',

    // Cache the template function for a single item.
    template: _.template( $('#item-template').html() ),

    // The DOM events specific to an item.
    events: {
      'dblclick label': 'edit',
      'keypress .edit': 'updateOnEnter',
      'blur .edit': 'close'
    },

    // The TodoView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Todo** and a **TodoView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    // Re-renders the titles of the todo item.
    render: function() {
      this.$el.html( this.template( this.model.attributes ) );
      this.$input = this.$('.edit');
      return this;
    },

    // Switch this view into `"editing"` mode, displaying the input field.
    edit: function() {
      this.$el.addClass('editing');
      this.$input.focus();
    },

    // Close the `"editing"` mode, saving changes to the todo.
    close: function() {
      var value = this.$input.val().trim();

      if ( value ) {
        this.model.save({ title: value });
      }

      this.$el.removeClass('editing');
    },

    // If you hit `enter`, we're through editing the item.
    updateOnEnter: function( e ) {
      if ( e.which === ENTER_KEY ) {
        this.close();
      }
    }
  });

  /*
  In the initialize() constructor, we set up a listener that monitors a todo model’s change event.
  As a result, when the todo gets updated, the application will re-render the view and visually reflect its changes.
  Note that the model passed in the arguments hash by our AppView is automatically available to us as this.model.

        In the render() method, we render our Underscore.js #item-template,
        which was previously compiled into this.template using Underscore’s _.template() method.
        This returns an HTML fragment that replaces the content of the view’s element
        (an li element was implicitly created for us based on the tagName property).
        In other words, the rendered template is now present under this.el and can be appended to the todo list in the user interface.
        render() finishes by caching the input element within the instantiated template into this.$input.

        Our events hash includes three callbacks:

        edit():

        changes the current view into editing mode when a user double-clicks on an existing item in the todo list.
        This allows them to change the existing value of the item’s title attribute.
        updateOnEnter():
        checks that the user has hit the return/enter key and executes the close() function.

        close():

        trims the value of the current text in our <input/> field, ensuring that we don’t process it further if it does not contain any text
        (e.g ‘’). If a valid value has been provided,
        we save the changes to the current todo model and close editing mode by removing the corresponding CSS class.
  */