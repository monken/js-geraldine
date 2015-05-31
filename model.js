(function(dependencies, definition) {
  if (typeof module === 'object' && module && module.exports) {
      dependencies = dependencies.map(require);
      module.exports = definition.apply(context, dependencies);
  } else if (typeof require === 'function') {
    define((dependencies || []), definition);
  }
})([
  'chaplin',
  'underscore',
], function(Chaplin, _) {
  return Chaplin.Model.extend({
    idAttribute: 'Id',
    activeAttribute: 'active',
    relationships: {},
    defaults: {},
    initialize: function(attrs, options) {
      attrs = (attrs || {});
      options = (options || {});

      this.initDefaults(attrs, options);

      for (var adapter in this.store) {
        if (_.isPlainObject(this.store[adapter])) {
          var args = _.extend({
            idAttribute: this.idAttribute,
            isModel: true,
          }, this.store[adapter]);
          var Klass = require("store/" + adapter);
          this.store[adapter] = new Klass(args);
        }
      }

      for (var relation in this.relationships) {
        var parsed = !attrs[relation] ? [] : _.isArray(attrs[relation]) || _.isPlainObject(
            attrs[relation]) ? (new this.relationships[relation]())
          .parse(attrs[relation]) : attrs[relation].invoke("toJSON");
        this.set(
          relation,
          new this.relationships[relation](
            parsed, {
              parse: true,
            }
          ));
      }
    },
    initDefaults: function() {
      for (var key in this.defaults) {
        var def = this.defaults[key];
        if (_.isArray(def)) {
          var clone = def.slice();
          var func = clone.pop();
          this.on('change', function(model) {
            var changes = model.changedAttributes(clone);
            var values = [];
            for (var attr in clone) {
              values.push(changes[clone[attr]]);
            }
            this.set(key, func.call(this, values));
          }, this);
          var values = [];
          for (var attr in clone) {
            values.push(this.get(attr));
          }
          this.set(key, func.call(this, values));
        }
      }
    },
    set: function(key, val, options) {
      var attr, attrs, unset, changes, silent, changing, prev, current;
      if (key == null) return this;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }
      for (var rel in this.relationships) {
        var collection = this.get(rel);
        if (!attrs[rel] || !collection) continue;
        if (_.isArray(collection) || _.isPlainObject(collection)) continue;
        this.get(rel).set(attrs[rel], options);
        delete attrs[rel];
      }
      return Chaplin.Model.prototype.set.apply(this, [attrs, options]);
    },
    /**
     * Calls `setActive(model, options)` on the collection if the model is part of a collection.
     * Otherwise it will set the model to `active`.
     *
     * @param {Object} [[options]] e.g. `{ silent: true }`
     */
    setActive: function(options) {
      if (!this.collection) {
        this.set(this.activeAttribute, true, options);
        return this;
      }
      return this.collection.setActive(this, options);
    },
    /**
     * Returns true if the model is `active`.
     *
     * @param {Boolean}
     */
    isActive: function() {
      return this.get(this.activeAttribute) ? true : false;
    },
    toggleActive: function(options) {
      var active = this.get(this.activeAttribute);
      return this.set(this.activeAttribute, !active, options);
    },
    inc: function(attribute, value) {
      return this.set(attribute, this.get(attribute) + value);
    },
    get: function(attribute) {
      var value = Chaplin.Model.prototype.get.apply(this, arguments);
      var def = this.defaults[attribute];
      if (_.isFunction(def) && def === value) {
        return _.bind(def, this)();
      } else {
        return value;
      }
    },
    deflate: function() {
      return this.id;
    },
    //    sha1: require("alloy/sha1"),
    digest: function() {
      var args = Array.prototype.slice.call(arguments, 0);
      console.log(args);
      return this.sha1.b64_sha1(args.join("\0"))
        .replace(/\+/g, "-")
        .replace(/\//g, "_"); // URL safe base64 string
    },
    getStore: function(store) {
      var defaultStore = store || this.defaultStore || _.keys(this.store)[0];
      return defaultStore ? this.store[defaultStore] : null;
    },
    sync: function(method, model, options) {
      var store = this.getStore(options.store);
      if (!store)
        return this.collection.sync.apply(this.collection, arguments);
      return store.sync.apply(store, arguments);
    },
    toJSON: function() {
      var data = _.clone(this.attributes);
      for (var key in data) {
        if (_.isFunction(data[key]))
          data[key] = _.bind(data[key], this)();
      }
      return data;
    },
    dispose: function() {
      for (var relationship in this.relationships) {
        this.get(relationship).dispose();
      }
      Chaplin.Model.prototype.dispose.apply(this, arguments);
    }
  });
});
