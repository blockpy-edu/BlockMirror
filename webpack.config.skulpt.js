const path = require('path');
const MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally');
const Uglify = require("uglify-js");
const babel = require("@babel/core");

// Skulpt
const JS_SKULPT_FILES = [
    path.resolve(__dirname, 'src/skulpt/skulpt_shim.js'),
    path.resolve(__dirname, 'src/skulpt/astnodes.js'),
    /*path.resolve(__dirname, 'src/skulpt/skulpt_shim.js'),
    path.resolve(__dirname, 'src/skulpt/skulpt_shim.js'),
    path.resolve(__dirname, 'src/skulpt/skulpt_shim.js'),
    path.resolve(__dirname, 'src/skulpt/skulpt_shim.js'),*/
];

const config = {
    entry: [
        path.resolve(__dirname, 'src/skulpt/skulpt_shim.js'),
    ],
    output: {
        path: __dirname + '/dist',
        filename: 'skulpt_parser.js',
        library: 'Skulpt'
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                loader: "babel-loader",
                exclude: /(node_modules|bower_components)/
            },
        ]
    },
    resolve: {
        extensions: ['.js']
    },
    plugins: [
        new MergeIntoSingleFilePlugin({
            files: {
                "block_mirror.js": JS_SKULPT_FILES,
                "block_mirror.css": [
                    /*path.resolve(__dirname, 'lib/codemirror/codemirror.css'),
                    path.resolve(__dirname, 'lib/codemirror/fullscreen.css'),
                    path.resolve(__dirname, 'lib/codemirror/show-hint.css'),*/
                    path.resolve(__dirname, 'src/block_mirror.css'),
                ]
            },
            transform: {
                "block_mirror.js": code =>
                    babel.transform(code, {
                        presets: ["@babel/preset-env"]
                    }).code
            }
        })
    ]
};
module.exports = config;
