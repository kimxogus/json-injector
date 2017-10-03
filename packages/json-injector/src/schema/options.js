import schema from 'schema';
import { defaultOptions as defaultInjectorOptions } from './injectors';

export const defaultOptions = {
  rcFile: 'json-injector.config.js',
  files: null,
  suffix: 'template',
  injectors: defaultInjectorOptions,
  verbose: false,
};

export const optionSchema = {
  properties: {
    rcFile: {
      type: 'string',
      default: defaultOptions.rcFile,
    },
    files: {
      type: 'array',
      minItems: 1,
      items: { type: 'string' },
    },
    suffix: {
      type: 'string',
      default: defaultOptions.suffix,
    },
    verbose: {
      type: 'boolean',
      default: defaultOptions.verbose,
    },
  },
  required: ['files'],
};

schema.addSchema(optionSchema, 'option');

export const validateOptions = options => schema.validate('option', options);
