/**
 * @file webpack config
 * @author svon.me@gmail.com
 */

const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "production",
  devtool: undefined,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "url.js",
    library: "url",
    libraryTarget: "umd",
    globalObject: "this",
  },
};
