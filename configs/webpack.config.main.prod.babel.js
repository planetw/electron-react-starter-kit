import webpack from 'webpack'
import merge from 'webpack-merge'
import path from 'path'

import baseConfig from './webpack.config.base'
import { NODE_ENV, rootPath, appPath } from './utils'

export default merge.smart(baseConfig, {
  devtool: 'source-map',
  mode: 'production',
  entry: path.join(appPath, 'main.dev.js'),
  target: 'electron-main',
  output: {
    path: appPath,
    filename: 'main.prod.js',
    libraryTarget: 'commonjs2',
  },
  externals: [{
    'electron-debug': 'electron-debug',
  }],
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV', 'OWNER', 'DEBUG_PROD']),
  ],
  node: {
    __dirname: false,
    __filename: false
  }
})
