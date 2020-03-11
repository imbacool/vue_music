<template>
  <div class="search">
    <div class="inputBox">
      <span class="iconfont icon-search"></span>
      <input type="text" placeholder="搜索歌曲、歌手" v-model="value">
      <span class="iconfont icon-x-close" v-show="value.length" @click="delValue"></span>
    </div>

    <div class="wrapper" ref="wrapper">
      <div class="content">
        <div class="hot">
          <p>热门搜索</p>
          <ul>
            <li v-for="(item,index) in hotList" :key="index" @click="addValue(item)">{{item}}</li>
          </ul>
        </div>
        <div class="history" v-show="historyList.length">
          <p>搜索历史
          <span class="iconfont icon-trash" @click="historyList=[]"></span>
          </p>
          <ul>
            <li v-for="(item,index) in historyList" :key="index" @click="addValue(item)">{{item}}
              <span class="iconfont icon-x-close" @click="delHistory(index)"></span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="result-wrapper" ref="resultWrapper" v-show="value.length">
      <div class="content">
        <ul>
          <li v-for="(item,index) in songlist" :key="item.songmid" @click="playSong(index)">
            {{item.songname}}-{{item.singer[0].name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BS from 'better-scroll'
import axios from 'axios'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      hotList: ['我们的歌', '冰雪奇缘2', '张杰', '桥边姑娘', '星辰大海', '哪吒 李宇春', '左手指月', '邓紫棋', '酒醉的蝴蝶', '左肩'],
      historyList: [],
      // resultList: [],
      value: '',
      songlist: []
    }
  },
  methods: {
    ...mapMutations(['addSongList', 'changeCurrendIndex', 'changeScreen']),
    playSong (index) {
      // console.log(this.songlist[index])
      // 点击歌的li 显示播放器
      this.addSongList(this.songlist)
      // 确定点击的是那首歌
      this.changeCurrendIndex(index)
      // 点击屏幕变大
      this.changeScreen(true)
      this.historyList.push(this.value)
      this.value = ''
    },
    delHistory (index) {
      this.historyList.splice(index, 1)
    },
    delValue () {
      this.value = ''
    },
    addValue (item) {
      this.value = item
    }
  },
  mounted () {
    const wrapper = this.$refs.wrapper
    const resultWrapper = this.$refs.resultWrapper
    this.bs = new BS(wrapper, { click: true })
    this.bs2 = new BS(resultWrapper, { click: true })
  },
  watch: {
    value (newVal, oldVal) {
      // console.log(this.value)
      if (this.value.length) {
        const url = `/api/music/api/search?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&w=${this.value}&p=1&perpage=20&n=20&catZhida=1&zhidaqu=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&remoteplace=txt.mqq.all&uin=0&needNewCode=1&platform=h5`
        axios.get(url)
          .then(res => {
            // console.log(res.data.data.song.list)
            this.resultList = res.data.data.song.list

            // 处理数据
            const mids = []
            this.resultList.map(item => {
              const obj = {}
              obj.albummid = item.albummid
              obj.albumname = item.albumname
              obj.singer = item.singer
              obj.songmid = item.songmid
              obj.songname = item.songname
              obj.albumUrl = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albummid}.jpg?max_age=2592000`
              this.songlist.push(obj)
              mids.push(item.songmid)
            })
            // console.log(this.songlist)
            // console.log(mids)
            let urls = []
            axios.post('/aaa/fcj/music/songurl', { mids })
              .then(res => {
                // console.log(res)
                urls = res.data.urls
                // console.log(urls)
                const finalData = []
                for (let index = 0; index < this.songlist.length; index++) {
                  this.songlist[index].audioUrl = urls[index]
                  if (urls[index]) {
                    // 将不能播放的歌曲去除
                    finalData.push(this.songlist[index])
                  }
                }
                // console.log(finalData)
                this.songlist = finalData
                if (this.bs) {
                  this.bs.refresh()
                } else {
                  const wrapper = this.$refs.wrapper
                  this.bs = new BS(wrapper, { click: true })
                }
                if (this.bs2) {
                  this.bs2.refresh()
                } else {
                  const resultWrapper = this.$refs.resultWrapper
                  this.bs2 = new BS(resultWrapper, { click: true })
                }
              })
          })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "../style/index.less";
.search{
  .inputBox{
    .w(335);
    height: 50px;
    border: 5px solid @green;
    border-radius: 30px;
    margin: 20px auto;
    display: flex;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    .icon-search{
      font-size: 20px;
      color: @green;
      margin-right: 5px;
    }
    input{
      .w(280);
      height: 18px;
    }
    .icon-x-close{
      font-size: 20px;
      color: @green;
      margin-left: 5px;
    }
  }
  .hot{
    .w(335);
    height: 168px;
    margin: 0 auto 20px;
    p{
      font-size: 14px;
      margin-bottom: 20px;
    }
    ul{
      height: 134px;
      li{
        float: left;
        background-color: @green;
        color: #fff;
        height: 23px;
        font-size: 14px;
        box-sizing: border-box;
        margin: 0 10px 10px 0;
        padding: 0 10px;
        border-radius: 10px;
        line-height: 23px;
      }
    }
  }
  .history{
    .w(335);
    margin: 0 auto 20px;
    p{
      font-size: 14px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      position: relative;
      .icon-trash{
        font-size: 20px;
        position: absolute;
        right: 18px;
      }
    }
    ul{
      li{
        color: #000;
        height: 30px;
        font-size: 16px;
        box-sizing: border-box;
        margin: 0 10px 15px 0;
        padding: 0 10px;
        border-radius: 10px;
        line-height: 30px;
        display: flex;
        justify-content: space-between;
      }
    }
  }
  .wrapper{
    position: fixed;
    top: 178px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    overflow: hidden;
  }
  .result-wrapper{
    // display: none;
    position: fixed;
    top: 178px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    overflow: hidden;
    background-color: #fff;
    z-index: 2;
    .content{
      padding: 0 20px;
      li{
        color: #000;
        height: 30px;
        font-size: 14px;
        box-sizing: border-box;
        margin: 0 10px 15px 0;
        padding: 0 10px;
        border-radius: 10px;
        line-height: 30px;
        display: flex;
        justify-content: space-between;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
