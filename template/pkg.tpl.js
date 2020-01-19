const template = {
    name: '',
    version: '1.0.0',
    scripts: {
        start: 'webpack-dev-server',
        build: 'webpack env.production',
        test: 'jest'
    },
    devDependencies: {
    },
    dependencies: {
    }
};

module.exports = ({name}) => {
    template.name = name;
    return JSON.stringify(template, null, 4);
};
