import Vue from 'vue'
import VueRouter from 'vue-router' // 引入vue路由模块
// 引入组件
import recommend from '@/views/recommend'
import singer from '@/views/singer'
import rank from '@/views/rank'
import search from '@/views/search'
import swiper from '../components/swiper.vue'

Vue.use(VueRouter) // 使用路由

const routes = [
  {
    path: '/recommend',
    component: recommend,
    children: [
      {
        path: 'swiper',
        component: swiper
      }
    ]
  },
  {
    path: '/singer',
    component: singer
  },
  {
    path: '/rank',
    component: rank
  },
  {
    path: '/search',
    component: search
  },
  // 重定向
  {
    path: '*',
    redirect: '/recommend'
  }
]

const router = new VueRouter({
  mode: 'history', // 路由模式  hash/history
  routes
})

export default router
