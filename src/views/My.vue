<template>
    <div class="my">
        <div class='top'>
          <span @click='back' class="iconfont icon--fanhui"></span>
          <span>我的歌曲收藏列表</span>
        </div>

        <div class='random' ref="random">
         <span class="iconfont icon-play-circle"></span>
         <span>随机播放全部</span>
       </div>

       <div class="wrapper" ref="wrapper">
         <ul class="content">
           <li v-for="(item,index) in List" :key="index">{{item}}
             <span class="iconfont icon-x-close"></span>
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
      List: ['111', '222', '333', '111', '222', '333', '111', '222', '333', '111', '222', '333', '111', '222', '333', '111', '222', '333', '111', '222', '333', '111', '222', '333', '111', '222', '333']
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  },
  mounted () {
    const wrapper = this.$refs.wrapper
    this.bs = new BS(wrapper, { click: true })
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
  .random{
    position: absolute;
    top: 70px;
    left: 122px;
    border-radius: 30px;
    background-color: @green;
    .w(135);
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    .icon-play-circle{
      font-size: 18px;
    }
    span:nth-of-type(2){
      font-size: 14px;
    }
  }
  .wrapper{
    position: fixed;
    top: 120px;
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
