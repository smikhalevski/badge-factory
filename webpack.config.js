const fs = require('fs');
const webpack = require('webpack');

const ASSET_TEST = /\.(jpg|png|gif|svg|ttf|woff)$/i;

module.exports = {
  target: 'node',
  entry: './src/main/server.js',
  output: {
    path: './target/out',
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  node: {
    __dirname: false
  },
  plugins: [
    new webpack.DefinePlugin({DEBUG: true})
  ],
  externals: fs.readdirSync('node_modules'),
  module: {
    rules: [
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
      {test: /\.json$/, loader: 'hson-loader'},
      {test: ASSET_TEST, loader: 'file-loader?name=assets/[hash:7].[ext]'}
    ]
  }
};
