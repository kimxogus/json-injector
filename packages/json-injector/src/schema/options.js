import schema from 'schema';
import { injectorsSchema as defaultInjectorOptions } from './injectors';

export const defaultOptions = {
  rcFile: 'json-inject.config.js',
  files: null,
  suffix: 'template',
  injectors: defaultInjectorOptions,
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
      default: defaultOptions.files,
    },
    suffix: {
      type: 'string',
      default: defaultOptions.suffix,
    },
  },
  required: ['files'],
};

schema.addSchema(optionSchema, 'option');

export const validateOptions = options => schema.validate('option', options);
