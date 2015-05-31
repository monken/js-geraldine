var assert = require('assert'),
  _ = require('lodash'),
  Promise = require('bluebird');


var t = {};

describe('require', function() {
  ['collection', 'model', 'view', 'view/collection', 'geraldine'].forEach(function(module) {
    it(module, function() {
      assert.doesNotThrow(function() {
        require('../' + module);
      })
    })
  });
});
