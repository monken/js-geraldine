(function(dependencies, definition) {
  if (typeof module === 'object' && module && module.exports) {
      dependencies = dependencies.map(require);
      module.exports = definition.apply(context, dependencies);
  } else if (typeof require === 'function') {
    define((dependencies || []), definition);
  }
})(['rsvp'], function(RSVP) {
	return RSVP.Promise;
});
