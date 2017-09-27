#!/usr/bin/env node
import yargs from 'yargs';

const { _: files, suffix } = yargs.option('suffix', {
  alias: 's',
  default: `.template.json`,
}).argv;
