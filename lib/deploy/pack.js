const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const chalk = require('chalk');

const pack = (configFilePath, callBack) => {
    const appName = require(configFilePath).name;

    const pkgPath = path.join(process.cwd(), `/${appName}.zip`);
    const output = fs.createWriteStream(pkgPath);
    output.on('close', function() {
        const message = `${appName}.zip has been packed, and the size is ${archive.pointer()} bytes`;
        console.log(chalk.green(message));
        callBack(appName, pkgPath);
    });

    const archive = archiver('zip', {
        zlib: {
            level: 9
        } // Sets the compression level.
    });
    archive.on('warning', function(err) {
        if (err.code === 'ENOENT') {
            console.log(chalk.red(err));
        } else {
            throw err;
        }
    });
    archive.on('error', function(err) {
        throw err;
    });
    archive.pipe(output);
    archive.file(configFilePath, {
        name: 'omicro.config.json'
    });
    archive.directory(path.join(process.cwd(), './dist'), false);
    archive.finalize();
};

module.exports = pack;
