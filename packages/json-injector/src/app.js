import path from 'path';
import fs from 'fs-extra';
import { has, pick, assign, isEqual, isNil, pickBy, set, get } from 'lodash';
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
      pickBy(
        inputOptions,
        v => !isNil(v) && (Array.isArray(v) ? v.length : true)
      )
    );
  }

  const {
    files,
    suffix,
    rcFile,
    verbose,
    injectors,
    silent,
    postInject,
  } = options;

  if (verbose && !silent) {
    if (rcFileExists) {
      console.log('Using config file', rcFilePath);
    } else {
      console.log('Not using config file.');
    }
  }

  if (!validateOptions(options)) throw new Error(schema.errorsText());

  if (verbose && !silent) {
    console.log('Options:', options);
  }

  files.forEach(file => {
    const templateFileName = `${file}.${suffix}`;
    const templateFilePath = path.resolve(cwd, templateFileName);
    if (extensions.every(e => !fs.existsSync(`${templateFilePath}.${e}`))) {
      if (!silent) {
        console.log('cannot find', templateFilePath);
      }
      return;
    }
    if (!silent) {
      console.log('processing', templateFilePath);
    }
    const template = require(templateFilePath);

    let injected = injectEnv(template, {
      defaultValue: '',
      env: injectors.reduce((a, b) => Object.assign(a, b()), {}),
    });

    if (postInject) {
      if (verbose && !silent) {
        console.log('inject postprocessing...');
      }

      injected = Object.keys(postInject).reduce((postProcessed, key) => {
        if (key && has(postProcessed, key)) {
          set(postProcessed, key, postInject[key](get(postProcessed, key)));
        }
        return postProcessed;
      }, injected);
    }

    if (verbose && !silent) {
      console.log('injected', templateFileName);
      console.log(injected);
    }

    fs.writeJSONSync(path.resolve(cwd, `${file}.json`), injected, {
      spaces: 2,
    });
  });
};

module.exports = jsonInjector;
