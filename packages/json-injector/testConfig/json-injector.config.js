const envVarInjector = require('../lib/injectors/env-var');

// test config

module.exports = {
  files: ['test'],
  injectors: [envVarInjector({ TEST_VAR: 'testVar', HOME: 'home' })],
  postInject: {
    number: v => +v,
    'a.b[0]': v => console.log(v),
  },
};
