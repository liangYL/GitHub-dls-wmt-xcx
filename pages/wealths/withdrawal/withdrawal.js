// pages/wealths/withdrawal/withdrawal.js
const form = require("../../../components/utils/formValidation.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // region: ['北京市', '北京市'],
    // customItem: '全部'
    select: [0, 0],
    region:[]
  },
  onRegionChange: function(e) {
    console.log(e.detail);
    this.setData({
      select: e.detail.select,
      region: e.detail.region
    })
  },
  formSubmit: function(e) {
    //表单规则
    let rules = [{
      // name: "address",
      // rule: ["required"],
      // msg: ["请选择地址"]
    }, {
      name: "account_name",
      rule: ["required", "isChinese", "minLength:2", "maxLength: 8"], //可使用区间，此处主要测试功能
      msg: ["请输入持卡人姓名", "姓名必须全部为中文", "姓名必须2个或以上字符", "姓名不能超过8个字符"]
    }, {
      name: "account_num",
      rule: ["required", "isBankCard"],
      msg: ["请输入银行卡号", "请输入正确的银行卡号"]
    }, {
      name: "bank_name",
      rule: ["required", "isChinese", "minLength:2", "maxLength:  10"], //可使用区间，此处主要测试功能
      msg: ["请输入银行名称", "银行名称必须全部为中文", "银行名称必须2个或以上字符", "银行名称不能超过8个字符"]
    }, {
      name: "zh_bank_name",
      rule: ["required", "isChinese", "minLength:2", "maxLength: 16"], //可使用区间，此处主要测试功能
      msg: ["请输入银行支行名称", "银行支行必须全部为中文", "银行支行必须2个或以上字符", "银行支行不能超过16个字符"]
    }];
    if(this.data.region.length == 0){
        wx.showToast({
          title: "请选择地址",
          icon: "none"
        });
        return;
    }

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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})