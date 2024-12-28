# Web Crawler

A Node.js web crawler that maps internal links on websites and generates a report of page visits.

## Features

- Crawls websites starting from a base URL
- Handles both relative and absolute URLs
- Normalizes URLs (removes protocols, trailing slashes)
- Generates a sorted report of page visits
- Stays within the same domain as the base URL

## Installation

1. Clone the repository
2. Install dependencies:
```

## Usage

Run the crawler with a target website:
```

The crawler will output a report showing how many times each page was linked to within the site.

## Testing

Run the test suite:
```

## Project Structure

- `main.js` - Entry point and CLI handling
- `crawl.js` - Core crawling functionality
- `report.js` - Report generation utilities
- `*.test.js` - Jest test files

## Dependencies

- Node.js
- JSDOM - For HTML parsing
- Jest - For testing

## Error Handling

The crawler handles several error cases:
- Invalid URLs
- Non-HTML responses
- Network errors
- HTTP status errors (4xx, 5xx)

## License

ISC