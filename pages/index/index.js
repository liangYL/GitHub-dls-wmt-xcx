//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    grids: [
      { img: '/source/images/iocn_01.png', title: '商城' },
      { img: '/source/images/iocn_02.png', title: '订单' },
      { img: '/source/images/iocn_03.png', title: '财富' },
      { img: '/source/images/iocn_04.png', title: '人员' },
      { img: '/source/images/iocn_05.png', title: '素材' },
      { img: '/source/images/iocn_06.png', title: '我的' }],
    imgUrls: [
      'https://www.baidu.com/img/bd_logo1.png',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    mesinfo: [
      { img: '/source/images/iocn_01.png', title: '通知1' },
      { img: '/source/images/iocn_01.png', title: '通知2' },
      { img: '/source/images/iocn_01.png', title: '通知3' },

    ],

  },
  onLoad: function () {
    
  }
})
