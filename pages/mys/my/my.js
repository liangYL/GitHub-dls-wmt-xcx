// pages/my/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[
      { img: '/static/images/my_icon_01.png', title: '我的客服经理', url: ''},
      { img: '/static/images/my_icon_02.png', title: '我的活动',    url: ''},
      { img: '/static/images/my_icon_03.png', title: '我的信息', url: ''},
      { img: '/static/images/my_icon_04.png', title: '我的提现', url: ''},
      { img: '/static/images/my_icon_05.png', title: '商城订单', url: ''},
      { img: '/static/images/my_icon_06.png', title: '地址管理', url: ''},
      { img: '/static/images/my_icon_07.png', title: '帮助中心', url: ''},

    ],
    userinfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({ userinfo: wx.getStorageSync('userinfo')})


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