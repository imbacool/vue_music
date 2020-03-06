<template>
  <div class='header'>
    <!-- 如果图片在public目录直接用根路径 -->
    <img src="/favicon.ico" alt="">
    <span>COOL MUSIC</span>
    <router-link to="/my" tag="span" class="iconfont icon-user"></router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@import '../style/index.less';
.header{
  color: @green;
  font-size:@fs-l;
  display: flex;
  justify-content: center;
  align-items: center;
  .w(375);
  height: 44px;
  position: relative;
  img{
    .w(30);
    height: 32px;
    margin-right: 10px;
    border-radius: 50%;
  }
  .icon-user{
    font-size: 30px;
    position: absolute;
    right: 10px;
  }
}
</style>
