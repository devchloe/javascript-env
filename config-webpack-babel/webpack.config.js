const path = require('path');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/frontend/index.js'),
  },
  module: {
    rules: [
      {
        loader: "babel-loader",

        include: [
          path.resolve(__dirname, 'src/frontend'),
        ],

        test: /\.js?$/,
      }
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
