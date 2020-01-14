const chalk = require('chalk');

module.exports = (hints) => {
    console.log(`\n${chalk.green('Hint:')}`);
    for (const hint of hints) {
        console.log('- ' + chalk.blue(hint));
    }
};
