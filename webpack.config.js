const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const fs = require("fs");

let files = fs
  .readdirSync("./src")
  .filter((item) => item.includes(".html"))
  .map((fileName) => path.basename(fileName, ".html"));

function collectorPlugins(htmls, difrentPlugins, objCongig) {
  const arrHtmlPlugins = htmls.map(
    (item) =>
      new HtmlWebpackPlugin({
        template: `./src/${item}.html`,
        chunks:
          item === "index"
            ? ["main"]
            : ["main", ...htmls.filter((item) => item !== "index")],
        filename: `${item}.html`,
      })
  );

  objCongig.plugins = [...arrHtmlPlugins, ...difrentPlugins];
}

module.exports = (env, argv) => {
  const config = {
    entry: {
      main: "./src/index.js",
      page1: "./src/page1.js",
    },
    devServer: {
      static: path.resolve(__dirname, "./dist"),
      compress: true,
      hot: true,
      port: 8080,
      open: true,
    },
    mode: "development",
    output: {
      filename: "[name].js",
      path: __dirname + "/dist",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: "babel-loader",
          exclude: path.join(__dirname, "node_modules"),
        },
        {
          test: /\.css$/i,
          use: [
            argv.mode === "production"
              ? MiniCssExtractPlugin.loader
              : "style-loader",
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
              },
            },
            "postcss-loader",
          ],
        },
        {
          test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
          type: "asset/resource",
        },
      ],
    },
    plugins: [], // don't put here plugins, use function below
  };

  collectorPlugins(
    files,
    [
      new CleanWebpackPlugin(),
      argv.mode === "production" && new MiniCssExtractPlugin(),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "src/static-data", "data.json"),
            to: "static-data",
          },
        ],
      }),
    ],
    config
  );

  return config;
};
