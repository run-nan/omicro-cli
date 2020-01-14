module.exports = (name, isReactService) => {
    /* eslint-disable */
    return (
`const path = require('path');
const os = require('os');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack');

const NODE_MODULES_PATH = path.resolve(__dirname, './node_modules');

const config = (env = {}, argv) => {
    // 根据环境变量获取是生产环境还是开发环境
    const isEnvProduction = env.production || false;
    // 根据环境变量确定是否使用contentHash
    const hash = isEnvProduction ? '[contentHash:8]' : '[hash:8]';

    // 配置插件
    const plugins = [];

    const entry = {
        '${name}': path.resolve( __dirname, './src/index.${isReactService ? 'tsx' : 'ts'}')
    };

    if (isEnvProduction) {
        const cssPlugin = new MiniCssExtractPlugin({
            filename: 'assets/${name}/css/[name]' + hash + '.css',
        chunkFilename: 'assets/css/[name]Chunk.[id].css'
        });
        plugins.push(cssPlugin);
    } else {
        entry.mock = path.resolve( __dirname, './src/mock/platform-service.ts'); 
        const htmlPlugin = new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
            chunks: ['mock']
        });
        plugins.push(htmlPlugin);
    }

    return {
        mode: isEnvProduction? 'production' : 'development',
        entry,
        output: {
            path: path.resolve( __dirname, './release'),
            filename: 'js/[name].' + hash + '.js',
            publicPath: '/assets/' + ${name} + '/js'
        },
        devtool: 'source-map',
        resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js'],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: NODE_MODULES_PATH,
                    use: ['awesome-typescript-loader', 'eslint-loader']
                },
                {
                    test: /\.(css|less)$/,
                    use: [
                        isEnvProduction ? { loader: MiniCssExtractPlugin.loader } : 'style-loader',
                        'css-loader',
                        'less-loader'
                    ]
                },
                {
                    test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'assets/images/[name].[hash:8].[ext]'
                        }
                    }]
                }
            ]
        },
        plugins,
        devServer: {
            hot: true,
            inline: true,
            quiet: true,
            open: true
        }
    };
};`
    );
};

