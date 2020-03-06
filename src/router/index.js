import Vue from 'vue'
import VueRouter from 'vue-router' // 引入vue路由模块
// 引入组件
import recommend from '@/views/Recommend'
import singer from '@/views/Singer'
import rank from '@/views/Rank'
import search from '@/views/Search'
import my from '@/views/My'
// import SingerDetail from '@/views/Singer/SingerDetail'

Vue.use(VueRouter) // 使用路由

const routes = [
  {
    path: '/recommend',
    component: recommend
  },
  {
    path: '/singer',
    component: singer
    // children: [
    //   {
    //     path: ':singermid',
    //     component: SingerDetail
    //   }
    // ]
  },
  {
    path: '/rank',
    component: rank
  },
  {
    path: '/search',
    component: search
  },
  {
    path: '/my',
    component: my
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
