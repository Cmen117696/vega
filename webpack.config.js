const path = require("path");
const webpack = require('webpack');

module.exports = (env, argv) => {

  const productionMode = argv.mode === 'production';
  const mode = productionMode ? "production" : "development";
  const devtool = productionMode ? "source-map" : "cheap-eval-source-map";
  const DEV = !productionMode;

  const plugins = DEV ? [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ] : [];

  return {

    mode,

    // 入口文件: 多入口的话可以继续追加
    entry: {
      vega: "./packages/vega/index.js",      // 工程主js
      vanchart: './packages/vega-vanchart/index.js'
    },

    resolve: {
      alias: {
        'packages': path.resolve(__dirname, 'packages')
      }
    },

    // 输出
    output: {
      filename: "[name].js",  // 使用entry的key作为输出文件的文件名，上面的entry对应输出main.js
      path: path.resolve(__dirname, "dist"),  // 输出的文件夹
      library: '[name]',
      libraryTarget: 'umd',
      umdNamedDefine: true
    },

    devtool,   // 开启source-map，可以在chrome中定位和bugger源码

    module: {
      // 文件匹配规则  https://webpack.js.org/configuration/module/#rule
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: "babel-loader"
        }
      ]
    },

    // 配置 webpack-dev-server
    devServer: {
      contentBase: "./examples",   // examples文件夹作为server的主文件夹
      watchContentBase: true,     // 监听文件变化，reload页面
      port: "8888",   // server开启的端口
      hot: true       // 开启热更新
    },

    plugins

  };
}
