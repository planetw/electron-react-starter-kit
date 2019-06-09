import webpack from 'webpack'
import path from 'path'
import merge from 'webpack-merge'
import { spawn } from 'child_process'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import baseConfig from './webpack.config.base'
import { NODE_ENV, OWNER, appPath, distPath, port } from './utils'

export default merge.smart(baseConfig, {
  devtool: 'inline-source-map',
  mode: 'development',
  target: 'electron-renderer',
  devServer: {
    port,
    contentBase: distPath,
    publicPath: `http://localhost:${port}/dist/`,
    headers: { 'Access-Control-Allow-Origin': '*' },
    compress: true,
    hot: true,
    inline: true,
    historyApiFallback: {
      verbose: true,
      disableDotRule: false
    },
    before() {
      if (process.env.START_HOT) {
        console.log('Starting Main Process...');
        spawn('yarn', ['main:dev'], {
          shell: true,
          env: process.env,
          stdio: 'inherit'
        })
          .on('close', code => process.exit(code))
          .on('error', spawnError => console.error(spawnError));
      }
    }
  },
  entry: appPath,
  output: {
    path: distPath,
    filename: 'renderer.dev.js',
    libraryTarget: 'var',
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
                postcssPresetEnv({
                  autoprefixer: {
                    browsers: ['> 1%'],
                  },
                }),
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: OWNER,
      template: path.join(appPath, 'index.html'),
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV', 'OWNER', 'DEBUG_PROD']),
  ],
})
