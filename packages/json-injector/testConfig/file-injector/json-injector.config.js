const path = require('path');
const fileInjector = require('../../lib/injectors/file');

// test config

module.exports = {
  files: ['test', path.resolve(__dirname, 'test2')],
  injectors: [
    fileInjector({
      patterns: [path.resolve(__dirname, '{file}.base.json')],
    }),
  ],
};
