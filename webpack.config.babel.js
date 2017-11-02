const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const LAUNCH_COMMAND = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = LAUNCH_COMMAND; // Enables react-hmre in .babelrc when not in non-prod mode

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'dist'),
};

const base = {
  entry: [
    PATHS.app,
  ],
  output: {
    path: PATHS.build,
    filename: 'index_bundle.js',
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]' },
    ],
  },
  resolve: {
    modules: [PATHS.app, 'node_modules'],
    extensions: ['.js', '.jsx'],
  },
};

const devConfig = {
  devtool: 'inline-cheap-module-source-map',
  devServer: {
    contentBase: PATHS.build,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html',
    }),
    new webpack.HotModuleReplacementPlugin([]),
  ],
};

const productionConfig = {
  devtool: 'cheap-module-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      minimize: true,
    }),
  ],
};

export default Object.assign(
  {},
  base,
  LAUNCH_COMMAND === 'production'
    ? productionConfig
    : devConfig,
);
