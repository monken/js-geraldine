define([
  'chaplin',
  'underscore',
], function(Chaplin, _) {
  return Chaplin.Controller.extend({
    /**
     * Extends Chaplin's `listenTo` function to accept objects which simplifies definining multiple events.
     *   this.listenTo(this.view, {
     *     'model change': _.indentity(),
     *   });
     *
     * @param {Component} component   Component that the listener will be attached to
     * @param {Object} [[options]] 	Object with events and functions
     * @return {Object} [[context]] Optional context
     */
    listenTo: function(component, obj, context) {
      var listenTo = Chaplin.Controller.prototype.listenTo;
      if(_.isString(obj)) return listenTo.apply(this, arguments);
      else if(_.isPlainObject(obj)) return _.map(obj, function(fn, name) {
        return listenTo.call(this, component, name, fn);
      }.bind(this));
    },
  });
});
