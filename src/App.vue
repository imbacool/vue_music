<template>
  <div id="app">
    <top></top>

    <div class="link">
      <router-link to="/recommend" tag="span" active-class="active">推荐</router-link>
      <router-link to="/singer" tag="span" active-class="active">歌手</router-link>
      <router-link to="/rank" tag="span" active-class="active">排行</router-link>
      <router-link to="/search" tag="span" active-class="active">搜索</router-link>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import top from './components/top'

export default {
  components: { top }
}
</script>

<style scoped>
.active {
  color: orange;
  border-bottom: 2px orange solid;
}
.link {
  background-color: #000;
  padding: 10px 0;
  box-sizing: border-box;
}
span {
  display: inline-block;
  width: 25%;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: #ccc;
}
</style>
