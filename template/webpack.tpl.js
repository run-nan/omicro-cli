module.exports = ({name, version, framework}) => {
    const isReactService = framework === 'react';
    const appName = version ? `${name}@${version}` : name;
    /* eslint-disable */
    return (`\
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const NODE_MODULES_PATH = path.resolve(__dirname, './node_modules');

module.exports = (env = {}, argv) => {
    const isEnvProduction = env.production || false;
    const hash = isEnvProduction ? '[contentHash:8]' : '[hash:8]';

    const entry = {
        entry: path.resolve(__dirname, './src/index.${isReactService ? 'tsx' : 'ts'}')
    };

    const styleLoaders = (enableCssModule) => {
        return [
            isEnvProduction ? {loader: MiniCssExtractPlugin.loader} : 'style-loader',
            {
                loader: 'css-loader',
                options: {
                    modules: enableCssModule ? {
                        localIdentName: '[name]-[local]-[hash:base64:5]'
                    } : false
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    plugins: [
                        require('autoprefixer')
                    ]
                }
            },
            'less-loader'
        ];
    };

    const plugins = [
        new MiniCssExtractPlugin({
            filename: 'css/[name].' + hash + '.css',
            chunkFilename: 'css/[name]Chunk.[id].css'
        })
    ];

    if (!isEnvProduction) {
        entry.mock = path.resolve( __dirname, './mock/platform.ts');
        const htmlPlugin = new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './mock/index.html'),
            chunks: ['mock']
        });
        plugins.push(htmlPlugin);
    }

    return {
        mode: isEnvProduction? 'production' : 'development',
        entry,
        output: {
            path: path.resolve( __dirname, './dist'),
            filename: 'js/[name].' + hash + '.js',
            publicPath: '/feda/assets/${appName}/'
        },
        devtool: 'source-map',
        resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: NODE_MODULES_PATH,
                    use: ['awesome-typescript-loader', 'eslint-loader']
                },
                {
                    test: /.(css|less)$/,
                    exclude: NODE_MODULES_PATH,
                    use: styleLoaders(true)
                },
                {
                    test: /.(css|less)$/,
                    include: NODE_MODULES_PATH,
                    use: styleLoaders(false)
                },
                {
                    test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'images/[name].[hash:8].[ext]'
                        }
                    }]
                }
            ]
        },
        ${isReactService ? `externals: {
            'react': 'React',
            'react-dom': 'ReactDOM'
        },` : ''}
        plugins,
        devServer: {
            hot: true,
            inline: true,
            quiet: true,
            open: true,
            openPage: 'feda/assets/${appName}/index.html'
        }
    };
};
`
    );
};

