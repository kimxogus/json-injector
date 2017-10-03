import path from 'path';
import jsonInject from 'app';

describe('json-inject app', () => {
  it('requires files option', () => {
    expect(() => jsonInject()).toThrow();
  });

  it('requires rc file to exist', () => {
    jsonInject({ files: ['test'] });
  });

  it("doesn't require files option if rcFileExists", () => {
    jsonInject({
      rcFile: '__tests__/testConfig/json-injector.config.js',
      verbose: true,
    });
  });
});
