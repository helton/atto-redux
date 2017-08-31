const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)), x => x)

export default compose
