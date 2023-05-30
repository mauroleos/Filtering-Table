const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // copies index.html file and moves it into dist folder with script tag referecning new bundle 

module.exports = {
    entry: "./app/index.jsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index_bundle.js"
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, use: "babel-loader" },
            { test: /\.css$/, use: ["style-loader", "css-loader"] }
        ]
    },
    resolve: {
        extensions: [".jsx", "..."] // jsx and all of the default behavior
    },
    mode: process.env.NODE_ENV === 'production' 
  ? 'production' 
  : 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: "app/index.html",
        })
    ]
}