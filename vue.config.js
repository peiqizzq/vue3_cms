// const path = require('path')
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // publicPath: './',
  // cli提供的配置
  outputDir: './dist',

  // 配置proxy代理解决跨域
  devServer: {
    proxy: {
      '^/api': {
        // target: 'https://bookbook.cc/api/vue3-ts-cms',
        // target: 'http://152.136.185.210:5000',
        // target: 'http://httpbin.org/',
        target: 'http://10.96.176.185:9000',
        // coderhxl
        // target: 'http://192.168.1.226:9000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  // 1.webpack提供的配置
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components'
      }
    }
  }
  // 2.修改webpack原始的配置
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     components: '@/components'
  //   }
  // }
  // 3.链式webpack原始配置
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@', path.resolve(__dirname, 'src'))
  //     .set('components', '@/components')
  // }
})
