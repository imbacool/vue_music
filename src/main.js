import Vue from 'vue'
import App from './App.vue' // 引入根组件App.vue
import router from './router' // 引入路由文件，默认index.js
import store from './store' // 引入vuex文件，默认index.js
import VueLazyload from 'vue-lazyload' // 引入图片懒加载

import './style/base.css' // 引入基础样式文件
import './style/icon/iconfont.css'
import 'animate.css/animate.min.css'

Vue.config.productionTip = false

// 图片懒加载
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '/favicon.ico',
  loading: '/favicon.ico',
  attempt: 1
})

new Vue({
  router, // 注册路由
  store, // 注册vuex
  render: h => h(App)
}).$mount('#app') // 挂载根组件
