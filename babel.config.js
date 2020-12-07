module.exports = {
  "presets": [
    ["@babel/preset-typescript"],
    ["@vue/babel-preset-jsx"],
    [
      "@babel/preset-env", {
        "targets": {
          "node": "current",
          "chrome": "67",
          "esmodules": true
        },
        "modules": "commonjs"
      }
    ]
  ],
  "plugins": [
    [
      'import',
      {
        libraryName: 'ant-design-vue',
        libraryDirectory: 'lib',
        style: false
      },
      'ant-design-vue'
    ],
    "@babel/plugin-transform-runtime",
    // // Stage 2
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    // // Stage 3
    ["@babel/plugin-proposal-class-properties", { "loose": false }]
  ]
};
