const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');


module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
       
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',  
      

    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html', // path
        title: 'JATE',
        // chunks: ['main'],
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Writer',
        short_name: 'App',
        description: 'A simple note taking app',
        background_color: '#ffffff',
        theme_color: '#000000',
        start_url: '/', 
        publicPath: '/',
        icons: [
          {
            src: path.resolve('./src/images/logo.png'), favicon: true,
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
 }),
      new InjectManifest({
        swSrc: './src-sw.js', // Path to your service worker file
        swDest: 'src-sw.js', // Output service worker file
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
        
      ],
    },
  };
};