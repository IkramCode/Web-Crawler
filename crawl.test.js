const { normalizeURL, getURLsFromHTML } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeURL strip protocol", () => {
  const input = "https://blog.boot.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip /", () => {
  const input = "https://blog.boot.dev/path/";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL capitals", () => {
  const input = "http://Blog.boot.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip https", () => {
  const input = "http://Blog.boot.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML absolute", () => {
  const inputHtmlBody = `
  <html>
    <body>
        <a href="https://Blog.boot.dev/path/">Boot.dev Blog</a>
    </body>
  </html>
  `;
  const inputbaseURL = "https://blog.boot.dev/path/";
  const actual = getURLsFromHTML(inputHtmlBody, inputbaseURL);
  const expected = ["https://blog.boot.dev/path/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
  const inputHtmlBody = `
        <html>
            <body>
                <a href="/path/">Boot.dev Blog</a>
            </body>
        </html>
  `;
  const inputbaseURL = "https://blog.boot.dev";
  const actual = getURLsFromHTML(inputHtmlBody, inputbaseURL);
  const expected = ["https://blog.boot.dev/path/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML both", () => {
  const inputHtmlBody = `
        <html>
            <body>
                <a href="https://blog.boot.dev/path1/">Boot.dev Blog path one</a>
                <a href="/path2/">Boot.dev Blog path two</a>
            </body>
        </html>
  `;
  const inputbaseURL = "https://blog.boot.dev";
  const actual = getURLsFromHTML(inputHtmlBody, inputbaseURL);
  const expected = ["https://blog.boot.dev/path1/" , "https://blog.boot.dev/path2/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML invalid", () => {
    const inputHtmlBody = `
    <html>
      <body>
          <a href="invalid">Invalid URL</a>
      </body>
    </html>
    `;
    const inputbaseURL = "https://blog.boot.dev/path/";
    const actual = getURLsFromHTML(inputHtmlBody, inputbaseURL);
    const expected = [];
    expect(actual).toEqual(expected);
  });
