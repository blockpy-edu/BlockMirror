const config = {
    entry: ['./src/blockmirror.js'],
    output: {
      path: __dirname + '/dist',
      filename: 'blockmirror.js'
    },
    module: {
      loaders: [
        {
          loader:'babel-loader',
          test: /\.js$/,
          exclude:  /node_modules/,
          query: {
             presets: ['es2015'] 
          }
        }
      ]
    },
    resolve: {
      extensions: ['.js']
    },
    devServer:{
      port: 3000,
      contentBase: __dirname + '/dist',
      inline: true
    }
}
module.exports = config;