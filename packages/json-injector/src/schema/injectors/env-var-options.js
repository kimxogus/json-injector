import { isFunction } from 'lodash';

import schema from 'schema';

export const defaultOptions = () => process.env;

export const envVarOptionSchema = {
  typeof: ['object', 'function'],
  default: defaultOptions,
};

schema.addSchema(envVarOptionSchema, 'env-var-options');

export const validateOptions = options =>
  schema.validate('env-var-options', options);
