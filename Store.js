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

module.exports = Store
