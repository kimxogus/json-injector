import path from 'path';

import fileInjector from 'injectors/file';

describe('file-injector', () => {
  it('should inject json or js files', () => {
    const inject = fileInjector({
      patterns: ['config/*.json', 'config/*.js'],
      baseDir: path.resolve(__dirname, '..', '..', 'testConfig'),
    });

    inject();
  });
});
