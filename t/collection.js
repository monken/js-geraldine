var assert = require('assert'),
  _ = require('lodash'),
  Promise = require('bluebird');

var Collection = require('../collection'),
  Model = require('../model');

var t = {};

describe('collection', function() {
  it('constructor', function() {
    assert.ok(_.isFunction(Collection), 'Component is a function');
    assert.ok(_.isFunction(Collection.extend), 'Component has "extend" function');
  });

  it('MyCollection', function() {
    var MyCollection = Collection.extend({
      model: Model.extend({
        defaults: {
          inactive: ['active', function(active) {
            return !active;
          }],
          index: function() {
            return this.collection.indexOf(this);
          }
        }
      })
    });
    assert.ok(new MyCollection(), 'Build MyCollection');
    var collection = new MyCollection();

    assert.equal(collection.getLast(), null);

    var activeCounter = 0;
    collection.on('active', function() {
      activeCounter++;
    });

    collection.add({
      active: true
    });
    assert.deepEqual(collection.pluck('active'), [true]);
    assert.deepEqual(collection.pluck('inactive'), [false]);
    /*
    assert.equal(activeCounter, 1);

    collection.add({}).setActive();
    assert.equal(activeCounter, 2);
    assert.deepEqual(collection.pluck('active'), [false, true]);
    assert.deepEqual(collection.pluck('inactive'), [true, false]);
    collection.setActive();
    assert.equal(activeCounter, 2);
    assert.deepEqual(collection.pluck('active'), [false, false]);
    assert.deepEqual(collection.pluck('inactive'), [true, true]);
    assert.deepEqual(collection.invoke('get', 'index'), [0, 1]);
    */
  });
});
