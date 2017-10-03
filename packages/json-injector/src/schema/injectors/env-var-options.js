import schema from 'schema';

export const defaultOptions = {};

export const optionSchema = {
  patternProperties: {
    '^.*$': {
      anyOf: [{ type: 'string' }, { type: 'number' }],
    },
  },
  additionalProperties: false,
};

schema.addSchema(optionSchema, 'env-var-options');

export const validateOptions = options =>
  schema.validate('env-var-options', options);
