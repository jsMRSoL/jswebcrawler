const { test, expect } = require('@jest/globals')

const { normalizeURL } = require('../crawl.js')

const urls = [
    'https://blog.boot.dev/path/',
    'https://blog.boot.dev/path',
    'http://blog.boot.dev/path/',
    'http://blog.boot.dev/path'
]

const normalized = 'blog.boot.dev/path'

test('normalizes https with trailing slash', () => {
  expect(normalizeURL(urls[0])).toBe(normalized)
})

test('normalizes https without trailing slash', () => {
  expect(normalizeURL(urls[1])).toBe(normalized)
})

test('normalizes http with trailing slash', () => {
  expect(normalizeURL(urls[2])).toBe(normalized)
})

test('normalizes http without trailing slash', () => {
  expect(normalizeURL(urls[3])).toBe(normalized)
})

