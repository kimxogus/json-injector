import { has } from 'lodash';

import { validateOptions } from 'schema/injectors/env-var-options';

export default options => () => {
  const valid = validateOptions(options);
  if (!valid) throw new Error(schema.errorsText());

  return Object.keys(options).reduce((a, b) => {
    a[options[b]] = process.env[b];
    return a;
  }, {});
};
