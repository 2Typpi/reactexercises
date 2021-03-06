let webpack = require("webpack");
let path = require("path");

module.exports = {
  context: path.join(__dirname, "src"),
  mode: "development",
  devtool: "eval",
  entry: "./js/client.js",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          babelrc: false,
          presets: ["react", "env", "stage-0"],
          plugins: [
            "react-html-attrs",
            "transform-decorators-legacy",
            "transform-class-properties",
          ],
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.txt$/,
        loader: "raw-loader",
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]?[hash:8]",
        },
      },
      {
        test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
        loader: "url-loader",
        options: {
          name: "[path][name].[ext]?[hash:8]",
          limit: 10000,
        },
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
    ],
  },
  output: {
    path: path.join(__dirname, "src"),
    filename: "client.min.js",
  },
  plugins: [
    new webpack.DefinePlugin({
      // This has effect on the react lib size
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
  ],
};
