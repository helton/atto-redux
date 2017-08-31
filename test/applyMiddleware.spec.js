import { createStore, applyMiddleware } from '../src'

describe('applyMiddleware()', () => {
  it('should be able to apply a echo middleware without changing the default behaviour', () => {
    const echoMiddlware = store => next => action => next(action)
    const initialState = { value: 42 }
    const store = createStore(state => state, initialState, applyMiddleware(echoMiddlware))
    const state = store.getState()
    expect(state).toBe(initialState)
  })

  it('should be able to modify the action being passed to dispatch', () => {
    const middleware = store => next => action => next({ ...action, value: action.value + 100 })
    const store = createStore((state, action) => action, applyMiddleware(middleware))
    store.dispatch({ type: 'DO_SOMETHING', value: 42 })
    const { value } = store.getState()
    expect(value).toEqual(142)
  })
})