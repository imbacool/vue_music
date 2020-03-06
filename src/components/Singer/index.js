import jsonp from 'jsonp'

function nomalData (data) {
  //  处理数据
  const obj = { hot: [] }
  // 按照首字母进行分组
  for (let index = 0; index < data.length; index++) {
    const { Findex, Fother_name, Fsinger_mid, Fsinger_name } = data[index]
    const avator = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${Fsinger_mid}.jpg?max_age=2592000`
    const singerItem = { Findex, Fother_name, Fsinger_mid, Fsinger_name, avator }
    // 将前10条数据加入到最热内部
    if (index < 10) {
      obj.hot.push(singerItem)
    }
    if (!obj[Findex]) {
      // 新建的操作下标操作
      obj[Findex] = [singerItem]
    } else {
      // 向首字母里添加歌手
      obj[Findex].push(singerItem)
    }
  }
  // 将对象转变为数组
  const hot = []
  const other = []
  for (const key in obj) {
    if (key === 'hot') {
      hot.push({ Findex: key, list: obj[key] })
    } else if (key != 9) {
      other.push({ Findex: key, list: obj[key] })
    }
  }
  // 按照下标进行排序
  other.sort((a, b) => { return a.Findex.charCodeAt() - b.Findex.charCodeAt() })
  // 将最热和排序过的数据进行合并
  const result = hot.concat(other)
  return result
}

const getSingersData = () => {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&hostUin=0&needNewCode=0&platform=yqq'
  // param给后端传递函数名的字段 由后端确定的 不能随便写
  return new Promise((resolve, reject) => {
    jsonp(url, { param: 'jsonpCallback' }, (err, data) => {
      if (err) { reject(err) } else { resolve(data) }
    })
  })
}

export { nomalData, getSingersData }
