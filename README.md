[![Build Status](https://travis-ci.org/monken/js-geraldine.svg?branch=master)](https://travis-ci.org/monken/js-geraldine)

# js-geraldine

Some improvements to [Chaplin](http://chaplinjs.org/).

# Collection

## `setActive(model, [options])`

Unsets the `activeAttribute` attribute on all models and sets it on the `model` passed as first argument.

## `getActive()`

Returns the (first) `active` model or `null` if there are no active models.

# Model

## `activeAttribute`

Defaults to `active`. This attribute is on the model is used to track the `active` state.