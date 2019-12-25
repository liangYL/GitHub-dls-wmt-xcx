// pages/orders/stockPay/stockPay.js
import httpServer from '../../../utils/httpUtils/httpServers.js';
const form = require("../../../components/utils/formValidation.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: 1, 
    colcur: false,
    aData: null,
    addRessData:null
  },
  selectAddressClick: function(){
    wx.navigateTo({
      url: '../stock/stock',
    })
  },
  onHttpRequestData: function (doccode, product_id) {
    var that = this
    // GA1LEKH,GA2P91B,GA27Z8G
    httpServer.httpRequest('P28T46-HNNV6L', 'O2R7P9KGXSAFON0I', '1.0.0', { "custid": "GA27Z8G", "doccode": doccode, "product_id": product_id })
      .then((datas) => {
        // that.setData({
        //   loadding: false,
        // })
        var res = JSON.parse(datas.replyContent);

        that.setData({
          aData: res[0]
        })
      })

  },
  formSubmit: function (e) {
    //表单规则
    let rules = [{
      name: "address",
      rule: ["required"],
      msg: ["请选择地址"]
    }
    // , 
    // {
    //   name: "account_name",
    //   rule: ["required", "isChinese", "minLength:2", "maxLength: 8"],
    //   msg: ["请输入持卡人姓名", "姓名必须全部为中文", "姓名必须2个或以上字符", "姓名不能超过8个字符"]
    // }, {
    //   name: "account_num",
    //   rule: ["required", "isBankCard"],
    //   msg: ["请输入银行卡号", "请输入正确的银行卡号"]
    // }, {
    //   name: "bank_name",
    //   rule: ["required", "isChinese", "minLength:2", "maxLength:  10"],
    //   msg: ["请输入银行名称", "银行名称必须全部为中文", "银行名称必须2个或以上字符", "银行名称不能超过8个字符"]
    // }, {
    //   name: "zh_bank_name",
    //   rule: ["required", "isChinese", "minLength:2", "maxLength: 16"], 
    //   msg: ["请输入银行支行名称", "银行支行必须全部为中文", "银行支行必须2个或以上字符", "银行支行不能超过16个字符"]
    // }
    ];

    //进行表单检查
    let formData = e.detail.value;
    let checkRes = form.validation(formData, rules);
    if (!checkRes) {
      wx.showToast({
        title: "验证通过!",
        icon: "none"
      });
    } else {
      wx.showToast({
        title: checkRes,
        icon: "none"
      });
    }
  },
  change: function (e) {
    this.setData({
      value: e.detail.value
    })
  },
  colchange: function (e) {

    this.setData({
      colcur: !this.data.colcur
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.onHttpRequestData(options.doccode, options.product_id);
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