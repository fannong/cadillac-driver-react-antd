// craco.config.js
const CracoLessPlugin = require("craco-less");
const path = require("path");
const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  style: {
    postcss: {
      mode: "extends",
      loaderOptions: {
        postcssOptions: {
          ident: "postcss",
          plugins: [
            [
              "postcss-px-to-viewport",
              {
                unitToConvert: "px", //需要转换的单位，默认为"px"
                viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
                unitPrecision: 6, //单位转换后保留的精度
                propList: [
                  //能转化为vw的属性列表
                  "*",
                ],
                viewportUnit: "vw", // 希望使用的视口单位
                fontViewportUnit: "vw", //字体使用的视口单位
                selectorBlackList: [], //需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
                minPixelValue: 1, //设置最小的转换数值，如果为1的话，只有大于1的值会被转换
                mediaQuery: false, //媒体查询里的单位是否需要转换单位
                replace: true, //是否直接更换属性值，而不添加备用属性
                exclude: /(\/|\\)(node_modules)(\/|\\)/, //忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
              },
            ],
          ],
        },
      },
    },
  },
  webpack: {
    alias: {
      "@": resolve("src"),
    },
    configure: (webpackConfig, { env, paths }) => {
      // 在这里修改 webpackConfig 对象
      webpackConfig.module.rules.push(
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        },
        {
          
        }
      );
      return webpackConfig;
    },
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:7001",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
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
            modifyVars: { "@primary-color": "#1DA57A" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
