import lodash from 'lodash';

import { validateOptions } from 'schema/injectors/env-var-options';

export default options => () => {
  const valid = validateOptions(options);
  if (!valid) throw new Error(schema.errorsText());

  return lodash.pick(process.env, options.keys);
};
