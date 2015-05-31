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
      return this;
    },
  });
});
