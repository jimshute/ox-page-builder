module.exports = {
  "presets": [
    ["@babel/preset-typescript"],
    ["@vue/babel-preset-jsx"],
    [
      "@babel/preset-env", {
        "targets": {
          "node": "current",
          "ie": "10",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1",
        },
        "corejs": "^3.6.5",
        "useBuiltIns": "entry"
      }
    ]
  ],
  "plugins": [
    "@babel/plugin-transform-runtime",
    // // Stage 2
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    // "@babel/plugin-proposal-function-sent",
    // "@babel/plugin-proposal-export-namespace-from",
    // "@babel/plugin-proposal-numeric-separator",
    // "@babel/plugin-proposal-throw-expressions",

    // // Stage 3
    // "@babel/plugin-syntax-dynamic-import",
    // "@babel/plugin-syntax-import-meta",
    ["@babel/plugin-proposal-class-properties", { "loose": false }],
    // "@babel/plugin-proposal-json-strings",
    // ["module-resolver", {
    //   "root": ["./"],
    //   "alias": {
    //     "@": "./src"
    //   }
    // }]
  ]
};
