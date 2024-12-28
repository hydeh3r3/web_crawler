const {JSDOM} = require('jsdom')

async function crawlPage(baseURL,currentURL,pages) {
    // Ensure baseURL has a protocol
    const baseURLString = baseURL.startsWith('http') ? baseURL : `https://${baseURL}`
    const baseURLObj = new URL(baseURLString)
    const currentURLObj = new URL(currentURL)
    if (baseURLObj.hostname !== currentURLObj.hostname) {
        return pages
    }

    const normalizedCurrentURL = normalizeUrl(currentURL)
    if (pages[normalizedCurrentURL] > 0) {
        pages[normalizedCurrentURL]++
        return pages
    }

    pages[normalizedCurrentURL] = 1

    console.log(`actively crawling: ${currentURL}`)

    try {
        const resp = await fetch(baseURLString)
        if (resp.status > 399) {
            console.log(`Error with request: ${resp.status} on page: ${baseURLString}`)
            return pages
        }
        const contentType = resp.headers.get('content-type')
        if (!contentType.includes('text/html')) {
            console.log(`non-html response: ${contentType} on page: ${baseURLString}`)
            return pages
        }
        const htmlBody = await resp.text()
        
        const nextURLs = getURLsFromHTML(htmlBody, baseURLString)
        for (const nextURL of nextURLs) {
            pages = await crawlPage(baseURLString, nextURL, pages)
        }
    } catch (err) {
        console.log(`Error in fetch: ${err.message}, on page: ${baseURLString}`)
    }
    return pages
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements) {
        if (linkElement.href.startsWith('/')) {
            // Handle relative URLs by combining with baseURL
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`Error with relative url: ${err.message}`)
            }
        } else {
            //absolute
            try {
                const urlObj = new URL(linkElement.href)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`Error with absolute url: ${err.message}`)
            }
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

module.exports = {
    normalizeUrl,
    getURLsFromHTML,
    crawlPage
};
 