const inquirer = require('inquirer');
const chalk = require('chalk');

console.log(process.cwd());

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
        },
        {
            type: 'checkbox',
            name: 'dependencies',
            message: 'What 3rd libs do you want to use ?',
            when: (answers) => {
                return answers.framework === 'react';
            },
            choices: [
                {
                    name: 'react-obvious',
                    value: 1,
                    checked: true
                },
                {
                    name: 'redux and react-redux',
                    value: 2
                },
                {
                    name: 'react-router-dom',
                    value: 3
                },
                {
                    name: 'react-intl',
                    value: 4
                }
            ]
        },
        {
            type: 'confirm',
            name: 'external',
            message: 'Do you want to configure dependencies as external ?',
            default: true
        }
    ]).then((answers) => {
        console.log(answers);
    });
};

module.exports = init;
