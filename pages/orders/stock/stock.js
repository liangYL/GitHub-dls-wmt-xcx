// pages/orders/stock/stock.js
import httpServer from '../../../utils/httpUtils/httpServers.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    xqListData: [],
    showModalStatus: false,
    loadding: false,
    xqLoadding: false,
    pullUpOn: true,
    animationData: "",
  },
  

  hideModal: function () {
    this.setData({
      showModalStatus: false
    })
  },
  onLoad: function (options) {
    this.setData({
      loadding: true
    })
    this.onHttpRequestListData();
  },
  onHttpRequestListData: function () {
    var that = this
    // GA1LEKH,GA2P91B,GA27Z8G
    httpServer.httpRequest('P28T46-HNNV6L', 'O2R7P9KGXSAFON0I', '1.0.0', { "custid": "GA27Z8G" })
      .then((datas) => {
        that.setData({
          loadding: false,
        })
        var res = JSON.parse(datas.replyContent);

        this.setData({
          listData: res
        })
      })

  },
  onHttpRequestListDetail: function (doccode, product_id) {
    var that = this
    // GA1LEKH,GA2P91B
    httpServer.httpRequest('P28T46-08H26L', 'P2JBR716U08VSL6I', '1.0.0', { "doccode": doccode, "product_id": product_id })
      .then((datas) => {
        that.setData({
          xqLoadding: false,
        })
        var res = JSON.parse(datas.replyContent);

        this.setData({
          xqListData: res
        })
      })

  },
  onPullDownRefresh: function () {

    this.setData({
      loadding: false,
      xqLoadding: false,
      showModalStatus: false
    })

    this.onHttpRequestListData();

    wx.stopPullDownRefresh()
  },

  onReachBottom: function () {

  },
  showModal: function (e) {
    // 显示遮罩层
    // 创建动画实例 
    var animation = wx.createAnimation({
      duration: 220,
      timingFunction: "linear",
      delay: 0
    })
    //执行第一组动画：Y轴偏移500px后(盒子高度是500px) ，停
    animation.translateY(500).step()
    //导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
    this.setData({
      xqLoadding: true
    })
    this.onHttpRequestListDetail(e.currentTarget.dataset.doccode, e.currentTarget.dataset.productid);
  },

  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onShareAppMessage: function () {},
})