(function(dependencies, definition) {
  if (typeof module === 'object' && module && module.exports) {
      dependencies = dependencies.map(require);
      module.exports = definition.apply(context, dependencies);
  } else if (typeof require === 'function') {
    define((dependencies || []), definition);
  }
})(['./model'], function(Model) {
  return Model.extend({
	  S4: function() {
	    return (0 | 65536 * (1 + Math.random())).toString(16).substring(1);
	  },
	  guid: function() {
	    return this.S4() + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4();
	  },
	  find: function() {
	    throw "find not implemented in " + this;
	  },
	  findAll: function() {
	    throw "findAll not implemented in " + this;
	  },
	  create: function() {
	    throw "create not implemented in " + this;
	  },
	  update: function() {
	    throw "update not implemented in " + this;
	  },
	  destroy: function() {
	    throw "destroy not implemented in " + this;
	  },
	  sync: function(method, model, options) {
	    options = options || {};
	    var resp;
	    switch (method) {
	      case "read":
	        if (model.id) resp = this.find(model, options);
	        else resp = this.findAll(model, options);
	        break;
	      case "create":
	        resp = this.create(model, options);
	        break;
	      case "update":
	        resp = this.update(model, options);
	        break;
	      case "delete":
	        resp = this.destroy(model, options);
	        break;
	    }
	    var q = resp;
	    q.then(null, options.error);
	    return q;
	  },
	});
});
