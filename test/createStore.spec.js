import { createStore, applyMiddleware }  from '../src'

describe('createStore()', () => {
  const simpleAction = { type: 'DO_SOMETHING' }

  it('should be able to create a store with an empty reducer', () => {
    const store = createStore(() => ({}))
    expect(store).not.toBe(null)
  })

  it('should be able to get the initial state defined by the reducer', () => {
    const obj = { value: 42 }
    const store = createStore(() => obj)
    const state = store.getState()
    expect(state).toEqual(obj)
  })

  it('should be able to dispatch an action', () => {
    const action = { type: 'MY_ACTION', value: 42 }
    const store = createStore((state, action) => action.value)
    store.dispatch(action)
    const state = store.getState()
    expect(state).toEqual(42)
  })

  it('should not be able to dispatch an action without type', () => {
    const store = createStore(state => state)
    const action = { value: 42 }
    expect(() => {
      store.dispatch(action)
    }).toThrow('Actions must have a type property defined');
  })

  it('should only be able to dispatch action as plain objects', () => {
    const store = createStore(state => state)
    const action = []
    expect(() => {
      store.dispatch(action)
    }).toThrow('Actions must be plain objects');
  })

  it('should only be able to notify multiples dispatch calls', () => {
    const count = 0
    const increment = { type: 'INCREMENT' }
    const decrement = { type: 'DECREMENT' }
    const reducer = (state = 0, action) => {
      switch (action.type) {
        case 'INCREMENT':
          return state + 1
        case 'DECREMENT':
          return state - 1
        default:
          return state
      }
    }
    const store = createStore(reducer)
    expect(store.getState()).toEqual(0)
    store.dispatch(increment)
    store.dispatch(increment)
    expect(store.getState()).toEqual(2)
    store.dispatch(decrement)
    expect(store.getState()).toEqual(1)
    store.dispatch(decrement)
    expect(store.getState()).toEqual(0)
  })


  it('should be able to create a store with a preloaded/initial state', () => {
    const initialState = { library: 'redux' }
    const store = createStore(state => state, initialState)
    const state = store.getState()
    expect(state).toEqual(initialState)
  })

  it('should be able to subscribe to changes', () => {
    const store = createStore(() => 42)
    let subscribeCalls = 0
    store.subscribe(() => subscribeCalls++)
    store.dispatch(simpleAction)
    expect(subscribeCalls).toEqual(1)
  })

  it('should be able to be notified of changes when actions are dispatched', () => {
    const store = createStore(() => 42)
    let subscribeCalls = 0
    store.subscribe(() => subscribeCalls++)
    store.dispatch(simpleAction)
    store.dispatch(simpleAction)
    store.dispatch(simpleAction)
    expect(subscribeCalls).toEqual(3)
  })

  it('should be able to notify all the observers(listeners) in the order they subscribed', () => {
    const store = createStore(() => 42)
    let calls = ""
    store.subscribe(() => calls += "A")
    store.subscribe(() => calls += "B")
    store.subscribe(() => calls += "C")
    store.dispatch(simpleAction)
    store.dispatch(simpleAction)
    store.dispatch(simpleAction)
    expect(calls).toEqual("ABCABCABC")
  })

  it('should be able to be unsubscribe', () => {
    const store = createStore(() => 42)
    let subscribeCalls = 0
    const unsubscribe = store.subscribe(() => subscribeCalls++)
    store.dispatch(simpleAction)
    store.dispatch(simpleAction)
    unsubscribe()
    store.dispatch(simpleAction)
    expect(subscribeCalls).toEqual(2)
  })

  it('should be able to define a middleware which will be called after every action dispatched', () => {
    let middlewareCalls = 0
    const middleware = store => next => action => middlewareCalls++
    const store = createStore(() => 42, applyMiddleware(middleware))
    expect(middlewareCalls).toEqual(0)

    store.dispatch(simpleAction)
    store.dispatch(simpleAction)
    store.dispatch(simpleAction)
    expect(middlewareCalls).toEqual(3)
  })

  it('should be able to define a preloaded/initial state and a middleware which will be called after every action dispatched', () => {
    let middlewareCalls = 0
    const middleware = store => next => action => middlewareCalls++
    const initialState = { library: 'redux' }

    const store = createStore(state => state, initialState, applyMiddleware(middleware))
    const state = store.getState()

    expect(state).toEqual(initialState)
    expect(middlewareCalls).toEqual(0)

    store.dispatch(simpleAction)
    store.dispatch(simpleAction)
    store.dispatch(simpleAction)

    expect(middlewareCalls).toEqual(3)
  })

})
