const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "/public/dist"),
    filename: "bundle.js"
  },
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "public"),
    publicPath: "/dist/",
    inline: true
  },
  resolve: {
    modules: ["node_modules", path.resolve("./src")],
    extensions: [".tsx", ".js", ".ts", "json"],
    alias: {
      "@": "./src"
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "source-map-loader",
            options: {
              enforce: "pre",
              presets: ["@babel/preset-env", "@babel/preset-react"]
            }
          }
        ]
      }
    ]
  }
};
