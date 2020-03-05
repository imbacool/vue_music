<template>
    <div class='tab'>
     <router-link to='/recommend' tag='div' active-class="sel">
      <span>推荐</span>
     </router-link>
     <router-link to='/singer' tag='div' active-class="sel">
      <span>歌手</span>
     </router-link>
     <router-link to='/rank' tag='div' active-class="sel">
      <span>排行</span>
     </router-link>
     <router-link to='/search' tag='div' active-class="sel">
      <span>搜索</span>
     </router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@import '../style/index.less';
.tab{
  .w(375);
  height: 44px;
  display: flex;
  div{
    text-align: center;
    line-height: 44px;
    width: 25%;
    font-size: @fs-s;
    color: #000;
    span{
      height: 38px;
      display: inline-block;
      border-bottom: 2px solid @white;
    }
  }
  .sel{
    color: @green;
    span{
      border-bottom: 2px solid @green;
    }
  }
}
</style>
