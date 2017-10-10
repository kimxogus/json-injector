import path from 'path';

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
});
