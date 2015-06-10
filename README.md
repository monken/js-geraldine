[![Build Status](https://travis-ci.org/monken/js-geraldine.svg?branch=master)](https://travis-ci.org/monken/js-geraldine)

# js-geraldine

Some improvements to [Chaplin](http://chaplinjs.org/) and [Backbone.JS](http://backbonejs.org/).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
Contents

- [Global](#global)
  - [Class: Collection](#class-collection)
    - [Collection.setActive(model, [options])](#collectionsetactivemodel-options)
    - [Collection.getActive()](#collectiongetactive)
    - [Collection.getLast()](#collectiongetlast)
    - [Collection.save()](#collectionsave)
    - [Collection.deepClone()](#collectiondeepclone)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
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










The MIT License (MIT)

Copyright (c) 2015 Moritz Onken

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

