<template>
  <div class='header'>
    <!-- 如果图片在public目录直接用根路径 -->
    <img src="/favicon.ico" alt="">
    <span>COOL MUSIC</span>
    <router-link to="/my" tag="div"></router-link>
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
  img{
    .w(30);
    height: 32px;
    margin-right: 10px;
  }
  div{
    .w(50);
    height: 50px;
    background: @green;
    margin-left: 10px;
  }
}
</style>
