import webpack from 'webpack'
import path from 'path'
import merge from 'webpack-merge'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import baseConfig from './webpack.config.base'
import { NODE_ENV, OWNER, appPath, distPath, port } from './utils'

export default merge.smart(baseConfig, {
  devtool: 'source-map',
  mode: 'production',
  target: 'electron-renderer',
  entry: appPath,
  output: {
    path: distPath,
    filename: 'renderer.prod.js',
    publicPath: './',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                postcssPresetEnv(),
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new HtmlWebpackPlugin({
      title: OWNER,
      template: path.join(appPath, 'index.html'),
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV', 'OWNER', 'DEBUG_PROD']),
  ],
})
