(function(dependencies, definition) {
  if (typeof module === 'object' && module && module.exports) {
      dependencies = dependencies.map(require);
      module.exports = definition.apply(context, dependencies);
  } else if (typeof require === 'function') {
    define((dependencies || []), definition);
  }
})(['chaplin'], function(Chaplin) {
  'use strict';

  return Chaplin.Application.extend({
    controllerPath: "controller/",
    controllerSuffix: "",
  });
});
