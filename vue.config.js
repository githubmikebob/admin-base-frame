module.exports = {
  // 将部署应用程序的基本URL
  // 将部署应用程序的基本URL。
  // 默认情况下，Vue CLI假设您的应用程序将部署在域的根目录下。
  // https://www.my-app.com/。如果应用程序部署在子路径上，则需要使用此选项指定子路径。
  // 例如，如果您的应用程序部署在https://www.foobar.com/my-app/，集baseUrl到'/my-app/'.
  publicPath: process.env.NODE_ENV === 'production' ? './' : './',
  // outputDir: 在npm run build时 生成文件的目录 type:string, default:'dist'
  outputDir: 'dist',
  // 构建多页面模式的应用程序.每个“页面”都应该有一个相应的JavaScript条目文件。
  // 该值应该是一个对象，其中键是条目的名称，而该值要么是指定其条目、模板和文件名的对象，要么是指定其条目的字符串，
  // 注意：请保证pages里配置的路径和文件名 在你的文档目录都存在 否则启动服务会报错的
  // pages:{ type:Object,Default:undefined }
  pages: {
    index: {
      // entry for the page
      entry: 'src/main.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'index.html'
    },
    // 当使用只输入字符串格式时,模板被推断为“public”/subpage.html
    // and falls back to `public/index.html` if not found.Output filename is inferred to be `subpage.html`.
    // subpage: 'src/subpage/main.js'
  },
  //   lintOnSave：{ type:Boolean default:true } 问你是否使用eslint
  lintOnSave: !(process.env.NODE_ENV === 'production'),
  // 如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
  // productionSourceMap：{ type:Boolean,default:true } 生产源映射
  productionSourceMap: false,
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  // css: {},
  // 它支持webPack-dev-server的所有选项
  // devServer:{type:Object} 3个属性host,port,https
  devServer: {
    // host: '0.0.0.0',
    // port: 8080,
    // https: true,
    proxy: { // 配置跨域处理,只有一个代理
      '/api': {
        target: 'https://apiadmin.softkgj.com',  // 后台接口域名
        secure: true,  // 如果是https接口，需要配置这个参数
        changeOrigin: true,  // 是否跨域
        pathRewrite: {
          '^/api': ''
        }
        // ws: true,  // 如果要代理 websockets，配置这个参数
      }
    }
  },
}