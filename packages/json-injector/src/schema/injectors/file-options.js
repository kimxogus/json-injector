import schema from 'schema';

export const defaultOptions = {
  baseDir: process.cwd(),
  verbose: false,
};

export const optionSchema = {
  properties: {
    patterns: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'string',
      },
    },
    baseDir: {
      type: 'string',
      default: defaultOptions.baseDir,
    },
    verbose: {
      type: 'boolean',
      default: defaultOptions.verbose,
    },
  },
  required: ['patterns'],
};

schema.addSchema(optionSchema, 'file-options');

export const validateOptions = options =>
  schema.validate('file-options', options);
