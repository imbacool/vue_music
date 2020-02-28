<template>
  <div id="app">
    <Header></Header>
    <TabBar></TabBar>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header'
import TabBar from './components/TabBar'

export default {
  components: { Header, TabBar }
}
</script>

<style lang="less" scoped>
@import './style/index.less';
#app{
  background: @black2;
  .w(375);
  height: 100vh;
}
</style>
