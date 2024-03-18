// craco.config.js
const CracoLessPlugin = require('craco-less');

module.exports = {
    webpack: {
      configure: (webpackConfig, { env, paths }) => {
        // 在这里修改 webpackConfig 对象
        return webpackConfig;
      },
    },
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:7001',
          changeOrigin: true,
          pathRewrite: {
            '^/api': '',
          },
        },
      },
    },
    plugins: [
      {
        plugin: CracoLessPlugin,
        options: {
          lessLoaderOptions: {
            lessOptions: {
              modifyVars: { '@primary-color': '#1DA57A' },
              javascriptEnabled: true,
            },
          },
        },
      },
    ],
  };