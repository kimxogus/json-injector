import Ajv from 'ajv';
import AjvKeywords from 'ajv-keywords';

const schema = new Ajv();
AjvKeywords(schema, ['typeof']);

module.exports = schema;
