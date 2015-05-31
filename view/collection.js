(function(dependencies, definition) {
  if (typeof module === 'object' && module && module.exports) {
      dependencies = dependencies.map(require);
      module.exports = definition.apply(context, dependencies);
  } else if (typeof require === 'function') {
    define((dependencies || []), definition);
  }
})(["chaplin", "./../view", "./mixin", "./../model", "./../collection"], function(Chaplin, ItemView, Mixin, Model, Collection) {
  return Chaplin.CollectionView.extend(Mixin).extend({
    animationDuration: 0,
    itemView: ItemView,
    initialize: function() {
      Chaplin.CollectionView.prototype.initialize.apply(this, arguments);
      Mixin.initialize.apply(this, arguments);
      this.configCollection = new Collection();
    },
    render: function() {
      Chaplin.CollectionView.prototype.render.apply(this, arguments);
      this.doLayout(this.config.toJSON());
      return this;
    },
    insertView: function(model, view, pos) {
      var view = Chaplin.CollectionView.prototype.insertView.apply(this, arguments);
      this.configCollection.add(view.config);
      return view;
    }

  });
});
