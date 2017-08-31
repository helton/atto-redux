# atto-redux &middot; [![Build Status](https://travis-ci.org/helton/atto-redux.svg?branch=master)](https://travis-ci.org/helton/atto-redux) [![Coverage Status](https://img.shields.io/coveralls/helton/atto-redux/master.svg?style=flat)](https://coveralls.io/github/helton/atto-redux?branch=master) [![Dependency Status](https://david-dm.org/helton/atto-redux.svg?theme=shields.io)](https://david-dm.org/helton/atto-redux) [![devDependency Status](https://david-dm.org/helton/atto-redux/dev-status.svg?theme=shields.io)](https://david-dm.org/helton/atto-redux#info=devDependencies) [![npm version](https://img.shields.io/npm/v/atto-redux.svg?style=flat)](https://www.npmjs.com/package/atto-redux) [![npm license](https://img.shields.io/npm/l/atto-redux.svg)](https://www.npmjs.org/package/atto-redux) [![npm](https://img.shields.io/npm/dm/atto-redux.svg)](https://www.npmjs.org/package/atto-redux) [![npm](https://img.shields.io/npm/dt/atto-redux.svg)](https://www.npmjs.org/package/atto-redux)

A minimalist [Redux](http://redux.js.org/)-like library

## Notes

This is **not** a full compatible [Redux](http://redux.js.org/) implementation, even it has a lot of the features. I built it only with the intention of learning and building an open source project, after watching an excelent [series](https://egghead.io/courses/getting-started-with-redux) of [episodes](https://egghead.io/courses/building-react-applications-with-idiomatic-redux) in [Egghead](https://egghead.io) about Redux, made by [Dan Abramov](https://github.com/gaearon).

## Install

### Yarn

`$ yarn add atto-redux`

### NPM

`$ npm install atto-redux --save`

## Usage

> This example was taken from the [Redux official documentation](http://redux.js.org/#the-gist)

```javascript
import { createStore } from 'atto-redux'

/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * In this example, we use a `switch` statement and strings, but you can use a helper that
 * follows a different convention (such as function maps) if it makes sense for your
 * project.
 */
function counter(state = 0, action) {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1
  case 'DECREMENT':
    return state - 1
  default:
    return state
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(counter)

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.

store.subscribe(() =>
  console.log(store.getState())
)

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
store.dispatch({ type: 'INCREMENT' })
// 1
store.dispatch({ type: 'INCREMENT' })
// 2
store.dispatch({ type: 'DECREMENT' })
// 1
```

## Todo list
- [ ] Add linter
- [ ] Add flow support
- [ ] Add format: Standard JS
- [x] Add badges
- [x] Check dependencies (all up to date?)
- [x] Documentation
  - [x] Link to the original Redux page (for a complete solution) in the README.md
  - [x] Add examples

[![GitHub forks](https://img.shields.io/github/forks/helton/atto-redux.svg?style=social&label=Fork)](https://github.com/helton/atto-redux) [![GitHub stars](https://img.shields.io/github/stars/helton/atto-redux.svg?style=social&label=Star)](https://github.com/helton/atto-redux) [![GitHub watchers](https://img.shields.io/github/watchers/helton/atto-redux.svg?style=social&label=Watch)](https://github.com/helton/atto-redux) [![GitHub followers](https://img.shields.io/github/followers/helton.svg?style=social&label=Follow)](https://github.com/helton/atto-redux) [![Twitter Follow](https://img.shields.io/twitter/follow/h3170n.svg?style=social)](https://twitter.com/h3170n)