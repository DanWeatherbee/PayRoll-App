/*
Startup
So now we have two views: AppView and TodoView.
The former needs to be instantiated on page load so its code gets executed.
This can be accomplished through jQuery’s ready() utility,
which will execute a function when the DOM is loaded.
*/


  var app = app || {};
  var ENTER_KEY = 13;
  var ESC_KEY = 27;

  $(function() {

    // Kick things off by creating the **App**.
    new app.AppView();

  });