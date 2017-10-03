#!/usr/bin/env node
import yargs from 'yargs';

import jsonInjector from 'json-injector';
import { defaultOptions } from 'schema/options';

const { _: files = defaultOptions.files, suffix, file } = yargs
  .option('file', { alias: 'f', default: defaultOptions.rcFile })
  .option('suffix', {
    alias: 's',
    default: defaultOptions.suffix,
  }).argv;

jsonInjector({ files, suffix, rcFile: file });
