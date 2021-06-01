const path = require("path")
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".glsl"],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      { test: /\.glsl$/, loader: "webpack-glsl-loader" },
    ],
  },
  plugins: [
    new CopyPlugin({
        patterns: [
            { from: "public" },
        ],
    }),
  ],

  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       three: {
  //         test: /[\\/]node_modules[\\/](three)[\\/]/,
  //         name: 'three',
  //         chunks: 'all',
  //         filename: '[name].bundle.js',
  //       },
  //       vendor: {
  //         test: /[\\\/]node_modules[\\\/]/,
  //         name: 'vendors',
  //         chunks: 'all',
  //         filename: '[name].bundle.js',
  //       }
  //     }
  //   }
  // }

}
