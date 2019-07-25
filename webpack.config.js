const path = require('path');
const MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally');
const Uglify = require("uglify-js");

const config = {
    entry: [
        path.resolve(__dirname, 'src/main.js'),
    ],
    output: {
        path: __dirname + '/dist',
        filename: 'block_mirror.js',
        library: 'BlockMirror'
    },
    module: {
        rules: [
            /*{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            }*/
        ]
    },
    resolve: {
        extensions: ['.js']
    },
    plugins: [
        new MergeIntoSingleFilePlugin({
            files: {
                "block_mirror.js": [
                    path.resolve(__dirname, 'src/text_editor.js'),
                    path.resolve(__dirname, 'src/block_mirror.js'),
                ],
                "block_mirror.css": [
                    path.resolve(__dirname, 'src/block_mirror.css'),
                ]
            }
        })
    ]
    /*devServer: {
        port: 3000,
        contentBase: __dirname + '/dist',
        inline: true
    }*/
};
module.exports = config;