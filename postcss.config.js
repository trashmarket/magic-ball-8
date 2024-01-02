const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    [
      "postcss-preset-env"
    ],
    autoprefixer,
    cssnano({
      preset: 'default'
    })
  ]
}