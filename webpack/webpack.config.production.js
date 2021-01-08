const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { merge } = require("webpack-merge");
const config = require("./config");
const common = require("./webpack.config.common.js");

module.exports = merge(common, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/", // 项目打包后的 css,js 都会添加统一访问路径前缀
    filename: "js/[name].[hash:6].js",
    chunkFilename: "js/[name].[hash:6].chunk.js",
  },
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: [
          {
            // MiniCssExtractPlugin 既有插件的配置也有 loader 的配置，具体配置项参考 github 文档
            // https://github.com/webpack-contrib/mini-css-extract-plugin
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: config.publicPath, // 配置打包后访问 css 文件的路径前缀。
            },
          },
          "css-loader",
          "postcss-loader",
          {
            loader: "less-loader",
            options: {
              // less@3
              javascriptEnabled: true,
              // 覆盖antd样式的全局变量
              modifyVars: config.modifyVars
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: "[name]-[contenthash:6].[ext]",
              limit: 2 * 1024, // 小于2k的图片，直接使用Base64编码进行处理
            }
          }
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader'
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader'
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[contenthash:6]-[name].css",
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../static"),
        to: path.resolve(__dirname, "../dist/static"),
      },
    ]),
  ],
});
