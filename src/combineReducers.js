import mapValues from 'lodash-es/mapValues'

const combineReducers = reducers =>
  (state = {}, action) => mapValues(reducers, (reducer, key) => reducer(state[key], action))

export default combineReducers
