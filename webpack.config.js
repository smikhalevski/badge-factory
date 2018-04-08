const fs = require('fs');
const webpack = require('webpack');

module.exports = {
  target: 'node',
  entry: './src/main/index.js',
  output: {
    path: './target/out',
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  node: {
    __dirname: false
  },
  plugins: [
    new webpack.DefinePlugin({DEBUG: false})
  ],
  externals: fs.readdirSync('node_modules'),
  module: {
    rules: [
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
      {test: /\.json$/, loader: 'hson-loader'}
    ]
  }
};
