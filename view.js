(function(dependencies, definition) {
  if (typeof module === 'object' && module && module.exports) {
    dependencies = dependencies.map(require);
    module.exports = definition.apply(context, dependencies);
  } else if (typeof require === 'function') {
    define((dependencies || []), definition);
  }
})(["chaplin", "./view/mixin", "./model"], function(Chaplin, Mixin, Model) {
  'use strict';
  return Chaplin.View.extend(Mixin).extend({
    render: function() {
      Chaplin.View.prototype.render.apply(this, arguments);
      this.doLayout(this.config.toJSON());

      _.keys(this.bindings || {}).forEach(function(selector) {
        var attrs = this.bindings[selector];
        var fn = _.isArray(attrs) ? attrs[attrs.length - 1] : _.identity;
        attrs = _.isArray(attrs) ? attrs.slice(0, attrs.length - 1) : [attrs];

        attrs.forEach(function(attr) {
          var cb = function(model, value) {
            this.$(selector).text(fn.apply(model, [value]));
          }
          cb.apply(this, [this.model, this.model.get(attr)]);
          if (this.model.relationships[attr])
            this.listenTo(this.model.get(attr), 'add remove reset', cb);
          else
            this.listenTo(this.model, 'change:' + attr, cb);
        }, this);
      }, this);

      return this;
    },
  });
});
