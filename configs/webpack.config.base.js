import webpack from 'webpack'
import path from 'path'

import { NODE_ENV, appPath } from './utils'

export default {
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
    modules: [path.resolve(appPath), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin()
  ]
}
