class Store {
  constructor(reducer, preloadedState) {
    this.reducer = reducer
    this.observers = []
    this.state = preloadedState
    this.dispatch({})
  }

  getState = () => {
    return this.state
  };

  dispatch = action => {
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
