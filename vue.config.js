module.exports = {
  configureWebpack: {
    resolve: {
      alias: {    //别名
        'views': '@/views',
        'components': '@/components',
        'network': '@/network',
        'common': '@/common',
        'assets': '@/assets',
      }
    }
  }
}