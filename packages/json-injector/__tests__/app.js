import jsonInject from 'app';

describe('json-inject app', () => {
  it('requires files option', () => {
    expect(() => jsonInject({ silent: true })).toThrow();
  });

  it('requires rc file to exist', () => {
    jsonInject({ files: ['test'], silent: true });
  });

  it("doesn't require files option if rcFileExists", () => {
    jsonInject({
      rcFile: 'testConfig/json-injector.config.js',
      silent: true,
    });
  });

  it("doesn't require files option if rcFileExists", () => {
    jsonInject({
      files: [],
      rcFile: 'testConfig/json-injector.config.js',
      silent: true,
    });
  });
});
