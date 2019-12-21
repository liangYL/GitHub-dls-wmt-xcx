// pages/wealths/profitIncome/profitIncome.js
import httpServer from '../../../utils/httpUtils/httpServers.js';

Page({
  data: {
    cur: true,
    currentTab: 0,
    rebate: {},
    navbar: [{ name: "返利收入" }, { name: "返利支出" }],
    inLoadding: false,
    inPullUpOn: true,
    inPageIndex: 1,
    inCardList: [],
    exLoadding: false,
    exPullUpOn: true,
    exPageIndex: 1,
    exCardList: []
  },
  change: function (e) {

    if (this.data.inLoadding) return;
    if (this.data.exLoadding) return;

    this.setData({
      currentTab: e.detail.index,
      cur: e.detail.index == "1" ? false : true
    })
    if (this.data.cur) {
      if (this.data.inCardList.length == 0) {
        this.setData({
          inLoadding: true
        })
        this.onHttpRequest();
      }
    } else {
      if (this.data.exCardList.length == 0) {
        this.setData({
          exLoadding: true
        })
        this.onHttpRequest();
      }
    }
  },
  onHttpRequest: function () {

    var cust_id = this.data.cur ? "GA22MV6-" : "GA22MV6";//GA22MV6,GA2P91B
    var pageIndex = this.data.cur ? this.data.inPageIndex : this.data.exPageIndex;
    var http_id = this.data.cur ? "8L0PB2-6T4J6V" : "8L0PB2-46ZX62";
    var http_code = this.data.cur ? "8SUVHMM9CQBM6G4S" : "Q1P2O0D9YCLG3FWB";

    var resData = {
      "cust_id": cust_id,
      "pageIndex": pageIndex,
      "pageSize": "10"
    };
    if (!this.data.cur) {
      resData["month"] = '全部'
    }

    var that = this
    httpServer.httpRequest(http_id, http_code, '1.0.0', resData)
      .then((datas) => {
        that.setData({
          inLoadding: false,
          exLoadding: false
        })

        var arr = JSON.parse(datas.replyContent);
        if (arr.length == 0) {
          if (that.data.cur) {
            that.setData({
              inPullUpOn: that.data.inCardList.length == 0 ? true : false
            })
          } else {
            that.setData({
              exPullUpOn: that.data.exCardList.length == 0 ? true : false
            })
          }
          return;
        }

        for (var obj in arr) {
          arr[obj]['title'] = {
            text: arr[obj].doccode,
            color: "#333333",
            size: 32
          };
          arr[obj]['tag'] = {
            text: arr[obj].enterdate,
            color: "#999999",
            size: 32
          };
        }
        if (that.data.cur) {

          if (that.data.inPageIndex == 1) {
            that.setData({
              inCardList: arr
            })
          } else if (that.data.inPageIndex > 1) {
            that.setData({
              inCardList: that.data.inCardList.concat(arr)
            })
          }

        } else {

          if (that.data.exPageIndex == 1) {
            that.setData({
              exCardList: arr
            })
          } else if (that.data.exPageIndex > 1) {
            that.setData({
              exCardList: that.data.exCardList.concat(arr)
            })
          }
        }

      })

  },
  onHttpRequestHeadData: function () {
    var that = this

    httpServer.httpRequest('8L0PB2-P68862', 'L1F3LED8WP1V4IE2', '1.0.0', { "custid": "GA22MV6" })
      .then((datas) => {

        var res = JSON.parse(datas.replyContent);

        this.setData({
          rebate: res
        })
      })

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

    if (this.data.cur) {
      this.setData({
        inLoadding: true,
        inPullUpOn: true,
        inPageIndex: 1,
        inCardList: []
      })
    } else {
      this.setData({
        exLoadding: true,
        exPullUpOn: true,
        exPageIndex: 1,
        exCardList: []
      })
    }

    this.onHttpRequest();

    wx.stopPullDownRefresh()

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.cur && !this.data.inPullUpOn) return;
    if (!this.data.cur && !this.data.exPullUpOn) return;

    if (this.data.cur) {
      this.setData({
        inLoadding: true,
        inPageIndex: this.data.inPageIndex + 1
      }, () => {
        this.onHttpRequest();
      })
    } else {
      this.setData({
        exLoadding: true,
        exPageIndex: this.data.exPageIndex + 1
      }, () => {
        this.onHttpRequest();
      })
    }
  },


  /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {

    this.setData({
      inLoadding: true
    })
    this.onHttpRequestHeadData();
    this.onHttpRequest();

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})