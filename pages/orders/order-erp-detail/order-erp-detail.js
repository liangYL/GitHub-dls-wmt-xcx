// pages/orders/order-detail/order-detail.js
import httpServer from '../../../utils/httpUtils/httpServers.js';
import util from '../../../utils/httpUtils/util.js';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        xqData:{},
        sidx:1,
        wlData:{},
        wlObj:{},
        animationData: "",
        showModalStatus: false,
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
        var that = this
        // GA1LEKH,GA2P91B
        httpServer.httpRequest('0BD80D-4X6BB6', 'VGNMCOR8CQKP5NH9', '1.0.0', { "doccode": options.doccode,"orderfrom": options.orderfrom})
            .then((datas) => {
               
                var res = JSON.parse(datas.replyContent);

                
                if(res.length >0){
                    this.setData({
                        xqData: res[0]
                    })
                    var idx = 1;
                    if(res[0].orderstatus == '待发货'){
                        idx =  2;
                    }
                    if(res[0].orderstatus == '待收货'){
                        idx =   3;
                    }
                    if(res[0].orderstatus == '已完成'){
                        idx =  4;
                    }
                    this.setData({
                        sidx: idx
                    })
                }
                

            }).catch((datas) => {
                util.toastMessage(datas.errorMessage);
            });

            this.onHttpWlDetail(options.doccode);
          
    },
    xcwl: function(e){
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
       
        this.onHttpWlDetail(e.currentTarget.dataset.orderId);
    },
    qzf:function(){
     
            wx.showLoading({
              title: '加载中',
            })
            httpServer.httpRequestPrivate('http://ssl.chinawmt.com/mall_api/api/setOrderErpPay.ashx', {
                open_id: this.data.xqData.open_id,//"付款人微信open_id",
                user_id: this.data.xqData.user_id,//"用户id",
                cust_id: this.data.xqData.cust_id,//"客户erpid",
                order_sn: this.data.options.doccode,//this.data.options.doccode,//"结算单id",
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
    onHttpWlDetail: function (orderId) {
        var that = this
        orderId = "WOB201912250492A";
        // GA1LEKH,GA2P91B
        httpServer.httpRequest('0BD80D-BBB02D', 'P00QT79WZ9S2DJMJ', '1.0.0', { "order_id": orderId})
            .then((datas) => {
               
                var res = JSON.parse(datas.replyContent);

                this.setData({
                    wlData: res.reverse(),
                    wlObj:res.reverse()[0]
                })
            }).catch((datas) => {
             
                wx.showToast({
                    title: datas.errorMessage, //提示文字
                    duration: 2000, //显示时长
                    icon: "none",
                    mask: true
                })
            });

    },
    hideModal: function () {
        this.setData({
            showModalStatus: false
        })
    },
       


    
    
    onReady: function () {},onShow: function () {},onHide: function () { },onUnload: function () {},onPullDownRefresh: function () {},
    onReachBottom: function () {},onShareAppMessage: function () {}
})