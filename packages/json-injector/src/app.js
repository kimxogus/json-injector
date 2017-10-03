import path from 'path';
import fs from 'fs-extra';
import { has, pick, assign, isEqual } from 'lodash';

import schema from 'schema';
import { validateOptions, defaultOptions, optionSchema } from 'schema/options';

export default (inputOptions = {}) => {
  let options = assign(defaultOptions, inputOptions);

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

  if (options.verbose) console.log(rcFileExists);
  if (rcFileExists) {
    const optionKeys = Object.keys(optionSchema.properties);
    options = assign(
      options,
      pick(require(rcFilePath), optionKeys),
      pick(inputOptions, optionKeys)
    );
  }

  const { files, suffix, rcFile, verbose } = options;

  if (verbose) {
    if (rcFileExists) {
      console.log('Using config file', rcFilePath);
    } else {
      console.log('Not using config file.');
    }
  }

  if (!validateOptions(options)) throw new Error(schema.errorsText());

  if (verbose) console.log('Options:', options);
};
