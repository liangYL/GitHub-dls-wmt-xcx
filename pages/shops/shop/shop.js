// pages/shops/shop/shop.js

const config = require('../../../utils/config.js')
const util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataArray:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var _this = this;

    var jsonMessage = {
      apid: "L0PJ44-2XB00N",
      param: {
        goods_name: '',
        sale_condition: 'synthesis', //synthesis 代表综合，sale_amount 代表销量，price代表价格,recommend_sort 代表热门推荐
        sale_value: 'desc', //升序/降序[asc,desc] 
        brand: '', //品牌
        series: '', //系列
        flavor: '', //香型
        degree: '', //度数
        is_rebate: '', //是否返利 1/0
        pageIndex: '1',
        pageSize: '10',
      }

    }
    util.onHttpPost(config.baseUrl, jsonMessage, function (res) {
      if (res.errorCode == 0) {
        var listdata = JSON.parse(res.replyContent).list;
        for (var i = 0; i < listdata.length; i++) {
          if (!!listdata[i].goods_cover){
            listdata[i].goods_cover = JSON.parse(listdata[i].goods_cover);
          }
        }
        _this.setData({
          dataArray: listdata
        })
      } else {
        wx.showModal({
          title: '失败提醒',
          content: res.replyContent,
          confirmText: "确定",
          cancelText: "取消",
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击主操作')
            } else {
              console.log('用户点击辅助操作')
            }
          }
        });
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