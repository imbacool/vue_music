import axios from 'axios'
// 获取歌手歌单
const getSongByMid = (singermid) => {
  const url = '/aaa/fcj/music/songListById'
  return axios.post(url, { singermid })
}
// 根据mids 获取播放的url地址
const getSongUrlByMid = (mids) => {
  const url = '/aaa/fcj/music/songurl'
  return axios.post(url, { mids })
}

export { getSongByMid, getSongUrlByMid }
