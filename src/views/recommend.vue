<template>
  <!-- 滚动区域 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <!-- 轮播图 -->
      <swiper></swiper>
      <!-- 歌曲列表 -->
      <songList></songList>
    </div>
  </div>
</template>

<script>
import swiper from '../components/Recommend/Swiper'
import songList from '../components/Recommend/SongList'
import BS from 'better-scroll'
// import { Indicator } from 'mint-ui'

export default {
  components: { swiper, songList },
  mounted () {
    const wrapper = this.$refs.wrapper
    // 开启下拉刷新
    this.bs = new BS(wrapper, {
      pullDownRefresh: {
        threshold: 50,
        stop: 20
      },
      pullUpLoad: {
        threshold: 50
      },
      click: true
    })
    // 监听下拉刷新
    this.bs.on('pullingDown', () => {
      this.$router.go(0)
      // 上次下拉刷新已经结束 可以开始下一次
      this.bs.finishPullDown()
    })
    // // 监听上拉加载
    // this.bs.on('pullingUp', () => {
    //   // 上一次上拉加载已经结束可以开启下一次
    //   this.bs.finishPullUp()
    // })
  }
}
</script>

<style lang="less" scoped>
@import '../style/index.less';
.wrapper {
  position: fixed;
  top: 88px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  overflow: hidden;
  .content {
    .w(375);
  }
}
</style>
