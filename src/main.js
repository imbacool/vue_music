import Vue from 'vue'
import App from './App.vue' // 引入根组件App.vue
import router from './router' // 引入路由文件，默认index.js
import store from './store' // 引入vuex文件，默认index.js

Vue.config.productionTip = false

new Vue({
  router, // 注册路由
  store, // 注册vuex
  render: h => h(App)
}).$mount('#app') // 挂载根组件
