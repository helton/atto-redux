const createStore = require('./createStore')
const combineReducers = require('./combineReducers')
const applyMiddleware = require('./applyMiddleware')
const compose = require('./compose')

module.exports = { createStore, combineReducers, applyMiddleware, compose }
