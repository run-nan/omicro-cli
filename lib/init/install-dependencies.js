const child_procss = require('child_process'); // eslint-disable-line
const chalk = require('chalk');

const installDependencies = ({framework}) => {
    const basicDependencies = [
        '@runnan/obvious',
        'tslib'
    ];

    const basicDevDependencies = [
        'webpack',
        'webpack-cli',
        'webpack-dev-server',
        'typescript',
        'awesome-typescript-loader',
        'less',
        'less-loader',
        'css-loader',
        'style-loader',
        'postcss-loader',
        'autoprefixer',
        'eslint-loader',
        'url-loader',
        'file-loader',
        'html-webpack-plugin',
        'mini-css-extract-plugin',
        'jest',
        'ts-jest',
        'eslint',
        'eslint-config-google',
        '@typescript-eslint/eslint-plugin',
        '@typescript-eslint/parser',
        '@types/jest'
    ];

    const reactDependencies = basicDependencies.concat([
        'react',
        'react-dom',
        '@runnan/react-obvious'
    ]);

    const reactDevDependencies = basicDevDependencies.concat([
        'eslint-plugin-react',
        'eslint-plugin-react-hooks',
        '@types/react',
        '@types/react-dom'
    ]);

    const isReactService = framework === 'react';

    let dependencies = null;
    let devDependencies = null;
    if (isReactService) {
        dependencies = reactDependencies.join(' ');
        devDependencies = reactDevDependencies.join(' ');
    } else {
        dependencies = basicDependencies.join(' ');
        devDependencies = reactDevDependencies.join(' ');
    }

    console.log(chalk.yellow('install dependencies'));
    child_procss.execSync(`npm install ${dependencies}`, {
        stdio: 'inherit'
    });

    child_procss.execSync(`npm install -D ${devDependencies}`, {
        stdio: 'inherit'
    });
};

module.exports = installDependencies;
