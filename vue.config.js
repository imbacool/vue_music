// const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin') // gzip 压缩的插件
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i // 要进行压缩的文件类型
// function resolve (dir) {
//   return path.join(__dirname, dir)
// }
module.exports = {
  productionSourceMap: false, // 把打包后的js.map文件删掉
  publicPath: './', // 解析资源文件用相对路径
  lintOnSave: false, // 关闭eslint
  devServer: {
    proxy: { // 配置代理服务器
      // 接口小暗号
      '/api': {
        target: 'http://ustbhuangyi.com', // 要转发的目标网址目标网址
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' // 将路径中多余的暗号 删除
        }
      },
      '/aaa': {
        target: 'http://47.95.207.1:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/aaa': ''
        }
      }
    }
  },
  chainWebpack: (config) => {
    // 配置路径别名
    // config.resolve.alias
    //   .set('@', resolve('./src')) // src的绝对路径起一个别名叫@
    //   .set('api', resolve('./src/api'))
    //   .set('style', resolve('./src/style'))
    //   .set('components', resolve('./src/components'))

    // 配置分析工具
    // if (process.env.NODE_ENV === 'production') {
    //   if (process.env.npm_config_report) {
    //     config
    //       .plugin('webpack-bundle-analyzer')
    //       .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    //       .end()
    //   }
    // } else {
    // }
  },
  configureWebpack: config => {
    // 配置gzip
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(new CompressionPlugin({
        algorithm: 'gzip',
        test: productionGzipExtensions,
        threshold: 10240,
        minRatio: 0.8
      })
      )
    }
  }
}
