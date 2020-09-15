const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const _ = require("lodash");

const CONFIG = {
  srcRoot: "./src/pingcode",
  outPutRoot: "./content/themes/pingcode",
};

module.exports = {
  entry: CONFIG.srcRoot + "/index.js",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, CONFIG.outPutRoot, "./assets"),
  },
  module: {
    rules: [
      {
        test: /\.hbs$/i,
        loader: "html-loader",
        include: [path.resolve(__dirname, CONFIG.srcRoot)],
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
        include: [path.resolve(__dirname, CONFIG.srcRoot)],
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
          use: ["css-loader", "sass-loader"],
        }),
        include: [path.resolve(__dirname, CONFIG.srcRoot)],
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin("app.css"),
    new CleanWebpackPlugin(),
    new UglifyJSPlugin({
      sourceMap: true,
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, CONFIG.srcRoot, "./mix-manifest.json"),
        to: path.resolve(
          __dirname,
          CONFIG.outPutRoot,
          "./assets/mix-manifest.json"
        ),
      },
      {
        from: path.resolve(__dirname, CONFIG.srcRoot, "./assets"),
        to: path.resolve(__dirname, CONFIG.outPutRoot, "./assets"),
      },
    ]),
  ],
};
