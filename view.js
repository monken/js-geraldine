define(["chaplin", "./view/mixin", "./model"], function(Chaplin, Mixin, Model) {
  'use strict';
  return Chaplin.View.extend(Mixin).extend({
    render: function() {
      Chaplin.View.prototype.render.apply(this, arguments);
      this.doLayout(this.config.toJSON());
      return this;
    },
  });
});
