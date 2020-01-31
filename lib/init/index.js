const inquirer = require('inquirer');
const chalk = require('chalk');
const copyTemplate = require('./copy-template');
const renderConfigFiles = require('./render-config-files');
const installDependencies = require('./install-dependencies');

const init = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What\'s the name of your front-end micro service ?',
            validate: (input) => {
                if (input === '') {
                    console.log(chalk.red('\n! service name can not be empty'));
                    return false;
                }
                return true;
            }
        },
        {
            type: 'list',
            name: 'framework',
            message: 'What framework do you want to use ?',
            choices: [
                'react',
                'others'
            ]
        }
    ]).then((answers) => {
        copyTemplate(answers);
        renderConfigFiles(answers);
        installDependencies(answers);
        console.log(chalk.blue(' -----------------------------------------'));
        console.log(chalk.blue('|  start your front-end micro service now |'));
        console.log(chalk.blue(' -----------------------------------------'));
    });
};

module.exports = init;
