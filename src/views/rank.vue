<template>
<div>
  <div class="wrapper" ref="wrapper">
    <ul class="content">
      <li v-for="item in list" :key="item.id" @click="goDateil(item.id)">
        <div class="img">
          <img v-lazy="item.picUrl" alt="">
        </div>
        <div class="song">
          <p v-for="(ele,index) in item.songList" :key="index">
            {{index+1}}. {{ele.songname}}-{{ele.singername}}
          </p>
        </div>
      </li>
      <div style="height:70px"></div>
    </ul>
  </div>
  <!--嵌套路由 -->
  <transition
    enter-active-class="animated slideInRight"
    leave-active-class="animated slideOutRight"
  >
    <router-view></router-view>
  </transition>
</div>
</template>

<script>
import axios from 'axios'
import BS from 'better-scroll'
import { Indicator } from 'mint-ui'
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    })
    const url = '/aaa/fcj/music/topRank'
    axios.get(url)
      .then(res => {
        // console.log(res.data.data.topList)
        Indicator.close()
        this.list = res.data.data.topList
      })
  },
  mounted () {
    const wrapper = this.$refs.wrapper
    this.bs = new BS(wrapper, { click: true })
  },
  methods: {
    goDateil (id) {
      // console.log(id)
      this.$router.push(`/rank/${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
@import "../style/index.less";
.wrapper{
  position: fixed;
  top: 88px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  overflow: hidden;
}
li{
  margin: 0 20px;
  padding-top: 20px;
  display: flex;
  color: #000;
  .img{
    img{
      .w(100);
      height: 100px;
    }
  }
  .song{
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    p{
      font-size: 14px;
      height: 26px;
      .w(195);
      line-height: 26px;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
    }
  }
}

</style>
