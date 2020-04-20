const path = require("path")
const webpack = require("webpack")
/*const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")*/
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ManifestPlugin = require("webpack-manifest-plugin")
function resolveSrc(_path) {
  return path.join(__dirname, _path)
}
// vue.config.js
module.exports = {
  publicPath: "/",
  lintOnSave: process.env.NODE_ENV !== "production",
  configureWebpack: {
    performance: { hints: false },
    // Set up all the aliases we use in our app.
    resolve: {
      alias: {
        src: resolveSrc("src"),
        "@lib": resolveSrc("src/components/lib"),
        assets: resolveSrc("src/assets"),
        "@assets": resolveSrc("src/assets"),
        "chart.js": "chart.js/dist/Chart.js",
        icons: resolveSrc("node_modules/vue-material-design-icons"),
        "Mocks": resolveSrc("src/store/mocks/index.js"),
        "@filters": resolveSrc("src/plugins/filters")
      },
      extensions: [".vue"],
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: process.env.ENV
        }
      }),
      /*new OptimizeCssAssetsPlugin(),*/
      new HtmlWebpackPlugin({
        filename: "public/index.html",
        template: "public/index.html",
        inject: true,
        chunksSortMode: "dependency"
      }),
      new ManifestPlugin()
    ],
    optimization: {
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
              return `npm.${packageName.replace("@", "")}`
            },
          },
        }
      }
    },
    output: {
      filename: "[name].[hash].js"
    },
    devtool: "source-map",
  },
  pwa: {
    serviceWorker: false,
    name: "Painel Integrado App",
    themeColor: "#344675",
    msTileColor: "#344675",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "#344675",
  },
  pluginOptions: {
    i18n: {
      locale: "pt",
      fallbackLocale: "pt",
      localeDir: "locales",
      enableInSFC: false,
    },
    s3Deploy: {
      awsProfile: "default",
      region: "us-east-1",
      bucket: "dev-app.painel.com.br",
      assetPath: "dist",
      deployPath: "/",
      enableCloudfront: true,
      createBucket: true,
      staticHosting: true,
      staticIndexPage: "index.html",
      staticErrorPage: "index.html",
      uploadConcurrency: 5,
      assetMatch: "**",
      acl: "public-read",
      pluginVersion: "3.0.0",
      gzip: true,
      cacheControl: "max-age=86400",
      pwa: false,
      pwaFiles: "index.html,app.js,0.js,1.js,2.js,3.js,4.js,5.js",
    },
  },
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== "production",
    // Enable scss variables inside .vue files
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/sass/dashboard/custom/_variables.scss";
          @import "@/assets/sass/_variables.scss";
        `,
      },
    },
  },
  devServer: {
    // open: process.platform === 'darwin',
    // proxy: {
    //   "/v1": {
    //     target: "https://localhost:5005/v1",
    //     changeOrigin: true
    //   }
    // },
    host: "localhost",
    port: 8080,
    https: false,
    hotOnly: false,
    overlay: {
      warnings: true,
      errors: true
    }
  }
}
