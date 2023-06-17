
const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  mode: "development", // 'production' | 'development' | "none" for non-minified output
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.glsl/,
        type: "asset/source",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  experiments: {
    topLevelAwait: true,
  },
};
