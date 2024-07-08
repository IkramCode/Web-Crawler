const { normalizeURL } = require ('./crawl.js')
const { test , expect} = require('@jest/globals')

test('normalizeURL strip protocol' , () => {
  const input = 'https://blog.boot.dev/path'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL strip /' , () => {
  const input = 'https://blog.boot.dev/path/'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL capitals' , () => {
  const input = 'http://Blog.boot.dev/path'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL strip https' , () => {
  const input = 'http://Blog.boot.dev/path'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})
