const path = require('path');
const fileInjector = require('../../lib/injectors/file');

// test config

module.exports = {
  files: ['test', 'test2'],
  injectors: [
    fileInjector({
      patterns: [path.resolve(__dirname, '{file}.base.json')],
      verbose: true,
    }),
  ],
};
