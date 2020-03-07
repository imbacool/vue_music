<template>
  <div class='player' v-if='songList.length'>
    <!-- 大播放器 -->
    <div v-if='fullScreen' class='big'>
    <!-- 头部 -->
     <div class='top'>
       <span @click='changeScreen(false)' class="iconfont icon--fanhui"></span>
       {{currentSong.songname}}
     </div>
     <!-- 背景 -->
     <div class='bg'>
       <img :src="currentSong.albumUrl" alt="">
     </div>
     <!-- 歌手 -->
     <p class='name'>{{currentSong.singer[0].name}}</p>
     <!-- 专辑图片 -->
     <div class='img'>
       <img :class='cd' :src="currentSong.albumUrl" alt="">
     </div>

     <!-- 歌词 -->
     <Lyric :seekTime = 'seekTime' :play='play'></Lyric>

     <!-- 进度条 -->
     <MyProgress
      :startTime = 'startTime'
      :endTime = 'endTime'
      @seekFa='seek'
     ></MyProgress>

     <!-- 播放 -->
     <div class="play-control">
        <span @click='changeLoop' class="iconfont icon-refresh"></span>
        <span>{{loops[loop]}}</span>
        <span @click='prev' class="iconfont icon-arrow-left-circle"></span>
        <span  @click='togglePlay' :class="isPlay"></span>
        <span @click='next' class="iconfont icon-arrow-right-circle"></span>
        <span class="iconfont icon-heart"></span>
     </div>

     <!-- 播放器 -->
     <audio ref='audio'
            @ended='ended'
            @canplay='canplay'
            @timeupdate="timeupdate"
            :src='currentSong.audioUrl'></audio>
    </div>

    <!-- 小播放器 -->
    <div v-else
    class='small'
    @click='changeScreen(true)'
    >
      <img :src="currentSong.albumUrl" alt="">
      <div>
        <p>{{currentSong.songname}}</p>
        <p>{{currentSong.singer[0].name}}</p>
      </div>
      <span  @click='togglePlay' :class="isPlay" @click.stop="changeScreen()"></span>
      <span class="iconfont icon-icqueuemusicpx" @click.stop="changeScreen()" @click="changeList()"></span>

      <!-- 播放器 -->
     <audio ref='audio'
            @ended='ended'
            @canplay='canplay'
            @timeupdate="timeupdate"
            :src='currentSong.audioUrl'></audio>
    </div>

    <!-- 歌曲列表 -->
    <div class="SongList" v-show="show">
      <div class="empty" @click="changeList()"></div>

      <div class="del">
        <span class="iconfont icon-refresh" @click='changeLoop'></span>
        <span>{{loops[loop]}}</span>
        <span class="iconfont icon-trash" @click="trash"></span>
      </div>

      <div class='wrapper' ref='wrapper'>
          <div class='content'>
            <ul>
              <li v-for='(item,index) in songList'
                :key='index'
                >
                <p>{{item.songname}}</p>
              </li>
            </ul>
          </div>
      </div>

      <div class="close" @click="changeList()">关闭</div>
    </div>
  </div>
</template>
<script>
import BS from 'better-scroll'
import MyProgress from './Progress'
import Lyric from './lyrics'
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  components: { MyProgress, Lyric },
  data () {
    return {
      startTime: 0,
      endTime: 0,
      loops: ['单曲循环', '列表循环', '随机循环'],
      play: false,
      seekTime: 0,
      show: false
    }
  },
  computed: {
    ...mapState(['songList', 'fullScreen', 'loop']),
    ...mapGetters(['currentSong']),
    cd () {
      return this.play ? 'cd' : 'cd paused'
    },
    isPlay () {
      return this.play ? 'iconfont icon-play-circle' : 'iconfont icon-pause-circle'
    }
  },
  methods: {
    ...mapMutations(['changeScreen', 'nextCurrendIndex', 'prevCurrendIndex', 'changeCurrendIndex', 'changeLoop', 'delAllSong']),
    togglePlay () {
      this.play = !this.play
    },
    timeupdate (e) {
      // console.log('歌曲播放',e)
      // 随着播放更新时间
      this.startTime = e.target.currentTime
    },
    canplay () {
      // 歌曲可以播放
      this.audio = this.$refs.audio
      // console.log('可以播放了')
      this.audio.play()
      this.play = true
      // console.log(this.audio.__proto__)
      // 获取歌曲的总时长
      this.endTime = this.audio.duration
    },
    seek (s) {
      // console.log('父组件的方法')
      if (!this.audio) { return false }
      // 更改播放的时间
      this.audio.currentTime = s
      // 更改歌词的时间
      this.seekTime = s
    },
    ended () {
      this.play = false
      // console.log('播放完毕', this.loop)
      switch (this.loop) {
        case 0:
          //  单曲循环
          this.play = true
          this.audio.play()
          break
        case 1:
          // 列表相当于下一曲
          this.nextCurrendIndex()
          break
        case 2:
          // 随机播放
          const count = this.songList.length
          const index = parseInt(Math.random() * count)
          // console.log('随机', index)
          this.changeCurrendIndex(index)
          break
        default:
          break
      }
    },
    next () {
      // 下一曲
      this.nextCurrendIndex()
    },
    prev () {
      // 上一曲
      this.prevCurrendIndex()
    },
    changeList () {
      this.show = !this.show
      // console.log(this.show)
    },
    trash () {
      this.delAllSong()
      this.changeList()
    }
  },
  watch: {
    play (newValue, oldValue) {
      // console.log('播放状态', newValue)
      if (!this.audio) return false
      // 点击按钮 还是循环

      if (newValue) {
        this.audio.play()
      } else {
        this.audio.pause()
      }
    },
    songList () {
      this.$nextTick(() => {
        if (this.songList.length) {
          const wrapper = this.$refs.wrapper
          this.bs = new BS(wrapper, { probeType: 3, click: true })
        }
      })
    }
  }
}
/*
1.处理数据
2.显示数据渲染界面 name 歌手 专辑图片
3.专辑图片能动
4.显示歌词
5.控制器 前一曲 后一曲
  循环模式
   单曲循环  播完后在来一遍
   列表循环  播完之后播下个
   随机循环  播完之后随机放一个

6.进度条
  a.随着时间动
  b.可以点击控制歌曲播放
  c.可以拖动控制歌曲的播放

*/
</script>
<style lang="less" scoped>
@import '../../style/index.less';
.player{
  color: #fff;
  .big{
    position: fixed;
    top:0px;
    bottom: 0px;
    left:0;
    right:0;
    background: #fff;
    .top{
      font-size: 18px;
      text-align: center;
      .w(375);
      height: 20px;
      background-color: @green;
      .icon--fanhui{
        position: absolute;
        top: 6px;
        left: 20px;
        color: #fff;
        font-size: 22px;
      }
    }
    .name{
      font-size: 14px;
      text-align: center;
      padding: 10px;
      height: 20px;
      background-color: @green;
    }
    .bg{
      position: absolute;
      z-index: -9;
      top: 0px;
      width: 100%;
      height: 100%;
      filter: blur(15px);
      img{
         width: 100%;
         height: 100%;
      }
    }
    .img{
      text-align: center;
      // background: red;
      .w(375);
      padding: 20px;
      box-sizing: border-box;
      padding-bottom: 73px;
      padding-top: 30px;
      img{
          width: 85%;
          border-radius:50%;
          border: 10px solid @gray;
      }
      & .cd{
        animation: rotate 10s linear infinite;
      }
      & .paused{
        animation-play-state: paused;
      }
    }
    .play-control{
      position: relative;
      display: flex;
      justify-content: space-around;
      align-items: center;
      color: @green;
      height: 40px;
      padding: 15px 20px;
      span:nth-of-type(1),span:nth-of-type(3),span:nth-of-type(5),span:nth-of-type(6){
        font-size: 40px;
      }
      span:nth-of-type(2){
        position: absolute;
        bottom: -5px;
        left: 24px;
        font-size: 14px;
      }
      span:nth-of-type(4){
        font-size: 50px;
      }
    }
  }
  .small{
    position: fixed;
    .w(375);
    bottom: 0px;
    height: 60px;
    background: @green;
    color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img{
      .w(45);
      height: 45px;
      border-radius: 50%;
      padding-left: 10px;
    }
    div{
      display: inline-block;
      .w(205);
      height: 42px;
      p:nth-of-type(1){
        font-size: 14px;
      }
      p:nth-of-type(2){
        font-size: 12px;
      }
    }
    span{
      font-size: 40px;
    }
  }
  @keyframes rotate {
    0% {
     transform: rotate(0deg)
    }
    100%{
      transform: rotate(360deg)
    }
  }
  .SongList{
    .w(375);
    position: fixed;
    top: 240px;
    color: #fff;
    background-color: #fff;
    .empty{
      height: 240px;
      .w(375);
      position: fixed;
      top: 0;
      opacity: 0;
    }
    .del{
      height: 60px;
      background-color: @green;
      display: flex;
      align-items: center;
      justify-content:space-between;
      padding: 0 20px;
      position: relative;
      .icon-refresh{
        font-size: 30px;
      }
      span:nth-of-type(2){
        font-size: 16px;
        position: absolute;
        left: 60px;
      }
      .icon-trash{
        font-size: 20px;
      }
    }
    .wrapper{
      // position: fixed;
      // background: @green;
      overflow: hidden;
      height: 330px;
      // top:50%;
      // bottom: 50px;
      // left:0;
      // right: 0;
      .content{
        // height: 400px;
      // overflow: hidden;
      color: #000;
      background-color: #fff;
      }
    }
    .close{
      height: 50px;
      text-align: center;
      font-size: 16px;
      line-height: 50px;
      background-color: @green;
      position: fixed;
      bottom: 0;
      .w(375);
    }
  }
}
</style>
