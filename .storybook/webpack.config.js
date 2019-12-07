const path = require("path");

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('ts-loader'),
      }
    ]
  });
  config.resolve.extensions.push('.ts', '.tsx');
  config.resolve.alias = {
    "@": path.resolve(__dirname, "../src")
  };
  return config;
};
