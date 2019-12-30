const { createDeepData, doManyTimes } = require('./buildData')

module.exports = () => ({
  label: 'deep-get',
  membranes: {
    pojo: require('./membranes/pojo')(),
    // simpleProxy: require('./membranes/simpleProxy')(),
    fastSymbol: require('./membranes/fastSymbol')(),
    fastWeakMap: require('./membranes/fastWeakMap')(),
    observable: require('./membranes/observable')(),
    cytoplasmTransparent: require('./membranes/cytoplasmTransparent')()
  },
  setup (membrane, count) {
    return doManyTimes(count, () => createDeepData(10000)).map(membrane.wrap)
  },
  run (runData) {
    let sum = ''
    for (let i = 0; i < runData.length; i++) {
      const entry = runData[i]
      sum += entry.a.b.c.label
    }
    return sum
  }
})
