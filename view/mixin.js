define(['./../model', 'chaplin'], function(Model, Chaplin) {
  return {
    config: {},
    initialize: function(options) {
      this.config = options.config || this.config;
      if (_.isPlainObject(this.config)) {
        this.config = new Model(this.config);
        _.extend(this.config, {
          model: this.model,
          collection: this.collection,
        });
      }
      this.config.on("change", function(model) {
        var changed = model.changedAttributes();
        if (!changed) return;
        this.doLayout(changed);
      }, this);
    },
    onLayout: {
      fill: function($el, value) {
        $el.animate({
          svgFill: value
        }, {
          queue: false
        });
      },
      opacity: function($el, value) {
        $el.animate({
          svgOpacity: value
        }, {
          queue: false
        });
      },
      height: function($el, value) {
        $el.find("> rect").animate({
          svgHeight: value
        }, {
          queue: false
        });
        $el.find("> text.bottom").animate({
          svgY: value - 10
        }, {
          queue: false
        });
      },
      y: function($el, value) {
        $el.animate({
          svgTransform: "translate(" + this.get("x") + ", " + value + ")"
        }, {
          queue: false
        });
      },
      x: function($el, value) {
        $el.animate({
          svgTransform: "translate(" + value + "," + this.get("y") + ")"
        }, {
          queue: false
        });
      }
    },
    getTemplateFunction: function() {
      var template, templateFunc;
      template = this.template;
      if (typeof template === 'string') {
        templateFunc = _.template(template);
        this.constructor.prototype.template = templateFunc;
      } else {
        templateFunc = template;
      }
      return templateFunc;
    },
    getTemplateData: function() {
      return {
        model: this.model ? this.model.serialize() : {},
        items: this.collection ? this.collection.serialize() : [],
        view: this.config ? this.config.serialize() : {},
      };
    },
    _ensureElement: function() {
      if (!this.el) {
        var attrs = _.extend({}, _.result(this, 'attributes'));
        if (this.id) attrs.id = _.result(this, 'id');
        if (this.className) attrs['class'] = _.result(this, 'className');
        var tagName = _.result(this, 'tagName');
        var $el = ["svg", "g", 'circle', 'text', 'path'].indexOf(tagName) === -1 ? Backbone.$('<' + tagName + '>').attr(attrs) : $(window.document.createElementNS("http://www.w3.org/2000/svg", tagName)).attr(attrs);
        this.setElement($el, false);
      } else {
        this.setElement(_.result(this, 'el'), false);
      }
    },
    doLayout: function(attrs) {
      var $el = this.$el;
      for (var attr in attrs) {
        var value = attrs[attr];
        if (this.onLayout[attr]) this.onLayout[attr].call(this.config, $el, value);
      }
    },
    delegateListener: function(eventName, target, callback) {
      Chaplin.View.prototype.delegateListener.apply(this, arguments);
      var prop;
      if (target === 'config') {
        prop = this[target];
        if (prop) {
          this.listenTo(prop, eventName, callback);
        }
      }
    },
  };
});
