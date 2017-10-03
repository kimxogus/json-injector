import schema from 'schema';

export const defaultOptions = {
  patterns: ['*.json'],
  baseDir: process.cwd(),
};

export const optionSchema = {
  properties: {
    patterns: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'string',
      },
      default: defaultOptions.patterns,
    },
    baseDir: {
      type: 'string',
      default: defaultOptions.baseDir,
    },
  },
};

schema.addSchema(optionSchema, 'file-options');

export const validateOptions = options =>
  schema.validate('file-options', options);
