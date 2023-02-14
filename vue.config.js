const path = require('path')
const resolve = dir => path.join(__dirname, dir);

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : './',
    //publicPath: './',
    //publicPath: 'https://services.bynd.one/clients/hawesko/',
    pages: {
        index: {
            entry: resolve('src/main.js')
        }
    },
    devServer: {
        port: '3000',
        overlay: {
            warnings: true,
            errors: true
        }
    },
    chainWebpack: config => {
        config.resolve.alias.set(
            'vue$',
            path.resolve(__dirname, 'node_modules/vue/dist/vue.runtime.esm.js')
        )
    },
    lintOnSave: true,
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
          @import "@/scss/style.scss";
        `
            }
        }
    },
    configureWebpack: {
        resolve: {
            modules: [
                path.resolve("./src"),
                path.resolve("./node_modules")
            ]
        },
    }
}