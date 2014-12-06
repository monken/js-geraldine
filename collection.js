define(["chaplin", "./model", "underscore"], function(Chaplin, Model, _) {
	return Chaplin.Collection.extend({
		model: Model,
		_promise: null,
		initialize: function(models, options) {
			options = (options || {});
			for(var adapter in this.store) {
				if(_.isPlainObject(this.store[adapter])) {
					var args = _.extend({
						idAttribute: this.model.prototype.idAttribute,
						isCollection: true,
					}, this.store[adapter]);
					var Klass = require("store/" + adapter);
					this.store[adapter] = new Klass(args);
				}
			}
		},
		/**
		 * Sets the `active` attribute of all models but `model` to `false`.
		 * Triggers the `active` event with the `model` passed as first parameter.
		 * 
		 * @param {App.Model} model   Model that is set to active
		 * @param {Object} options 	Options that are passed to `set` such as `{ silent: true }`
		 * @return {App.Model}	returns `model`
		 */
		setActive: function(model, options) {
			var attribute = this.model.prototype.activeAttribute;
			_.invoke(this.without(model), "set", attribute, false, options);
			if(!model) return;
			options = options || {};
			if(model.get(attribute)) return model;
			model.set(attribute, true, options);
			if(options.silent !== false) this.trigger("active", model, options);
			return model;
		},
		/**
		 * Get active model of collection
		 * 
		 * @return {App.Model}	Returns a model of one is active.
		 */
		getActive: function() {
			return this.find(function(model) { return model.isActive() });
		},
		getLast: function() {
			return this.at(this.length - 1);
		},
		parse: function(data) {
			var list = [];
			for(var id in data) {
				list.push(data[id]);
			}
			return list;
		},
		then: function() {
			if(!this._promise) this.fetch();
			return this._promise.then.apply(this._promise, arguments);
		},
		fetch: function() {
			this._promise = Chaplin.Collection.prototype.fetch.apply(this, arguments);
			return this._promise;
		},
		fetchAll: function(options) {
			var self = this;
			var deferred = $.Deferred().resolve();
			return this.reduce(function(memo, model) {
				if(!model.id || model.fetched) return memo;
				return memo.then(model.fetch(options))
			}, $.when(deferred)).done(function() {
				self.trigger("sync");
			});
		},
		deflate: function() {
			return _.filter(this.map(function(model) { return model.deflate() }), _.identity);
		},
		sync: function(method, model, options) {
			var defaultStore = options.store || this.defaultStore || _.keys(this.store)[0];
			return this.store[defaultStore].sync.apply(this.store[defaultStore], arguments);
		},
		save: function(attrs, options) {
			return this.invoke("save", attrs, options);
		},
		deepClone: function() {
			return new this.constructor(this.models.slice(0));
		},
		dispose: function() {
			Chaplin.Collection.prototype.dispose.apply(this, arguments);
			console.log('disposing collection', this);
			this._promise = null;
		}
	});
});
