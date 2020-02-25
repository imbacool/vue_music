import Vue from 'vue'
import VueRouter from 'vue-router' // 引入vue路由模块
import Home from '../views/Home.vue' // 引入组件

Vue.use(VueRouter) // 使用路由

const routes = [
  {
    path: '/', // 路径
    name: 'Home', // 命名路由
    component: Home // 组件
  }
]

const router = new VueRouter({
  mode: 'history', // 路由模式  hash/history
  // base: process.env.BASE_URL, // 应用的基路径。如果整个单页应用服务在 /app/ 下，然后 base 就应该设为 "/app/"。
  routes
})

export default router
