// pages/orders/order-detail/order-detail.js
import httpServer from '../../../utils/httpUtils/httpServers.js';
import util from '../../../utils/httpUtils/util.js';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        xqData: {},
        sidx: 1,
        wlData: {},
        wlObj: {},
        orderType: "",
        options:{}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.setData({
            options: options
        })
        
        wx.showLoading({
          title: '加载中',
        })
        var that = this
        // GA1LEKH,GA2P91B  options.pid cdb84899-c392-436c-ab06-3dded84a4dff
        httpServer.httpRequestPrivate('http://ssl.chinawmt.com/mall_api/api/getOrderStatementPay.ashx', {"statement_id":options.pid})
            .then((datas) => {
                wx.hideLoading();

                console.log(datas);
                this.setData({
                    xqData: datas
                })

            });

    },
    qzf: function () {

        wx.showLoading({
            title: '加载中',
          })
        httpServer.httpRequestPrivate('http://ssl.chinawmt.com/mall_api/api/setOrderStatementPay.ashx', {
            open_id: this.data.xqData.open_id,//"付款人微信open_id",
            user_id: this.data.xqData.user_id,//"用户id",
            cust_id: this.data.xqData.cust_id,//"客户erpid",
            statement_id: '9aae29dd-6649-4602-aab1-4755cd298531',//this.data.xqData.statement_id,//"结算单id",
            pay_mode: '101'//this.data.xqData.pay_mode,//支付类型 101 预付定金   201 在线付款
        })
        .then((datas) => {
            wx.hideLoading();

            console.log(datas);
            let wxinfo = datas.pay_item;
            wx.requestPayment({
                'timeStamp': wxinfo.timeStamp,
                'nonceStr': wxinfo.nonceStr,
                'package': 'prepay_id=' + wxinfo.prepay_id,
                'signType': wxinfo.signType,
                'paySign': wxinfo.paySign,
                'success': function (res) {
                    console.log(res);
                    if(res.errMsg == "requestPayment:ok"){
                        util.toastMessage('支付成功');
                        setTimeout(function () {
                            var pages = getCurrentPages();
                            var beforePage = pages[pages.length - 2];
                            beforePage.onPullDownRefresh();
                            wx.navigateBack();
                        }, 2000)
                    }
                },
                'fail': function (res) {
                    if(res.errMsg == "requestPayment:fail cancel"){
                        util.toastMessage('取消支付');
                    }else{
                        util.toastMessage(res.errMsg);
                    }
                }
            })                   

        });

    },







    
    
    onReady: function () {},onShow: function () {},onHide: function () { },onUnload: function () {},onPullDownRefresh: function () {},
    onReachBottom: function () {},onShareAppMessage: function () {}
})