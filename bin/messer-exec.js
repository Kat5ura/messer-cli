#!/usr/bin/env node

var program = require('commander');
var chalk = require('chalk');



program
    .usage('<str>')
    .action(function(str) {
        console.log(chalk.yellow('exec ' + str));
    });


program.on('--help', function() {
    console.log('');
    console.log('  Examples:');
    console.log();
    console.log(chalk.gray('    # execute your command'));
    console.log('    $ test exec "shutdown now"');
});


function help() {
    program.parse(process.argv);
    if (program.args.length < 1) return program.help();
}

help();