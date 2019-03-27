import { has, defaults } from 'lodash';

import {
  validateOptions,
  defaultOptions,
} from 'schema/injectors/env-var-options';

module.exports = (options = defaultOptions) => () => {
  const valid = validateOptions(options);
  if (!valid) throw new Error(schema.errorsText());

  options = defaults(options || {}, defaultOptions);

  return {
    env: Object.keys(options).reduce((a, b) => {
      a[options[b]] = process.env[b];
      return a;
    }, {}),
  };
};
