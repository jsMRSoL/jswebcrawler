const { test, expect } = require('@jest/globals')

const { getURLsFromHTML } = require('../crawl.js')

const testBody = `<html> <body>
        <a href="https://boot.dev">Go to Boot.dev</a>
        <a href="/api">api</a>
        <a href="/blog">Yahoo!</a>
    </body> </html>`


test('finds three URLs', () => {
  const list = getURLsFromHTML(testBody, 'boot.dev')
  expect(list.length).toBe(3)
})

test('constructs absolute URLs correctly', () => {
  const list = getURLsFromHTML(testBody, 'boot.dev')
  for (url of list) {
    expect(url).toMatch(/boot.dev/)
  }
})
