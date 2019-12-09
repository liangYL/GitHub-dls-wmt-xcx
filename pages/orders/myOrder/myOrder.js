//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    navData: [{
      text: '代发货',
      src: '/static/images/iocn_order_10.png',
      selSrc: '/static/images/iocn_order_05.png'
    },
    {
      text: '待收货',
      src: '/static/images/iocn_order_11.png',
      selSrc: '/static/images/iocn_order_06.png'
    },
    {
      text: '待评价',
      src: '/static/images/iocn_order_12.png',
      selSrc: '/static/images/iocn_order_07.png'
    },
    {
      text: '全部',
      src: '/static/images/iocn_order_13.png',
      selSrc: '/static/images/iocn_order_08.png'
    }
    ],
    dataArray: [{
      text: '代发货'
    },
    {
      text: '待收货'
    },
    {
      text: '待评价'
    },
    {
      text: '全部'
    }
    ],
    currentTab: 0,
    navScrollLeft: 0,
  },
  //事件处理函数
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })
  },
  switchNav(event) {
    var cur = event.currentTarget.dataset.current;
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中                            
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    })
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  switchTab(event) {
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 5;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
    });
  },
  onPullDownRefresh: function () {
    console.log('111');
    wx.showToast({
      title: '下拉刷新',
      icon: "none"
    })
    this.setData({
      dataArray: [{
        text: '代发货'
      },
      {
        text: '待收货'
      },
      {
        text: '待评价'
      },
      {
        text: '全部'
      }
      ]
    })
    wx.stopPullDownRefresh();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('222');
    this.setData({
      dataArray: this.data.dataArray.concat([{
        text: '1111'
      }, {
        text: '2222'
      }])
    })
    wx.showToast({
      title: '加载更多',
      icon: "none"
    })
  }
})