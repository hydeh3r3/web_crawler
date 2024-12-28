function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const aElements = dom.window.document.querySelectorAll('a')
    for (const aElement of aElements) {
        if (aElement.href.slice(0, 1) === '/') {
            urls.push(`${baseURL}${aElement.href}`)
        } else {
            urls.push(aElement.href)
        }
    }
    return urls
}

function normalizeUrl(urlString) {
  const urlObj = new URL(urlString);
  const hostpath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostpath.length > 0 && hostpath.slice(-1) === '/') {
    return hostpath.slice(0, -1);
  }
  return hostpath;
}

module.exports = { normalizeUrl };
 