//index.js
//获取应用实例
const app = getApp()
const config = require('../../utils/config.js')
const util = require('../../utils/util.js')

Page({
  data: {
    grids: [
      { img: '/static/images/iocn_01.png',src:'../shops/shop/shop', title: '商城' },
      { img: '/static/images/iocn_02.png', src: '../orders/menu/menu', title: '订单' },
      { img: '/static/images/iocn_03.png', src: '../wealths/menu/menu', title: '财富' },
      { img: '/static/images/iocn_04.png', src: '', title: '人员' },
      { img: '/static/images/iocn_05.png', src: '../material/material', title: '素材' },
      { img: '/static/images/iocn_06.png', src: '../mys/my/my', title: '我的' }],
    imgUrls: [
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    mesinfo: [{ notice_info: '数据一' }, { notice_info:'数据二'}],

  },
  onLoad: function () {

    // this.onInitMessageData();

  }
  ,
  onInitMessageData:function (){
    var _this = this;
    var jsonMessage =
    {
      apid: "T2BP42-T48PR0",
      param: {
        "custid": 'JXS27354',
        "fk_user_id": 'oyrv54v1r74Dtx9l5mu8gXmtrT6Y'
      }
    }
    util.onHttpPost(config.baseUrl, jsonMessage, function (res) {
      if (res.errorCode == 0) {
        _this.setData({
          mesinfo: JSON.parse(res.replyContent).list
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
  }


})
