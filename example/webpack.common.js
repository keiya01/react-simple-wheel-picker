const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "/public/dist"),
    filename: "bundle.js"
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
      }
    ]
  }
};
