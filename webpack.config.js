const path = require('path');
const webpack = require ('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
    mode:'production',
    watch: true,
    entry: './src/index.js',
    output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    port: 8000,
    historyApiFallback: true,
    hot: true,
},
devtool: "source-map",

module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [['@babel/preset-env', {
              debug: true,
              corejs: 3,
              useBuiltIns: "usage"
          }],['airbnb']]
        }
      }
    },
    {
      test: /\.(css)$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
      ],
    },
  ]
},
plugins: [
  new webpack.ProgressPlugin(),
  new HtmlWebpackPlugin({ template: 'index.html' }),
  new MiniCssExtractPlugin({filename:'main.css'}),
  new FaviconsWebpackPlugin({
    logo: './src/favicon/favicon.png',
    manifest: './src/favicon/manifest.json'
  })
],
optimization: {
  minimize: true,
  minimizer: [
    new CssMinimizerPlugin(),
  ],
},
};