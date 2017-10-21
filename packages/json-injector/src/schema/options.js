import schema from 'schema';
import {
  injectorsSchema,
  defaultOptions as defaultInjectorOptions,
} from './injectors';

export const defaultOptions = {
  rcFile: 'json-injector.config.js',
  files: null,
  suffix: 'template',
  injectors: defaultInjectorOptions,
  postInject: null,
  verbose: false,
  silent: false,
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
    silent: {
      type: 'boolean',
      default: defaultOptions.silent,
    },
    injectors: injectorsSchema,
    postInject: {
      default: defaultOptions.postInject,
    },
  },
  required: ['files'],
};

schema.addSchema(optionSchema, 'option');

export const validateOptions = options => schema.validate('option', options);
