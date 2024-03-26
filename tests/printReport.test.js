const { test, expect } = require('@jest/globals')

const { sortPages } = require('../report.js')

const pages = {
  'www.google.com': 1,
  'www.yahoo.com': 2,
  'www.altavista.com': 3,
  'www.bing.com': 4,
}

const sorted = [
  [ 'www.bing.com', 4 ],
  [ 'www.altavista.com', 3 ],
  [ 'www.yahoo.com', 2 ],
  [ 'www.google.com', 1 ],
]

test('returns object as an array sorted by values', () => {
  expect(sortPages(pages)).toEqual(sorted)
})
