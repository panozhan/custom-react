const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Connect-4 React App',
            template: 'src/index.html'
        })],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 8000
    },
    mode: 'development',
  };