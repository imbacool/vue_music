<template>
  <div id="app">
    <Header></Header>
    <TabBar></TabBar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!-- 播放器组件 -->
    <Player></Player>
  </div>
</template>

<script>
import Header from './components/Header'
import TabBar from './components/TabBar'
import Player from './components/Player/Player'

export default {
  components: { Header, TabBar, Player }
}
</script>

<style lang="less" scoped>
@import './style/index.less';
#app{
  background: @white;
  .w(375);
  height: 100vh;
}
</style>
