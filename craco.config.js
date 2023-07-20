const CracoAntDesignPlugin = require("craco-antd");
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
const WebpackBar = require("webpackbar");

const path = require("path");
const { version } = require("./package.json");
const ASSET_PATH = process.env.REACT_APP_ASSET_PATH;
const IS_PRODUCTION = process.env.REACT_APP_ENV === "production";
const suffix = "";

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {},
    },
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          webpackConfig.plugins[6].options.filename = `static/${suffix}css/${version}/main.[hash:8].css`;
          webpackConfig.plugins[6].options.chunkFilename = `static/${suffix}css/${version}/[name].[contenthash:8].css`;
          webpackConfig.plugins.push(new AntdDayjsWebpackPlugin());
          return webpackConfig;
        },
      },
      options: {},
    },
  ],

  babel: {
    loaderOptions: (babelLoaderOptions) => {
      if (IS_PRODUCTION) {
        babelLoaderOptions.plugins = [
          ...babelLoaderOptions.plugins,
          ["transform-remove-console", { exclude: ["error", "warn"] }],
        ];
      }
      return babelLoaderOptions;
    },
  },
  webpack: {
    plugins: [new WebpackBar({ profile: true })],
    configure: {
      devtool: IS_PRODUCTION ? false : undefined,
      output: {
        filename: `static/${suffix}js/${version}/main.[hash:8].js`,
        chunkFilename: `static/${suffix}js/${version}/[name].[contenthash:8].js`,
        publicPath: ASSET_PATH,
      },
      optimization: {
        runtimeChunk: false,
        splitChunks: {
          cacheGroups: {
            default: false,
          },
        },
      },
    },
  },
};
