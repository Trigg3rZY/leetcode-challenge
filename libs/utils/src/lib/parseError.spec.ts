import { parseError } from './parseError';

const fixtureStack = `TypeError: Error raised
at bar http://192.168.31.8:8000/c.js:2:9
at foo http://192.168.31.8:8000/b.js:4:15
at calc http://192.168.31.8:8000/a.js:4:3
at <anonymous>:1:11
at http://192.168.31.8:8000/a.js:22:3
`;

const fixtureFirefoxStack = `
bar@http://192.168.31.8:8000/c.js:2:9
foo@http://192.168.31.8:8000/b.js:4:15
calc@http://192.168.31.8:8000/a.js:4:3
<anonymous>:1:11
http://192.168.31.8:8000/a.js:22:3
`;

const expected = {
  message: 'Error raised',
  stack: [
    { line: 2, column: 9, filename: 'http://192.168.31.8:8000/c.js' },
    { line: 4, column: 15, filename: 'http://192.168.31.8:8000/b.js' },
    { line: 4, column: 3, filename: 'http://192.168.31.8:8000/a.js' },
    { line: 22, column: 3, filename: 'http://192.168.31.8:8000/a.js' },
  ],
};

describe('parseError specs:', () => {
  it('should parse Error in chrome', () => {
    const error = parseError({
      name: 'TypeError',
      message: 'Error raised',
      stack: fixtureStack,
    });
    expect(error).toEqual(expected);
  });

  it('should parse Error in firefox', () => {
    const error = parseError({
      name: 'TypeError',
      message: 'Error raised',
      stack: fixtureFirefoxStack,
    });
    expect(error).toEqual(expected);
  });
});
