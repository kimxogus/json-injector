import path from 'path';
import fs from 'fs-extra';
import { has, pick, assign, isEqual } from 'lodash';
import injectEnv from 'inject-env';

import schema from 'schema';
import { validateOptions, defaultOptions, optionSchema } from 'schema/options';

const extensions = ['js', 'json'];

const jsonInjector = (inputOptions = {}) => {
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
  if (fs.existsSync(rcFilePath)) {
    const { dir } = path.parse(rcFilePath);
    cwd = dir;
  } else {
    cwd = process.cwd();
  }

  if (rcFileExists) {
    const optionKeys = Object.keys(optionSchema.properties);
    options = assign(
      options,
      pick(require(rcFilePath), optionKeys),
      pick(inputOptions, optionKeys)
    );
  }

  const { files, suffix, rcFile, verbose, injectors } = options;

  if (verbose) {
    if (rcFileExists) {
      console.log('Using config file', rcFilePath);
    } else {
      console.log('Not using config file.');
    }
  }

  if (!validateOptions(options)) throw new Error(schema.errorsText());

  if (verbose) console.log('Options:', options);

  files.forEach(file => {
    const templateFileName = `${file}.${suffix}`;
    const templateFilePath = path.resolve(cwd, templateFileName);
    if (extensions.every(e => !fs.existsSync(`${templateFilePath}.${e}`))) {
      console.log('cannot find', templateFilePath);
      return;
    }
    console.log('processing', templateFilePath);
    const template = require(templateFilePath);

    const injected = injectEnv(
      template,
      injectors.reduce((a, b) => Object.assign(a, b()), {})
    );
    if (verbose) {
      console.log('injected', templateFileName);
      console.log(injected);
    }

    fs.writeJSONSync(path.resolve(cwd, `${file}.json`), injected, {
      spaces: 2,
    });
  });
};

export default jsonInjector;
