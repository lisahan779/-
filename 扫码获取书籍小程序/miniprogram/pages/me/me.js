// miniprogram/pages/me/me.js
const app = getApp()
const db=wx.cloud.database() //数据库
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: wx.getStorageSync('userinfo')||{}
  },
  // 获取oppenid和个人信息，
  onGetUserInfo(e) {
    let userInfo = e.detail.userInfo
    // 获取云函数需要在app.js中添加环境id,
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        userInfo.openid = res.result.openid
        // 调用云函数获取oppenid
        console.log(userInfo)
        this.setData({
          userInfo
        })
        // 写入本地存储
        wx.setStorageSync('userinfo', userInfo)
      }

    })
  },
  addbook(isbn){
// 调用云函数获取数据
  wx.cloud.callFunction({
    name:"getdouban",
    data:{isbn},
    success:({result})=>{
      // 扫描获取图书爬虫获取信息后进行入库操作
      console.log(result) 
      //先在app中指定环境id,爬虫数据文件必须上传并部署,然后入库
      // doubanbook 创建数据库集合并添加内容
      db.collection('doubanbooks').add({
        data:result,
        success: function(res) {
          if(res._id){
            wx.showModal({
              title:"添加成功",
              cancelColor: 'cancelColor',
              // 字符串模板
              content:`《${result.title}》`+"添加成功"
            })
          }
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log(res)
        }
      })
    }
  })
  },
  // 图书的二维码,通过爬虫获取对应数据图书
  scacode(){
   wx.scanCode({
     onlyFromCamera: true,
     scanType: [],
     success: (res) => {console.log(res.result)
    this.addbook(res.result)
    },
     fail: (res) => {},
     complete: (res) => {},
   })
  },
  // onGetOpenid: function() {
  //   // 调用云函数
  //   wx.cloud.callFunction({
  //     name: 'login',
  //     data: {},
  //     success: res => {
  //       console.log('[云函数] [login] user openid: ', res.result.openid)
  //       app.globalData.openid = res.result.openid
  //       wx.navigateTo({
  //         url: '../userConsole/userConsole',
  //       })
  //     },
  //     fail: err => {
  //       console.error('[云函数] [login] 调用失败', err)
  //       wx.navigateTo({
  //         url: '../deployFunctions/deployFunctions',
  //       })
  //     }
  //   })
  // },
  
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})