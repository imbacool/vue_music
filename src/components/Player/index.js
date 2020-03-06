import axios from 'axios'
// 根据mid获取歌词
const getLyricByMid = (songmid) => {
  const url = '/aaa/fcj/music/lyric'
  return axios.post(url, { songmid })
}

export { getLyricByMid }
