const HtmlWebpackPlugin = require("html-webpack-plugin") 
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require('path');

// module.exports = {
//   entry: {
//     main:"./src/index.js",
//     page1:"./src/page1.js",
//   },
//   output: {
//     filename: '[name].js',
//     path: __dirname + '/dist'
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/i,
//         use: ["style-loader", "css-loader"]
//       }
//     ]
//   },
//   plugins: [
//     new CleanWebpackPlugin(),
//     new HtmlWebpackPlugin({
//       template: './src/index.html',
//       chunks: 'main',
//       filename: 'main.html'
//     }),
//     new HtmlWebpackPlugin({
//       template: './src/page1.html',
//       chunks: 'page1',
//       filename: 'page1.html'
//     }),
//   ]
// };

function collectorPlugins(htmls, difrentPlugins, objCongig) {
  const arrHtmlPlugins = htmls.map(item => new HtmlWebpackPlugin({
    template: `./src/${item}.html`,
    chunks: item === 'index' ? ['main'] : ['main', ...htmls.filter(item => item !== 'index')],
    filename: `${item}.html`
  }))

  objCongig.plugins = [...arrHtmlPlugins, ...difrentPlugins];
}

module.exports = (env, argv) => {
  const config = {
    entry: {
      main:"./src/index.js",
      page1:"./src/page1.js",
    },
    devServer: {
      static: path.resolve(__dirname, './dist'),
      compress: true,
      hot: true,
      port: 8080,
      open: true
    },
    mode: 'development',
    output: {
      filename: '[name].js',
      path: __dirname + '/dist'
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
          type: 'asset/resource'
        },
      ]
    },
    plugins: [] // don't put here plugins, use function below
  }

  collectorPlugins(['index', 'page1'], [new CleanWebpackPlugin()], config)

  return config;
}
