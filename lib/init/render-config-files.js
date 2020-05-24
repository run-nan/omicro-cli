const fs = require('fs');
const path = require('path');
const editorTpl = require('../../template/editorconfig.tpl');
const eslintTpl = require('../../template/eslint.tpl');
const jestTpl = require('../../template/jest.tpl');
const webpackTpl = require('../../template/webpack.tpl');
const tsconfigTpl = require('../../template/tsconfig.tpl');
const pkgTpl = require('../../template/pkg.tpl');
const omicroTpl = require('../../template/omicro.tpl');
const gitIgnoreTpl = require('../../template/gitignore.tpl');
const eslintignoreTpl = require('../../template/eslintignore.tpl');

/**
 * render content into a file
 * @param {string} target the target file you want to render
 * @param {string} content the file content
 * @returns {void}
 */
const render = (target, content) => {
    fs.writeFileSync(target, content);
};

/**
 * get the absolute path of target config file
 * @param {string} cwd
 * @param {string} fileName
 * @return {void}
 */
const getTarget = (cwd, fileName) => {
    return path.resolve(cwd, `./${fileName}`);
};

/**
 * render config files to cwd
 * @param {object} options
 * @param {string} cwd
 * @return {void}
 */
const renderConfigFiles = (options, cwd) => {
    // tpl means template
    const templates = {
        '.editorconfig': editorTpl,
        '.eslintrc.json': eslintTpl,
        '.eslintignore': eslintignoreTpl,
        'jest.config.js': jestTpl,
        'webpack.config.js': webpackTpl,
        'tsconfig.json': tsconfigTpl,
        'package.json': pkgTpl,
        'omicro.config.json': omicroTpl,
        '.gitignore': gitIgnoreTpl
    };

    Object.keys(templates).forEach((fileName) => {
        const template = templates[fileName];
        render(getTarget(cwd, fileName), template(options));
    });
};

module.exports = renderConfigFiles;

