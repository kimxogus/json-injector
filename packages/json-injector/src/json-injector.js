import { defaults, has } from 'lodash';

import schema from 'schema';
import { validateOptions, defaultOptions } from 'schema/options';

export default options => {
  const valid = validateOptions(options);
  if (!valid) throw new Error(schema.errorsText());

  options = defaults(options, defaultOptions);
  console.log(options);
};
