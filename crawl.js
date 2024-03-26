const { JSDOM } = require("jsdom");

function normalizeURL(path) {
  const parsed = new URL(path);
  const pathname = parsed.pathname;
  let normalized = `${parsed.hostname}${pathname}`;

  if (normalized.endsWith("/")) {
    normalized = normalized.slice(0, -1);
  }
  return normalized;
}

function concatenatePaths(head, tail) {
  if (head.endsWith("/") && tail.startsWith("/")) {
    return `${head.slice(0, -1)}${tail}`;
  }
  if (head.endsWith("/") || tail.startsWith("/")) {
    return `${head}${tail}`;
  }
  return `${head}/${tail}`;
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const aTags = dom.window.document.querySelectorAll("a");
  for (tag of aTags) {
    let href = tag.href;
    if (!href.includes(baseURL) && !href.includes('http')) {
      href = concatenatePaths(baseURL, href);
    }
    urls.push(href);
  }
  return urls;
}

async function crawlPage(baseURL, currentURL, pages) {
  // make sure we are still crawling the same domain
  if (!currentURL.includes(baseURL)) {
    return pages;
  }

  // get a normalized version of the currentURL
  const normalized = normalizeURL(currentURL);

  // check if pages contains the currentURL and add if not
  if (!pages[normalized]) {
    pages[normalized] = 1;
  } else {
    pages[normalized]++;
    return pages;
  }

  // make (first) request to currentURL
  // console.log(`Making request to ${currentURL}`);
  try {
    const response = await fetch(currentURL);
    if (!response.ok) {
      console.error(`Error fetching ${currentURL}: ${response.status}`);
      return;
    }
    const contentType = response.headers.get("Content-Type");
    if (!contentType || !contentType.includes("text/html")) {
      console.error("The page is not HTML: ", contentType);
      return;
    }
    // get all URLs from response text
    const body = await response.text();
    const urlsList = getURLsFromHTML(body, baseURL);

    // crawl each URL
    for (url of urlsList) {
      await crawlPage(baseURL, url, pages);
    }
  } catch (err) {
    throw err;
  }

  return pages;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  concatenatePaths,
  crawlPage,
};
