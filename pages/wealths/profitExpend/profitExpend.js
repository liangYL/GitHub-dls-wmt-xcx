// pages/wealths/profitExpend/profitExpend.js

const util = require('../../../utils/util.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    dropdownShow: false,
    index:0,
    dropdownlist: [],
    dataArray:[],
    all_price: '',
    consume_price: ''
  },
  dropDownList(e) {
    let indexCell = e.currentTarget.dataset.index;
    if (indexCell != 'atitle'){
      this.setData({
        index: indexCell,
      })
    }
    this.setData({
      dropdownShow: !this.data.dropdownShow,
    })
    
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      dropdownlist: util.getDateList()
    })
    var that = this;
    wx.request({
      url: 'https://wx.chinawmt.com/wxMini/api/DLS_GetJYProfit_ZC.ashx',
      data: { "custid": "GA2P91B", "monthdate": "全部" },
      method: 'POST',
      complete(res) {
        var data = JSON.parse(res.data.ReplyContent);
        var zcList = data["ZClist"];
        that.setData({
          dataArray: zcList
          ,consume_price: data["sumconsume_price"]
        })
      }
    })
    
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