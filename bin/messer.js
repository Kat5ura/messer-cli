#!/usr/bin/env node

var package = require('../package.json');
var program = require('commander');

program
    .version(package.version)
    .usage('<cmd> [options]')
    .command('exec <str>', 'exec your command')
    .command('loadgit <url> [dir]', 'load sth from github repo')
    .parse(process.argv);