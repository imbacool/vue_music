<template>
    <div class="my">
        <div class='top'>
          <span @click='back' class="iconfont icon--fanhui"></span>
          <span>我的歌曲收藏列表</span>
        </div>

       <div class="wrapper" ref="wrapper">
         <ul class="content">
           <li v-for="(item,index) in List" :key="index">{{item}}
             <!-- <span class="iconfont icon-x-close" @click="del(index)"></span> -->
           </li>
         </ul>
       </div>
    </div>
</template>

<script>
import BS from 'better-scroll'
export default {
  data () {
    return {
      List: []
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  },
  created () {
    if (localStorage.getItem('myFavor')) {
      const str = localStorage.getItem('myFavor')
      this.List = str.split(',')
    }
  },
  mounted () {
    const wrapper = this.$refs.wrapper
    this.bs = new BS(wrapper, { click: true })
  },
  activated () {
    if (localStorage.getItem('myFavor')) {
      const str = localStorage.getItem('myFavor')
      this.List = str.split(',')
    }
    if (this.bs) {
      this.bs.refresh()
    } else {
      const wrapper = this.$refs.wrapper
      this.bs = new BS(wrapper, { click: true })
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
  .top{
    height: 40px;
    .w(375);
    background: @green;
    position: absolute;
    top:0;
    z-index: 3;
    display: flex;
    justify-content: center;
    .icon--fanhui{
      font-size: 22px;
      color: @white;
      position: absolute;
      left: 20px;
      top: 6px;
    }
    span:last-of-type{
      font-size: 20px;
      display: inline-block;
      margin-top: 5px;
      color: @white;
    }
  }
  .wrapper{
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    .content{
      padding: 0 30px;
      li{
        font-size: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        .icon-x-close{
          font-size: 20px;
        }
      }
    }
  }
}
</style>
