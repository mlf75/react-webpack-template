const path = require('path');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: {
    index: './src/pages/index.js',
  },
  resolve: {
    // 项目路径别名
    alias: {
      Utils: path.resolve(__dirname, "../src/utils"),
      Components: path.resolve(__dirname, "../src/components"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        include: path.resolve(__dirname, "../src"),
        exclude: /node_modules/,
      },
    ]
  },
  performance: {
    // false | "error" | "warning" // 不显示性能提示 | 以错误形式提示 | 以警告...
    hints: false,
    // 开发环境设置较大防止警告
    // 根据入口起点的最大体积，控制webpack何时生成性能提示,整数类型,以字节为单位
    maxEntrypointSize: 5000000,
    // 最大单个资源体积，默认250000 (bytes)
    maxAssetSize: 3000000,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html", // 打包 html 模板
      filename: "index.html", // 打包后生成的文件名
    })
  ]
}