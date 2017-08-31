import { compose } from '../src'

describe('compose()', () => {
  it('compose two unary functions (right to left) should work properly', () => {
    const add10 = x => x + 10
    const mul3  = x => x * 3
    const mul3Add10 = compose(add10, mul3)
    expect(mul3Add10(4)).toEqual(22)
  })
})