const fs = require('fs');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  target: 'node',
  entry: [
    'webpack/hot/poll?1000',
    './src/main/index.js'
  ],
  output: {
    path: './target/out',
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  node: {
    __dirname: false
  },
  plugins: [
    new webpack.DefinePlugin({DEBUG: true}),
    new webpack.HotModuleReplacementPlugin,
    new webpack.NamedModulesPlugin,
    new CopyWebpackPlugin([
      {from: './src/main/fonts', to: 'fonts'},
    ])
  ],
  externals: fs.readdirSync('node_modules'),
  module: {
    rules: [
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
      {test: /\.json$/, loader: 'hson-loader'}
    ]
  }
};
