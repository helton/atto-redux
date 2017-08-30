const mapValues = require('lodash/mapValues')

const combineReducers = reducers =>
  (state = {}, action) => mapValues(reducers, (reducer, key) => reducer(state[key], action))

module.exports = combineReducers
