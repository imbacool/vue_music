<template>
  <div id="app">
    <Header></Header>
    <TabBar></TabBar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
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
  background: @white;
  .w(375);
  height: 100vh;
}
</style>
