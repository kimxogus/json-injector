import schema from 'schema';
import EnvVarInjector from 'injectors/env-var';

import { optionSchema as envVarInjectorOptionSchema } from './env-var-options';
import { optionSchema as fileInjectorOptionSchema } from './file-options';

export const defaultOptions = [EnvVarInjector()];

export const injectorsSchema = {
  type: 'array',
  items: [envVarInjectorOptionSchema, fileInjectorOptionSchema],
  default: defaultOptions,
};

schema.addSchema(injectorsSchema, 'injectors');

export const validateOptions = options => schema.validate('injectors', options);
