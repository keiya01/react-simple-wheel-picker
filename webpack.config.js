const path = require('path');

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: "./src/index.tsx",
  output: {
    path: `${__dirname}/dist`,
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        exclude: /node_modules/,
        use: [{ loader: "ts-loader" }]
      },
      {
        test: /\.js$/,
        enforce: "pre",
        exclude: /node_modules/,
        loader: "source-map-loader"
      }
    ]
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    },
    extensions: [".ts", ".tsx", ".js", ".json", ".jsx"]
  }
}
