import isPlainObject from 'lodash/isPlainObject'

class Store {
  constructor(reducer, preloadedState) {
    this.reducer = reducer
    this.observers = []
    this.state = preloadedState
    this.dispatch({ type: '@@INIT'})
  }

  getState = () => {
    return this.state
  };

  dispatch = action => {
    if (!isPlainObject(action))
      throw new Error('Actions must be plain objects')    
    if (typeof action.type === 'undefined') {
      throw new Error('Actions must have a type property defined')
    }
    this.state = this.reducer(this.state, action)
    this.observers.forEach(observer => observer())
  };

  subscribe = observer => {
    this.observers.push(observer)
    return () => {
      this.observers = this.observers.filter(current =>
        current !== observer
      )
    }
  };
}

const createStore = (reducer, preloadedState, enhancer) => {
  if (typeof preloadedState === 'function') {
    enhancer = preloadedState
    preloadedState = undefined
  }
  const store = new Store(reducer, preloadedState)

  if (enhancer !== undefined)
    enhancer(store)

  return store
}

export default createStore
