/**
 * @file webpack config
 * @author svon.me@gmail.com
 */

const path = require("path");

module.exports = {
  entry: {
    url: "./src/index.js"
  },
  // mode: "production", // "development",
  mode: "production",
  devtool: undefined,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    library: "url",
    libraryTarget: "umd",
    globalObject: "this",
  },
};
