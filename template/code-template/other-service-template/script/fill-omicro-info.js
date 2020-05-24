const fs = require('fs');
const path = require('path');
const omicroConfig = require('../omicro.config.json');

const cssDir = path.join(__dirname, '../dist/css');
const jsDir = path.join(__dirname, '../dist/js');

if (!omicroConfig.assets) {
    omicroConfig.assets = {
        css: null,
        js: null
    };
}

const cssReg = /\.css$/;
const jsEntryReg = /^entry\..*\.js$/;
const jsReg = /\.js$/;

if (fs.existsSync(cssDir)) {
    const files = fs.readdirSync(cssDir);
    const cssFiles = files.filter((fileName) => {
        return cssReg.test(fileName);
    });
    omicroConfig.assets.css = cssFiles;
};

if (fs.existsSync(jsDir)) {
    const files = fs.readdirSync(jsDir);
    const entryJsFile = files.filter((fileName) => {
        return jsEntryReg.test(fileName);
    });
    const jsFiles = files.filter((fileName) => {
        return jsReg.test(fileName) && !jsEntryReg.test(fileName);
    });
    omicroConfig.assets.js = [...jsFiles, ...entryJsFile];
};

const omicroConfigPath = path.join(__dirname, '../omicro.config.json');
const omicroConfigContent = JSON.stringify(omicroConfig, null, 4);

fs.writeFileSync(omicroConfigPath, omicroConfigContent);
