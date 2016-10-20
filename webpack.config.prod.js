/**
 * Webpack configuration for production
 * See: http://webpack.github.io/docs/configuration.html
 * @author: Thangadurai Nainamalai<duraithanga3@gmail.com>
 */

const webpack = require("webpack");
const GLOBALS = {
  "process.env": {
    "NODE_ENV": JSON.stringify("production")
  },
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || "false"))
};

module.exports = {
  devtool: "#eval-source-map",
  entry: [
    "react-hot-loader/patch",
    "./app",
  ],
  output: {
    path: __dirname + "/public/assets/",
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  node: {
    dns: "empty",
    net: "empty"
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS)
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ["babel"],
        exclude: /(node_modules|bower_components|public)/
      }
    ]
  }
};
