<template>
    <div class="my">
        <span @click='back'>back</span>
        <p>功能未开放，敬请期待</p>
    </div>
</template>

<script>
export default {
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
@import "../style/index.less";
.my{
  position: fixed;
  top: 0px;
  bottom: 0px;
  background: #fff;
  left:0px;
  right: 0px;
}
</style>
