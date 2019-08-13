//index.js
//获取应用实例
const app = getApp()
const config = require('../../utils/config.js')
const util = require('../../utils/util.js')

Page({
  data: {
    grids: [
      { img: '/source/images/iocn_01.png',src:'../shops/shop/shop', title: '商城' },
      { img: '/source/images/iocn_02.png', src: '', title: '订单' },
      { img: '/source/images/iocn_03.png', src: '', title: '财富' },
      { img: '/source/images/iocn_04.png', src: '', title: '人员' },
      { img: '/source/images/iocn_05.png', src: '', title: '素材' },
      { img: '/source/images/iocn_06.png', src: '', title: '我的' }],
    imgUrls: [
      'https://www.baidu.com/img/bd_logo1.png',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    mesinfo: [],

  },
  onLoad: function () {

    var _this = this;
    var jsonMessage =
    {
      apid: "T2BP42-T48PR0",
      param: {
        "custid": 'JXS27354',
        "fk_user_id":'oyrv54v1r74Dtx9l5mu8gXmtrT6Y'
      }
    }
    util.onHttpPost(config.baseUrl, jsonMessage ,function(res){
      if (res.errorCode == 0) {
        _this.setData({
          mesinfo: JSON.parse(res.replyContent).list
        })
      }else{
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

  }
})
