import { isPlainObject } from 'lodash';

import schema from 'schema';

export const defaultOptions = {};

export const envVarOptionSchema = {
  patternProperties: {
    '^.*$': {
      anyOf: [{ type: 'string' }, { type: 'number' }],
    },
  },
  additionalProperties: false,
};

schema.addSchema(envVarOptionSchema, 'env-var-options');

export const validateOptions = options =>
  schema.validate('env-var-options', options);
