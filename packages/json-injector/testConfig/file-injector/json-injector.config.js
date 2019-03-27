const path = require('path');
const fileInjector = require('../../lib/injectors/file');

// test config

module.exports = {
  files: ['test'],
  injectors: [
    fileInjector({
      patterns: [path.resolve(__dirname, '*.json')],
      verbose: true,
    }),
  ],
};
