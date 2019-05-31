// const sum = require('./operator')
import {multifly, sum} from './operator'

test('adds 1 + 2 to equal 3 ', () => {
  expect(sum(1, 2)).toBe(3)
})

test('multifly 1 * 2 to equal 2', () => {
  expect(multifly(1, 2)).toBe(2)
})
