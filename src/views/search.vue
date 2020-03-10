<template>
  <div class="search">
    <div class="inputBox">
      <span class="iconfont icon-search"></span>
      <input type="text" placeholder="搜索歌曲、歌手">
      <span class="iconfont icon-x-close"></span>
    </div>

    <div class="wrapper" ref="wrapper">
      <div class="content">
        <div class="hot">
          <p>热门搜索</p>
          <ul>
            <li v-for="(item,index) in hotList" :key="index">{{item}}</li>
          </ul>
        </div>
        <div class="history">
          <p>搜索历史
          <span class="iconfont icon-trash"></span>
          </p>
          <ul>
            <li v-for="(item,index) in historyList" :key="index">{{item}}
              <span class="iconfont icon-x-close"></span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="result-wrapper" ref="resultWrapper">
      <div class="content">
        <ul>
          <li v-for="(item,index) in resultList" :key="index">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BS from 'better-scroll'
export default {
  data () {
    return {
      hotList: ['我们的歌', '冰雪奇缘2', '张杰', '桥边姑娘', '星辰大海', '哪吒 李宇春', '左手指月', '邓紫棋', '酒醉的蝴蝶', '左肩'],
      historyList: ['111', '222', '333', '111', '222', '333', '111', '222', '333'],
      resultList: ['111', '222', '333', '111', '222', '333', '111', '222', '333', '111', '222', '333']
    }
  },
  created () {},
  mounted () {
    const wrapper = this.$refs.wrapper
    const resultWrapper = this.$refs.resultWrapper
    this.bs = new BS(wrapper, { click: true })
    this.bs2 = new BS(resultWrapper, { click: true })
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
    display: none;
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
}
</style>
