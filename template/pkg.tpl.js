const template = {
    name: '',
    version: '1.0.0',
    main: './src/index.js',
    scripts: {
        build: '',
        start: '',
        test: ''
    },
    devDependencies: {
    },
    dependencies: {
    }
};

module.exports = (name) => {
    template.name = name;
    return JSON.stringify(template);
};
