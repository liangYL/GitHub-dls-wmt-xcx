// pages/shops/goods/goods.js
import httpres  from '../../../utils/httpUtils/httpServers.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aa:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var dd = {
    "cust_id": "GA22MV6",
    "pageIndex": "1",
    "pageSize": "10"
    };
    // dd =  {
    //     "Content": "Content",
    //     "javascript": "javascript",
    //     "service": "service",
    //     "aaadf": "aaadf"
    //   }

    httpres.httpRequest('8L0PB2-6T4J6V', '8SUVHMM9CQBM6G4S', '1.0.0', dd)
      .then((datas) => {
        console.log("我是第一个onLoad的datas", datas)
      })
    // httpres.httpRequest('T2BP42-R0T00R', 'A94Q57PIQC9FX6SV', '1.0.0', this.data.testData)
    //   .then((datas) => {
    //     console.log("我是第一个onLoad的datas", datas)
    //   })



    
    this.setData({
      aa: options.pk_id
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