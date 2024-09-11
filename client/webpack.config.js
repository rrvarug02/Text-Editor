const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    // Set mode to development
    mode: 'development',

    // Define entry points for the application
    entry: {
      main: './src/js/index.js',    // Main application entry point
      install: './src/js/install.js' // Service worker installation entry point
    },

    // Configure output settings
    output: {
      filename: '[name].bundle.js', // Output filename pattern
      path: path.resolve(__dirname, 'dist'), // Output directory
    },

    // Define plugins
    plugins: [
      // Plugin to generate an HTML file with the specified template and title
      new HtmlWebpackPlugin({
        template: './index.html', // Path to HTML template
        title: 'Text Editor' // HTML title
      }),

      // Plugin to inject a service worker into the build
      new InjectManifest({
        swSrc: './src-sw.js', // Path to the service worker source file
        swDest: 'src-sw.js', // Output file for the service worker
      }),

      // Plugin to generate a manifest for PWA
      new WebpackPwaManifest({
        name: 'Just Another Text Editor', // Full name of the PWA
        short_name: 'J.A.T.E', // Short name for the PWA
        description: 'A simple text editor with offline capabilities', // Description of the PWA
        background_color: '#ffffff', // Background color of the PWA
        theme_color: '#31a9e1', // Theme color of the PWA
        start_url: '/', // Start URL when the PWA is launched
        publicPath: '/', // Public path for the PWA assets
        icons: [
          {
            src: path.resolve('src/images/logo.png'), // Path to the icon image
            sizes: [96, 128, 192, 256, 384, 512], // Array of icon sizes
            destination: path.join('icons', 'pwa'), // Directory for storing icons
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/, // Match CSS files
          use: ['style-loader', 'css-loader'], // Loaders to apply
        },
        {
          test: /\.js$/, // Match JavaScript files
          exclude: /node_modules/, // Exclude node_modules directory
          use: {
            loader: 'babel-loader', // Use Babel for transpiling
            options: {
              presets: ['@babel/preset-env'], // Babel preset for modern JavaScript
              plugins: ['@babel/plugin-transform-runtime'] // Babel plugin for runtime transformations
            },
          },
        },
      ],
    },
  };
};