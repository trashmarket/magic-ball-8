const presets = [
  [
    "@babel/preset-env",
    {
      useBuiltIns: "usage",
      corejs: "3.35.0",
    },
  ],
];

module.exports = { presets };