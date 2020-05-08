const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.js', '.css', '.jsx', '.ts', '.tsx'],
  },
  output: {
    filename: 'main.js',
    // publicPath: '/src',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          // {
          // loader: 'style-loader',
          // },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                  overrideBrowserslist: ['ie >= 8', 'last 4 version'],
                }),
                cssnano,
              ],
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.(png|jpe?g)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './',
              useRelativePath: true,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 70,
              },
            },
          },
        ],
      },
    ],
  },
  devServer: {
    stats: 'errors-only',
    contentBase: path.join(__dirname, 'src/public'),
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CopyWebpackPlugin([{ from: 'src/public/', to: 'public/' }]),
  ],
};
