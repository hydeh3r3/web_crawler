const { sortPages } = require("./report.js");
const { test, expect } = require("@jest/globals");

test('sortPages 2 pages', () => {
    const input = {
        'https://wagslane.dev/path': 3,
        'https://wagslane.dev': 5,
    }
    const actual = sortPages(input)
    const expected = [
        ['https://wagslane.dev', 5],
        ['https://wagslane.dev/path', 3]
    ]
    expect(actual).toEqual(expected)
})

test('sortPages 5 pages', () => {
    const input = {
        'https://wagslane.dev/path': 3,
        'https://wagslane.dev': 5,
        'https://wagslane.dev/path2': 10,
        'https://wagslane.dev/path3': 1,
        'https://wagslane.dev/path4': 2,
    }
    const actual = sortPages(input)
    const expected = [
        ['https://wagslane.dev/path2', 10],
        ['https://wagslane.dev', 5],
        ['https://wagslane.dev/path', 3],
        ['https://wagslane.dev/path4', 2],
        ['https://wagslane.dev/path3', 1]
    ]
    expect(actual).toEqual(expected)
})