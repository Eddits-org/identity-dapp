const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV || 'development';
const isProd = env === 'production';

const root = path.join(__dirname, '..');
const nodeModules = path.join(root, './node_modules');
const src = path.join(root, './src');
const dist = path.join(root, './www');

const plugins = [
  new webpack.DefinePlugin({
    ENV: JSON.stringify(env),
    LOG_LEVEL: JSON.stringify('debug')
  }),
  new HtmlWebpackPlugin({
    template: path.join(src, 'index.html'),
    inject: 'body',
    baseUrl: '/identity/',
    isProd
  })
];

const rules = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loaders: ['babel-loader', 'eslint-loader']
  },
  {
    test: /\.css$/,
    loaders: ['style-loader', 'css-loader']
  },
  {
    test: /\.(scss|sass)$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader'],
    exclude: /.*\.module.scss$/
  },
  {
    test: /\.(png|woff|woff2|eot|ttf|svg)$/,
    loader: 'url-loader?limit=50000'
  }
];

const alias = {
  containers: path.join(src, './containers'),
  components: path.join(src, './components'),
  reducers: path.join(src, './reducers'),
  actions: path.join(src, './actions'),
  assets: path.join(src, './assets'),
  config: path.join(src, './config.json'),
  services: path.join(src, './services'),
  utils: path.join(src, './utils')
};

module.exports = {
  mode: env,
  devtool: isProd ? 'cheap-module-source-map' : 'source-map',
  context: src,
  entry: {
    app: path.join(src, 'index.jsx')
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      src,
      nodeModules
    ],
    alias
  },
  output: {
    path: dist,
    filename: '[name].bundle.[hash].js',
    sourceMapFilename: '[name].bundle.[hash].map',
    chunkFilename: '[id].chunk.[hash].js'
  },
  module: {
    rules
  },
  plugins,
  devServer: {
    publicPath: '/identity',
    contentBase: isProd ? './www' : './src',
    historyApiFallback: {
      index: '/identity'
    },
    disableHostCheck: true,
    port: 3000,
    host: '0.0.0.0'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          minSize: 1
        }
      }
    }
  }
};
