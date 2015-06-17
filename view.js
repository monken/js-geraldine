/**
 * @title View
 * @license MIT
 * @author Moritz Onken
 * @class View
*/

define(["chaplin", "./view/mixin", "./model"], function(Chaplin, Mixin, Model) {
  'use strict';
  return Chaplin.View.extend(Mixin).extend({

    /**
     * @member {Object} bindings
     *
     * The `bindings` attribute defines data bindings to html elements. Bindings can contain
     * a transformation function to modify the original value. Bindings also work for relationship
     * attributes. If the relationship is a collection, the element will be updated if any of the
     * add, remove or reset events are triggered on the collection.
     *
     * Bindings will be initialized when the view is rendered.
     *
     * ```
     * View.extend({
     *   bindings: {
     *     // bind name attribute to content of element with class 'name'
     *     '.name': 'name',
     *     // format 'dateOfBirth' attribute
     *     '.born': ['dateOfBirth', function(value) { return moment(value).format('ll') }],
     *     // update count of children
     *     '.children': ['children', function(value) { return children.length }],
     *   }
     * });
     * ```
     */
    bindings: {},
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
