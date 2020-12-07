const name = require('./package.json').name;

let localDevServer = {};
try {
  localDevServer = require('./dev-server.local.js');
} catch (e) { }

module.exports = {
  pages: {
    index: 'src/main.js'
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: {
    devServer: {
      port: 8070,
      proxy: localDevServer,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      }
    }
  }
};