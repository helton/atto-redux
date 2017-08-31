import { combineReducers } from '../src'

describe('combineReducers()', () => {
  it('should be able to combine reducers in a plain object', () => {
    const reducerA = (state = 'default', action) => state
    const reducerB = (state, action) => action.value
    const combination = combineReducers({ reducerA, reducerB })
    const result = combination(undefined, { type: 'DO_SOMETHING', value: 42 })
    expect(result).toEqual({ 
      reducerA: 'default',
      reducerB: 42
    })
  })
})
