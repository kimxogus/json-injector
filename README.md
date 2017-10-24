# json-injector
> Inject variables from environment variables or js/json files to json

## Packages
| Name | Version | Downloads |
| --- | --- | --- |
| [json-injector](https://npmjs/packages/json-injector) | [![NPM version][json-injector-npm-image]][json-injector-npm-url] | [![NPM Downloads][json-injector-downloads-image]][json-injector-npm-url] |
| [json-injector-cli](https://npmjs/packages/json-injector-cli) | [![NPM version][json-injector-cli-npm-image]][json-injector-cli-npm-url] | [![NPM Downloads][json-injector-cli-downloads-image]][json-injector-cli-npm-url] |

## install
- npm
```bash
$ npm install json-injector
```
- yarn
```bash
$ yarn add json-injector
```

## How to use
#### 1. Write template file(`js` or `json`)
- Example: [test.template.js](packages/json-injector/testConfig/test.template.js)
```js
module.exports = {
  testVar: '${testVar:-defaultValue}',
  home: '${home}',
  number: '123',
  a: {
    b: [0],
  },
};
```
- You can write bash syntax to inject variables with [inject-env](https://github.com/kimxogus/inject-env).

#### 2. Call `json-injector` API with injectors
1) Passing options to jsonInjector
```js
import jsonInjector from 'json-injector'
import envVarInjector from 'json-injector/lib/injectors/env-var'

jsonInjector({
  files: ['test'],
  injectors: [envVarInjector({ TEST_VAR: 'testVar', HOME: 'home' })],
  postInject: {
    number: v => +v,
    'a.b[0]': v => console.log(v),
  },
});
```
2) Save options in config file.
  - Example: [json-injector.config.js](packages/json-injector/testConfig/json-injector.config.js)
```js
const envVarInjector = require('json-injector/lib/injectors/env-var');

// test config
module.exports = {
  files: ['test'],      // files to be injected
  injectors: [          // injectors to be used
    envVarInjector({ TEST_VAR: 'testVar', HOME: 'home' })
  ],
  postInject: {         // post-inject action to each variable
    number: v => +v,
    'a.b[0]': v => console.log(v) || v,
  },
};
```

- Injected json file will be saved as `test.json`
```json
{
  "testVar": "defaultValue",
  "home": "/Users/kimxogus",
  "number": 123,
  "a": {
    "b": [
      0
    ]
  }
}
```


## CLI App
Use [json-injector-cli](https://npmjs.org/packages/json-injector-cli)

## Injectors

### Environment Variable Injector
- Resolves environment variable to user-named variable in string.
```js
const envVarInjector = require('json-injector/lib/injectors/env-var');

envVarInjector({
  TEST_VAR:       // key: Environment Variable name.
    'testVar'     // value: Variable name to be injected in json.
});
```

### File Injector
- Reads `js` or `json` files and inject their variables.
```js
const fileInjector = require('json-injector/lib/injectors/file');

const testConfigPath = process.env.HOME + '/test';

fileInjector({
  baseDir: testConfigPath,                    // base directory
  patterns: ['config/*.json', 'config/*.js'], // file's patterns (relative to baseDir)
});
```

[json-injector-npm-image]: https://img.shields.io/npm/v/json-injector.svg?style=flat-square
[json-injector-npm-url]: https://www.npmjs.com/package/json-injector
[json-injector-downloads-image]: https://img.shields.io/npm/dm/json-injector.svg

[json-injector-cli-npm-image]: https://img.shields.io/npm/v/json-injector-cli.svg?style=flat-square
[json-injector-cli-npm-url]: https://www.npmjs.com/package/json-injector-cli
[json-injector-cli-downloads-image]: https://img.shields.io/npm/dm/json-injector-cli.svg