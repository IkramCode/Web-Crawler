const { JSDOM } = require("jsdom");

async function crawlPages(baseURL, getCurrUrl, pages) {
  const baseURLObj = new URL(baseURL);
  const getCurrUrlObj = new URL(getCurrUrl);
  if (baseURLObj.hostname !== getCurrUrlObj.hostname) {
    return pages;
  }

  const normalizedgetCurrURL = normalizeURL(getCurrUrl);
  if (pages[normalizedgetCurrURL] > 0) {
    pages[normalizedgetCurrURL]++;
    return pages;
  }

  pages[normalizedgetCurrURL] = 1;

  console.log(`actively crawling :${getCurrUrl}`);

  try {
    const res = await fetch(getCurrUrl);

    if (res.status > 399) {
      console.log(`error in fetch code ${res.status} on page ${getCurrUrl}`);
      return pages;
    }

    const contentType = res.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(
        `non html response , contentType : ${contentType} , on page : ${getCurrUrl}`
      );
      return pages;
    }

    const htmlBody = await res.text();

    const nextURLs = getURLsFromHTML(htmlBody, baseURL);

    for (const nextURL of nextURLs) {
      pages = await crawlPages(baseURL, nextURL, pages);
    }
  } catch (error) {
    console.log(`Bad URL at ${getCurrUrl} , error at ${error.message}`);
  }
  return pages
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");

  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === "/") {
      try {
        const urlObj = new URL(`${baseURL}${linkElement.href}`);
        urls.push(urlObj.href);
      } catch (error) {
        console.log("Error in relative URLs", error.message);
      }
    } else {
      try {
        const urlObj = new URL(linkElement.href);
        urls.push(urlObj.href);
      } catch (error) {
        console.log("Error in absolute URLs", error.message);
      }
    }
  }

  return urls;
}

function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const hostName = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostName.length > 0 && hostName.slice(-1) === "/") {
    return hostName.slice(0, -1);
  }
  return hostName;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPages,
};
