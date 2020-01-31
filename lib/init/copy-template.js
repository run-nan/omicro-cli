const fs = require('fs');
const path = require('path');

/**
 * copy all the files and directories to target path
 * @param {string} src source path
 * @param {string} dist target path
 * @param {Function} callback error handler callback
 * @return {void}
 */
const copyDir = (src, dist, callback) => {
    const _copy = (err, src, dist) => {
        if (err) {
            callback(err);
        } else {
            fs.readdir(src, function(err, paths) {
                if (err) {
                    callback(err);
                } else {
                    paths.forEach(function(path) {
                        const _src = src + '/' + path;
                        const _dist = dist + '/' + path;
                        fs.stat(_src, function(err, stat) {
                            if (err) {
                                callback(err);
                            } else {
                                if (stat.isFile()) {
                                    fs.writeFileSync(_dist, fs.readFileSync(_src));
                                } else if (stat.isDirectory()) {
                                    copyDir(_src, _dist, callback);
                                }
                            }
                        });
                    });
                }
            });
        }
    };

    fs.access(dist, function(err) {
        if (err) {
            // if the target path is not existed, then mkdir
            fs.mkdirSync(dist);
        }
        _copy(null, src, dist);
    });
};

/**
 * copy code template to cwd
 * @param {object} config the config object
 * @return {void}
 */
const copyTemplate = ({framework}) => {
    const isReactService = framework === 'react';
    const dist = process.cwd();
    let src = null;
    if (isReactService) {
        src = path.join(__dirname, '../../template/code-template/react-service-template');
    } else {
        src = path.join(__dirname, '../../template/code-template/other-service-template');
    }
    copyDir(src, dist, (err) => {
        console.error('[omicro] ' + err);
        process.exit();
    });
};

module.exports = copyTemplate;
