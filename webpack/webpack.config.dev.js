const path = require("path");
const config = require("./config");
const webpack = require("webpack");
const { merge } = require("webpack-merge");

const common = require("./webpack.config.common.js");

module.exports = merge(common, {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-[hash:6].js",
    publicPath: '/',
    chunkFilename: "[name].[chunkhash:4].chunk.js",
  },
  devServer: {
    port: 8089,
    host: "0.0.0.0",
    hot: true, // css 修改热更新，js 热更新需要配合 hotOnly和webpack.HotModuleReplacementPlugin()
    compress: true,
    // 当使用 HTML5 History API 时, 所有的 404 请求都会响应 index.html 的内容。 将 devServer.historyApiFallback 设为 true开启：
    historyApiFallback: true, 
    hotOnly: true, // 即便HMR不⽣效，浏览器也不⾃动刷新，就开启hotOnly
    /* proxy: {   // 每个 key 都是需要转发的前缀
      "/dataassets/api": {
        target: "http://10.100.1.15:8089",
      },
    }, */
    proxy: [
      // 多个前缀代理到同一个后端服务写法
      {
        context: ["/dataassets/api", "/sso"],
        target: "http://10.100.1.15:8089",
      },
    ]
  },
  devtool: "inline-source-map", // 开发环境配置
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              // less@3
              javascriptEnabled: true,
              // 覆盖antd样式的全局变量
              modifyVars: config.modifyVars,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          "file-loader?hash=sha512&digest=hex&name=[hash].[ext]",
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: "url-loader?limit=10000&mimetype=application/font-woff",
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: "file-loader",
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
