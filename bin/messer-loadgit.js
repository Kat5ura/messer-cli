#!/usr/bin/env node

var program = require('commander');
var chalk = require('chalk');
var question = require('inquirer');
var loadFromGit = require('download-git-repo');

var path = require('path');
var fs = require('fs');

program
    .usage('<url> [dir]')
    .arguments('<url> [dir]')
    .action(function(url, dir) {
        console.log();
        if (dir) {
            console.log('  Loading repo into ' + dir);
            if (!fs.existsSync(dir))
                fs.mkdirSync(dir)
            loadRepo(url, path.resolve(process.cwd(), dir));
        } else {
            console.log(chalk.gray('# You need to specify a dir to hold the repo.'));
            console.log();
            question.prompt([{
                type: 'confirm',
                name: 'current',
                message: 'Do you want to load at current dir?',
                default: true
            }]).then(function(answers) {
                if (answers.current) {
                    loadRepo(url, path.resolve(process.cwd()));
                } else {
                    question.prompt([{
                        type: 'input',
                        name: 'name',
                        message: 'Please enter your dir name.',
                        default: 'repo'
                    }]).then(function(answers) {
                        var folder = answers.name;
                        if (!fs.existsSync(folder))
                            fs.mkdirSync(folder);
                        console.log();
                        console.log('  Loading repo into ' + folder);
                        loadRepo(url, path.resolve(process.cwd(), folder));
                    });
                }
            });
        }
    })
    .on('--help', function() {
        console.log('');
        console.log('  Examples:');
        console.log();
        console.log(chalk.gray('    # Load sth. from a git repo'));
        console.log('    $ test load url');
    });

function help() {
    program.parse(process.argv);
    if (program.args.length < 1) return program.help();
}

help();

function loadRepo(url, dir) {
    loadFromGit(url, dir, function(err) {
        console.log();
        if (err) {
            console.log(chalk.red('  ' + err.message))
        } else {
            console.log(chalk.green('  Done!'))
        }
    });
}