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
import BetterScroll from 'better-scroll'

export default {
  components: { swiper, songList },
  mounted () {
    const wrapper = this.$refs.wrapper
    /* eslint-disable no-new */
    new BetterScroll(wrapper, {})
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
