const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');


// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.


module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      database: './src/js/database.js',
      index: './src/js/index.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',  
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html', // path
        filename: 'index.html',
        // chunks: ['main'],
      }),
      new WebpackPwaManifest({
        name: 'Writer',
        short_name: 'App',
        description: 'A simple note taking app',
        background_color: '#ffffff',
        theme_color: '#000000',
        start_url: '/', 
        publicPath: '/',
        icons: [
          {
            src: path.resolve('./src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
 }),
      new InjectManifest({
        swSrc: './src-sw.js', // Path to your service worker file
        swDest: './service-worker.js', // Output service worker file
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  };
};