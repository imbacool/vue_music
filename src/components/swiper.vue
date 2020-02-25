<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item,index) in list" :key="index">{{item}}</div>
    </div>

    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'

export default {
  data () {
    return {
      list: ['图片1', '图片2', '图片3', '图片4', '图片5']
    }
  },
  mounted () {
    /* eslint-disable no-new */
    new Swiper('.swiper-container', {
      loop: true, // 循环模式选项

      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination'
      }
    })
  }
}
</script>

<style>
@import "~swiper/css/swiper.min.css";

.swiper-container {
  width: 100%;
  height: 150px;
  background-color: burlywood;
}
.swiper-slide{
    text-align: center;
    line-height: 150px;
}
</style>
