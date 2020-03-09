<template>
  <div class='detail'>
    <!-- 头部导航 -->
     <div class='top'>
       <span @click='back' class="iconfont icon--fanhui"></span>
       <span>{{name}}</span>
     </div>
     <!-- 头像 -->
     <div class='avator'
     :style="{'background-image':`url(${avator})`}"
     ref='img'
     >
       <div class='random' ref="random" @click="randomPlay()">
         <span class="iconfont icon-play-circle"></span>
         <span>随机播放全部</span>
       </div>
     </div>
     <!-- 歌曲列表 -->
     <div class='songlist' ref='wrapper'>
        <div class='content'>
          <ul>
            <li v-for='(item,index) in list'
              :key='index'
              @click="openPlay(index)"
              >
               <h2>{{item.songname}}</h2>
               <p>{{name}}.{{item.albumname}}</p>
            </li>
          </ul>
          <div style="height:50px"></div>
        </div>
     </div>
  </div>
</template>
<script>
import BS from 'better-scroll'
import { getSongByMid, getSongUrlByMid } from './index'
import { mapMutations } from 'vuex'
import { Indicator } from 'mint-ui'
export default {
  data () {
    return {
      list: [],
      name: '',
      avator: ''
    }
  },
  methods: {
    ...mapMutations(['addSongList', 'changeCurrendIndex', 'changeScreen', 'assignLoop']),
    back () {
      this.$router.go(-1)
    },
    randomPlay () {
      const random = parseInt(Math.random() * this.list.length)
      this.openPlay(random)
      this.assignLoop(2)
    },
    openPlay (index) {
      // 点击歌的li 显示播放器
      this.addSongList(this.list)
      // 确定点击的是那首歌
      this.changeCurrendIndex(index)
      // 点击屏幕变大
      this.changeScreen(true)
    },
    initBs () {
      const img = this.$refs.img
      const random = this.$refs.random
      // console.log(this.$refs.random)
      const imgH = img.clientHeight
      const wrapper = this.$refs.wrapper
      this.bs = new BS(wrapper, { probeType: 3, click: true })
      this.bs.on('scroll', ({ y }) => {
        // 获取图片的元素和高度
        if (y >= 0) {
          // 下拉放大
          const precent = 1 + (y / imgH)
          img.style.transform = `scale(${precent})`
          img.style.zIndex = 1
        } else {
          // 向上滚动
          // 没有到顶部 滚动层的层级高
          // 到达顶部额时候 图片的层级高
          if (Math.abs(y) > imgH - 40) {
            img.style.zIndex = 1
            img.style.paddingTop = '0%'
            img.style.height = '40px'
            random.style.display = 'none'
          } else {
            img.style.zIndex = -1
            img.style.paddingTop = '70%'
            img.style.height = 0
            random.style.display = 'flex'
          }
        }
      })
    },
    handleList (list) {
      let result = []
      const mids = []
      result = list.map((item, index) => {
        const { albummid, albumname, singer, songmid, songname } = item.musicData
        const albumUrl = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg?max_age=2592000`
        mids.push(songmid)
        return { albummid, albumname, singer, songmid, songname, albumUrl }
      })
      return { result, mids }
    }
  },
  async created () {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    })
    // console.log('detail创建')
    // console.log(this.$route)
    const { singermid } = this.$route.params
    // 根据歌手mid 发起请求获取数据

    const data = await getSongByMid(singermid)
    // console.log(data.data.data.list)
    const { result, mids } = this.handleList(data.data.data.list)
    // console.log(result, mids)
    // 通过接口 将mids 歌曲的媒体id 换成 音乐地址 之后将数据进行合并
    // const { urls } = await getSongUrlByMid(mids)
    const urls = (await getSongUrlByMid(mids)).data.urls
    // console.log(urls)
    const finalData = []
    for (let index = 0; index < result.length; index++) {
      result[index].audioUrl = urls[index]
      if (urls[index]) {
      // 将不能播放的歌曲去除
        finalData.push(result[index])
      }
    }
    // console.log(finalData)
    this.list = finalData
    this.name = data.data.data.singer_name
    this.avator = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${singermid}.jpg?max_age=2592000`
    this.$nextTick(() => {
      Indicator.close()
      this.initBs()
    })
  }
  // beforeRouteEnter (from, to, next) {
  // // 组件进入之前
  //   next()
  // },
  // async beforeRouteUpdate (to, from, next) {
  //   console.log('组件复用更新的时候执行', from, to)
  //   const { singermid } = to.params
  //   console.log(singermid)
  //   next()
  // }
}
/*
1.显示歌手名 v
2.显示歌手图片 v
3.显示歌单 v
4.返回 v
5.下拉头像放大 v
6.上滑遮住头像 v
7.随机播放
8.点击跳转到播放器页面
*/
</script>
<style lang="less" scoped>
@import '../../style/index.less';
.detail{
  position: fixed;
  top: 0px;
  bottom: 0px;
  background: @white;
  left:0px;
  right: 0px;
  // 头部
  .top{
    height: 40px;
    .w(375);
    // color: @green;
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
  // 头像
  .avator{
    .w(375);
    padding-top: 70%;
    background-size:cover;
    position: absolute;
    top: 0px;
    z-index: -1;
    .random{
      position: absolute;
      top: 206px;
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
  }
  // 歌曲列表
  .songlist{
   position: fixed;
   background: @white;
  //  overflow: hidden;
   top:270px;
   bottom: 0px;
   left:0;
   right: 0;
   .content{
     padding: 10px 30px;
     background: @white;
     li{
       font-size: @fs-s;
       color: #000;
       height: 61px;
       h2{
        height: 20px;
        font-size: 18px;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
       }
       p{
        margin-top:5px;
        height:20px ;
        color: @gray;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
       }
     }
   }
  }
}
</style>
