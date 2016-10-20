/**
 * Webpack configuration for development
 * See: http://webpack.github.io/docs/configuration.html
 * @author: Thangadurai Nainamalai<duraithanga3@gmail.com>
 */

const webpack = require("webpack");
const GLOBALS = {
  "process.env": {
    "NODE_ENV": JSON.stringify("development")
  },
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || "true"))
};

module.exports = {
  devtool: "#eval-source-map",
  entry: [
    "react-hot-loader/patch",
    "webpack-dev-server/client?http://localhost:8080",
    "webpack/hot/only-dev-server",
    "./app",
  ],
  output: {
    path: __dirname + "/public/assets/",
    filename: "bundle.js"
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.DefinePlugin(GLOBALS),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: [".js", ".jsx"]
  },
  node: {
    dns: "empty",
    net: "empty"
  },
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
