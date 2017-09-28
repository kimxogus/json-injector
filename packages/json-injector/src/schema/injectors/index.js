import schema from 'schema';
import EnvVarInjector from 'injectors/env-var';

import { envVarOptionSchema } from './env-var-options';

export const defaultOptions = [EnvVarInjector()];

export const injectorsSchema = {
  type: 'array',
  items: [envVarOptionSchema],
  default: defaultOptions,
};

schema.addSchema(injectorsSchema, 'injectors');

export const validateOptions = options => schema.validate('injectors', options);
