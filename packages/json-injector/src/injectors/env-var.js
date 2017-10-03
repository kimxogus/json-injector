import { has, defaults } from 'lodash';

import {
  validateOptions,
  defaultOptions,
} from 'schema/injectors/env-var-options';

export default (options = defaultOptions) => () => {
  const valid = validateOptions(options);
  if (!valid) throw new Error(schema.errorsText());

  options = defaults(options || {}, defaultOptions);

  return Object.keys(options).reduce((a, b) => {
    a[options[b]] = process.env[b];
    return a;
  }, {});
};
