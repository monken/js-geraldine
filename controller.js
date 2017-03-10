define([
  'chaplin',
  'underscore',
], function(Chaplin, _) {
  return Chaplin.Controller.extend({
    listenTo: function(component, obj, context) {
      var listenTo = Chaplin.Controller.prototype.listenTo;
      if(_.isString(obj)) return listenTo.apply(this, arguments);
      else if(_.isPlainObject(obj)) return _.map(obj, function(fn, name) {
        return listenTo.call(this, component, name, fn);
      }.bind(this));
    },
  });
});
