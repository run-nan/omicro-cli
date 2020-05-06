const template = {
    name: '',
    version: '',
    scripts: {
        start: 'webpack-dev-server',
        build: 'webpack --env.production',
        test: 'jest'
    },
    devDependencies: {
    },
    dependencies: {
    }
};

module.exports = ({name, version}) => {
    template.name = name;
    template.version = version;
    return JSON.stringify(template, null, 4);
};
