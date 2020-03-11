import Vue from 'vue'
import VueRouter from 'vue-router' // 引入vue路由模块
// 引入组件
// import recommend from '@/views/Recommend'
// import singer from '@/views/Singer'
// import rank from '@/views/Rank'
// import search from '@/views/Search'
// import my from '@/views/My'
// import SingerDetail from '@/views/Singer/SingerDetail'

// 路由懒加载
const recommend = () => import('@/views/Recommend')
const singer = () => import('@/views/Singer')
const rank = () => import('@/views/Rank')
const search = () => import('@/views/Search')
const my = () => import('@/views/My')
const SingerDetail = () => import('@/views/Singer/SingerDetail')
const RankDetail = () => import('../components/Rank/RankDetail.vue')
const RecommendDetail = () => import('../components/Recommend/RecommendDetail.vue')

Vue.use(VueRouter) // 使用路由

const routes = [
  {
    path: '/recommend',
    component: recommend,
    children: [
      {
        path: ':disstid',
        component: RecommendDetail
      }
    ]
  },
  {
    path: '/singer',
    component: singer,
    children: [
      {
        path: ':singermid',
        component: SingerDetail
      }
    ]
  },
  {
    path: '/rank',
    component: rank,
    children: [
      {
        path: ':topid',
        component: RankDetail
      }
    ]
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
  // mode: 'history', // 路由模式  hash/history
  routes
})

export default router
