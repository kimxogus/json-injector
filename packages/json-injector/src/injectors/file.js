import glob from 'glob';
import path from 'path';
import { defaults } from 'lodash';

import { validateOptions, defaultOptions } from 'schema/injectors/file-options';

export default options => () => {
  const valid = validateOptions(options);
  if (!valid) throw new Error(schema.errorsText());

  options = defaults(options || {}, defaultOptions);

  const { patterns, baseDir } = options;

  const jsonFile = patterns
    .map(pattern => glob.sync(pattern, { cwd: baseDir }))
    .map(jsonFiles =>
      jsonFiles
        .map(f => require(path.resolve(baseDir, f)))
        .reduce((a, b) => Object.assign(a, b), {})
    )
    .reduce((a, b) => Object.assign(a, b), {});

  return jsonFile;
};
