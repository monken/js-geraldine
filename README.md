[![Build Status](https://travis-ci.org/monken/js-geraldine.svg?branch=master)](https://travis-ci.org/monken/js-geraldine)

# js-geraldine

Some improvements to [Chaplin](http://chaplinjs.org/) and [Backbone.JS](http://backbonejs.org/).
# Global





* * *

## Class: Collection


### Collection.setActive(model, [options]) 

Unsets the `activeAttribute` attribute on all models and sets it on the `model` passed as first argument.
Triggers the `active` event with the `model` passed as first parameter.

**Parameters**

**model**: `Model`, Model that is set to active

**[options]**: `Object`, Options that are passed to `set` such as `{ silent: true }`

**Returns**: `Model`

### Collection.getActive() 

Returns the (first) `active` model or `null` if there are no active models.

**Returns**: `Model`

### Collection.getLast() 

Returns the last model in the collection.

**Returns**: `Model`

### Collection.save() 

Invoke `save` on all models of the collection.

**Returns**: `Models`

### Collection.deepClone() 

Creates a clone of the collection by copying the models in a new array.
Changes to the new collection will not affect the original collection.

**Returns**: `Collection`



* * *










