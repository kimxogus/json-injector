#!/usr/bin/env node
import yargs from 'yargs';

import jsonInjector from 'json-injector';
import { defaultOptions } from 'json-injector/lib/schema/options';

const { _: files = defaultOptions.files, suffix, file, verbose } = yargs
  .option('file', {
    alias: 'f',
    default: defaultOptions.rcFile,
  })
  .option('suffix', {
    alias: 's',
    default: defaultOptions.suffix,
  })
  .option('verbose', {
    alias: 'v',
    default: defaultOptions.verbose,
  }).argv;

jsonInjector({ files, suffix, rcFile: file, verbose });