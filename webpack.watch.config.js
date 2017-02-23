const fs = require('fs');
const webpack = require('webpack');

module.exports = {
  target: 'node',
  entry: [
    'webpack/hot/poll?1000',
    './src/main/server.js'
  ],
  output: {
    path: './target/out',
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  node: {
    __dirname: false
  },
  plugins: [
    new webpack.DefinePlugin({DEBUG: true}),
    new webpack.HotModuleReplacementPlugin,
    new webpack.NamedModulesPlugin
  ],
  externals: fs.readdirSync('node_modules'),
  module: {
    rules: [
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
      {test: /\.json$/, loader: 'hson-loader'}
    ]
  }
};
