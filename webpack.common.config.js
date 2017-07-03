const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = function (env) {
    return {
        entry: {
            'vendor': [
                './src/polyfills.ts',
                '@angular/platform-browser-dynamic',
                'bootstrap/dist/css/bootstrap.css'],
            'app': ['./src/main.ts', './src/styles.css'],
        },
        output: {
            path: env === 'production' ? __dirname + '/dist/build-prod' : __dirname + '/dist/build',
            filename: '[name].js'
        },
        resolve: {
            extensions: ['.ts', '.js']
        },
        devtool: 'cheap-module-source-map',
        performance: {
            hints: false
        },
        module: {
            rules: [
                {
                    test: /\.(css|html)$/,
                    use: 'raw-loader',
                    include: /src\/app/
                },
                {
                    test: /(styles|bootstrap)\.css$/,
                    use: ExtractTextPlugin.extract({
                        use: env === 'production' ? 'css-loader?minimize' : 'css-loader?sourceMap'
                    })
                },
                {
                    test: /\.(png|woff|woff2|eot|ttf|svg|gif|jpg)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'assets/[name].[ext]'
                            }
                        }
                    ]
                },
                {
                    test: /\.ts$/,
                    use: [
                        'awesome-typescript-loader',
                        'angular2-template-loader',
                        'angular-router-loader'
                    ]
                },
            ]
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: module => module.resource && module.resource.startsWith(__dirname + '/node_modules'),
                chunks: [
                    'app'
                ]
            }),
            env === 'production' ? new webpack.optimize.UglifyJsPlugin() : () => {},
            new ExtractTextPlugin({filename: '[name].css'}),
            new HtmlWebpackPlugin({
                template: './src/index.html',
                favicon: './src/favicon.ico'
            }),
            new webpack.DefinePlugin({
                ENV: JSON.stringify(env)
            }),
            new CleanWebpackPlugin(['dist'])
        ],
        devServer: {
            historyApiFallback: true
        }
    };
};
