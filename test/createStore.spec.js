import { createStore }  from '../src'

describe('createStore() should work properly', () => {
  it('should be able to create a store with an empty reducer', () => {
    const store = createStore(() => ({}))
    expect(store).not.toBe(null)
    
  })
})
