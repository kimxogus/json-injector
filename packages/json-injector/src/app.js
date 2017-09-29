import path from 'path';
import fs from 'fs-extra';
import { defaults, has, pick, assign, isEqual } from 'lodash';

import schema from 'schema';
import { validateOptions, defaultOptions, optionSchema } from 'schema/options';

export default (options = {}) => {
  options = defaults(options, defaultOptions);

  let cwd = process.cwd();
  let rcFilePath = null;
  let rcFileExists = false;
  while (
    !(rcFileExists = fs.existsSync(
      (rcFilePath = path.resolve(cwd, options.rcFile))
    ))
  ) {
    cwd = path.resolve(cwd, '..');
    const { root, dir } = path.parse(cwd);
    if (root === dir) {
      break;
    }
  }

  if (rcFileExists) {
    options = assign(
      pick(require(rcFilePath), Object.keys(optionSchema.properties)),
      Object.keys(options).reduce((a, b) => {
        if (!isEqual(defaultOptions[b], options[b])) {
          a[b] = options[b];
        }
        return a;
      }, {})
    );
  }

  const { files, suffix, rcFile, verbose } = options;

  if (verbose) {
    if (rcFileExists) {
      console.log('Using config file', rcFilePath);
    } else {
      console.log('Not using config file.');
    }
    console.log('Options:', options);
  }

  if (!validateOptions(options)) throw new Error(schema.errorsText());
};
