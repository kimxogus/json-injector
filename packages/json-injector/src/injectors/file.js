import glob from 'glob';
import path from 'path';
import { defaults } from 'lodash';

import { validateOptions, defaultOptions } from 'schema/injectors/file-options';

module.exports = options => file => {
  const valid = validateOptions(options);
  if (!valid) throw new Error(schema.errorsText());

  options = defaults(options || {}, defaultOptions);

  const { patterns, baseDir, verbose } = options;

  if (verbose) {
    console.log(
      `fileInjector: options are ${JSON.stringify(options, null, 2)}`
    );
  }

  const jsonFile = patterns
    .map(pattern => {
      const p = file ? pattern.replace('{file}', path.basename(file)) : pattern;
      if (verbose) {
        console.log(`fileInjector: search for files with pattern ${p}`);
      }
      return glob.sync(p, {
        cwd: baseDir,
      });
    })
    .map(jsonFiles => {
      if (verbose) {
        console.log(`fileInjector: json files are ${jsonFiles.join(', ')}`);
      }
      return jsonFiles
        .map(f => require(path.resolve(baseDir, f)))
        .reduce((a, b) => Object.assign(a, b), {});
    })
    .reduce((a, b) => Object.assign(a, b), {});

  if (verbose) {
    console.log(`fileInjector: result is ${JSON.stringify(jsonFile, null, 2)}`);
  }

  return jsonFile;
};
