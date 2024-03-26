const { test, expect } = require('@jest/globals')

const { concatenatePaths } = require('../crawl.js')

const domains = [
    'blog.boot.dev/',
    'blog.boot.dev',
]

const paths = [
  '/path',
  'path'
]

const correctPath = 'blog.boot.dev/path'

test('correctly concatenates with trailing and leading slashes', () => {
  expect(concatenatePaths(domains[0], paths[0])).toEqual(correctPath)
})

test('correctly concatenates without trailing and leading slashes', () => {
  expect(concatenatePaths(domains[1], paths[1])).toEqual(correctPath)
})

test('correctly concatenates with trailing slash but no leading slash', () => {
  expect(concatenatePaths(domains[0], paths[1])).toEqual(correctPath)
})

test('correctly concatenates with no trailing slash but a leading slash', () => {
  expect(concatenatePaths(domains[1], paths[0])).toEqual(correctPath)
})
