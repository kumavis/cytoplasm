"use strict"

const { Membrane } = require('../src/index')
const createHandler = require('../src/distortions/readOnly')

const membrane = new Membrane()
const graphA = membrane.makeObjectGraph({ label: 'a', createHandler })
const graphB = membrane.makeObjectGraph({ label: 'b' })

const objA = {
  value: 1,
  set: (newValue) => {
    this.value = newValue
  }
}

const readOnlyA = membrane.bridge(objA, graphA, graphB)

try {
  readOnlyA.value = 2
  console.log(readOnlyA.value)
} catch (err) {
  console.log('*Correctly* encountered error while trying to update value:', err)
}


const classA = class A {
  value = 1
}

const ReadOnlyClassA = membrane.bridge(classA, graphA, graphB)
const a = new ReadOnlyClassA()

console.log('a.value', a.value)
a.value = 2
console.log('a.value', a.value)