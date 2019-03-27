import path from 'path';
import fs from 'fs-extra';

import jsonInject from 'app';
import fileInjector from 'injectors/file';

const testConfigPath = path.resolve(__dirname, '..', '..', 'testConfig');

describe('file-injector', () => {
  it('requires patterns option', () => {
    expect(
      fileInjector({
        baseDir: testConfigPath,
      })
    ).toThrow();
  });

  it('should inject json or js files', () => {
    const inject = fileInjector({
      patterns: ['config/*.json', 'config/*.js'],
      baseDir: testConfigPath,
    });

    expect(inject()).toEqual(
      require(`${testConfigPath}/config/sampleCredential.json`)
    );
  });

  it("doesn't confuse different files", () => {
    jsonInject({
      files: [],
      rcFile: 'testConfig/file-injector/json-injector.config.js',
      verbose: true,
    });

    expect(fs.readJSONSync('testConfig/file-injector/test.json').key).toEqual(
      'value1'
    );

    expect(fs.readJSONSync('testConfig/file-injector/test2.json').key).toEqual(
      'value2'
    );
  });
});
