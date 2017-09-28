import path from 'path';
import fs from 'fs-extra';
import { defaults, has, pick, assign } from 'lodash';

import schema from 'schema';
import { validateOptions, defaultOptions, optionSchema } from 'schema/options';

export default (options = {}) => {
  options = defaults(options, defaultOptions);

  const { files, suffix, rcFile } = options;

  let cwd = process.cwd();
  let rcFilePath = null;
  let rcFileExists = false;
  console.log(path.resolve(cwd, rcFile));
  while (
    !(rcFileExists = fs.existsSync((rcFilePath = path.resolve(cwd, rcFile))))
  ) {
    cwd = path.resolve(cwd, '..');
    const { root, dir } = path.parse(cwd);
    if (root === dir) {
      break;
    }
  }

  console.log(rcFileExists, rcFile);
  if (rcFileExists) {
    console.log(require(rcFilePath));
    options = assign(
      pick(require(rcFilePath), Object.keys(optionSchema)),
      options
    );
  }
  console.log(options);

  const valid = validateOptions(options);
  if (!valid) throw new Error(schema.errorsText());
};
