<template>
  <div class="swiper-container">
    <div class="swiper-wrapper" @click="jump">
      <div class="swiper-slide" v-for="(item,index) in list" :key="index">
        <img :src="item.picUrl" alt />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination" @click="jump"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import axios from 'axios'
import { Indicator, Toast } from 'mint-ui'

export default {
  data () {
    return {
      list: []
    }
  },
  mounted () {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    })
    axios
      .get(
        '/api/music/api/getTopBanner?g_tk=1928093487&inCharset=utf8&outCharset=utf-8&notice=0&format=json&platform=yqq.json&hostUin=0&needNewCode=0&-=recom012845016368453477&data=%7B%22comm%22:%7B%22ct%22:24%7D,%22category%22:%7B%22method%22:%22get_hot_category%22,%22param%22:%7B%22qq%22:%22%22%7D,%22module%22:%22music.web_category_svr%22%7D,%22recomPlaylist%22:%7B%22method%22:%22get_hot_recommend%22,%22param%22:%7B%22async%22:1,%22cmd%22:2%7D,%22module%22:%22playlist.HotRecommendServer%22%7D,%22playlist%22:%7B%22method%22:%22get_playlist_by_category%22,%22param%22:%7B%22id%22:8,%22curPage%22:1,%22size%22:40,%22order%22:5,%22titleid%22:8%7D,%22module%22:%22playlist.PlayListPlazaServer%22%7D,%22new_song%22:%7B%22module%22:%22newsong.NewSongServer%22,%22method%22:%22get_new_song_info%22,%22param%22:%7B%22type%22:5%7D%7D,%22new_album%22:%7B%22module%22:%22newalbum.NewAlbumServer%22,%22method%22:%22get_new_album_info%22,%22param%22:%7B%22area%22:1,%22sin%22:0,%22num%22:10%7D%7D,%22new_album_tag%22:%7B%22module%22:%22newalbum.NewAlbumServer%22,%22method%22:%22get_new_album_area%22,%22param%22:%7B%7D%7D,%22toplist%22:%7B%22module%22:%22musicToplist.ToplistInfoServer%22,%22method%22:%22GetAll%22,%22param%22:%7B%7D%7D,%22focus%22:%7B%22module%22:%22QQMusic.MusichallServer%22,%22method%22:%22GetFocus%22,%22param%22:%7B%7D%7D%7D'
      )
      .then(res => {
        Indicator.close()
        this.list = res.data.data.slider
      })
  },
  watch: {
    list () {
      this.$nextTick(() => {
        /* eslint-disable no-new */
        new Swiper('.swiper-container', {
          loop: true,
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination'
          },

          // 循环模式选项
          autoplay: {
            delay: 2000,
            stopOnLastSlide: false,
            disableOnInteraction: false
          }
        })
      })
    }
  },
  methods: {
    jump () {
      // console.log(this.toast)
      if (this.toast) {
        this.toast.close()
      }
      this.toast = Toast({
        message: '请到歌手、排行、搜索点歌',
        iconClass: 'iconfont icon-x-close',
        duration: 1000
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "~swiper/css/swiper.min.css";
@import "../../style/index.less";

.swiper-container {
  .w(375);
  .h(150);
  img {
    .w(375);
    .h(150);
  }
}
</style>
