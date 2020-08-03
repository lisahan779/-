//index.js
const app = getApp()
const db = wx.cloud.database() //引入数据库
Page({
  data: {
    books: []
  },
  getlist: function (init) {
    wx.showLoading({
      title: '加载中',
    })
    // init初始化，直接渲染
    // 获取数据库所有数据，最多20条，可使用limit ,skip来跳转
    // 查询的时候进行排序orderBy('create_time','desc')
    if (init) {
      this.setData({
        page: 0
      })
    }
    const PAGE = 3
    const offset = this.data.page * PAGE
    let ret = db.collection('doubanbooks').orderBy('create_time', 'desc')
    if (this.data.page > 0) {
      // 跳过所分的页数
      ret = ret.skip(offset)
    }
    // 从0 开始
    ret = ret.limit(PAGE).get().then(res => {
      if (init) {
        this.setData({
          books: res.data
        })
      } else {
        // 不是初始化就进行追加数据
        this.setData({
          books: [...this.data.books, ...res.data]
        })
        // 加载完成后清除
        wx.hideLoading()
      }
      console.log(2, res.data)
    })
  },
  // 下拉刷新需要在jason中配置
  onPullDownRefresh: function () {
    console.log("下拉")
    this.getlist(true)
  },
  onLoad: function () {
    this.getlist(true)
  },
  // 到达底部加载更多
  onReachBottom: function () {
    this.setData({
      page: this.data.page + 1
    }, () => {
      // 不传init不初始化
      this.getlist()
    })
    console.log("到底了")
  }
})