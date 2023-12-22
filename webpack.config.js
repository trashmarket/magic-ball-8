const HtmlWebpackPlugin = require("html-webpack-plugin") 
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

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
//       chunks: ['[name]'],
//       filename: '[name].html'
//     }),
//     // new HtmlWebpackPlugin({
//     //   template: './src/page1.html',
//     //   chunks: ['page1'],
//     //   filename: 'page1.html'
//     // }),
//   ]
// };

module.exports = (env, argv) => {

  function getConfig (nameFile, isClean) {
    const entryObj = {}
    
    nameFile.forEach((item => entryObj[item] = `./src/${item}.js`))

    return {
      entry: entryObj,
      output: {
        filename: `[name].js`,
        path: __dirname + '/dist'
      },
      module: {
        rules: [
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }
        ]
      },
      plugins: [
        isClean && new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          template: `./src/${nameFile[nameFile.length - 1]}.html`,
          filename: `${nameFile[nameFile.length - 1]}.html`
        })
      ]
    }
  }

  return [getConfig(['index'], true), getConfig(['index', 'page1'])]
}
