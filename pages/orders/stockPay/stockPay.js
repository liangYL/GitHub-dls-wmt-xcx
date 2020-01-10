// pages/orders/stockPay/stockPay.js
import httpServer from '../../../utils/httpUtils/httpServers.js';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        options:null,
        thNum: 1,
        colcur: false,
        thData: null,
        addRessData: null
    },
    selectAddressClick: function () {
        wx.navigateTo({
            url: '../stock/stock',
        })
    },
    submitClick: function () {
        wx.showLoading({
            title: '加载中',
            mask:true
        })
        const that = this
        // GA1LEKH,GA2P91B,GA27Z8G
        httpServer.httpRequest('P28T46-HNNV6L', 'O2R7P9KGXSAFON0I', '1.0.0', {
            "custid": "GA27Z8G",
            "doccode": that.options.doccode,
            "product_id": that.options.product_id
        }).then((datas) => {
            wx.hideLoading(); 
            var res = JSON.parse(datas.replyContent);
            if (res[0].wtqty == that.data.thData.wtqty){
                wx.showModal({
                    title: '提示',
                    content: '确定提货吗?',
                    success(res) {
                        if (res.confirm) {
                            that.setSubmitData();
                        } else if (res.cancel) { }
                    }
                })
            }else{
                that.setData({
                    thData: res[0],
                    thNum: 1
                })
                wx.showToast({
                    title: "剩余库存发生变化,请重新选择", //提示文字
                    duration: 2000, //显示时长
                    icon: "none",
                    mask: true
                })
            }
            
        })


       
    },
    setSubmitData: function () {
        var ressData = {
            "fk_user_address": 'a4ab399f-15cf-4ec3-93a1-7fb42178f430', //地址主键
            "province": '37',
            "province_name": '湖南',
            "city": "3711",
            "city_name": "永州市",
            "area": "371107",
            "area_name": "零陵区",
            "street": "37110764",
            "street_name": "中山北路",
            "specific_address": "测试测试测试",
        }
        this.setData({
            addRessData: ressData
        })

        const userinfo = {
            // "pk_id": "fdc1019c-8594-4b51-8c5d-3c97e3c50573",
            // "nick_name": "张东升",
            // "open_id": "oyrv54mOpfynk3i-cpmY04k6KTJw",
            "pk_id": "F41ABE52-9617-4DDD-8D37-DCA8A82D50E6",
            "nick_name": "郑勇帅",
            "open_id": "oyrv54n2NgN-s5UEinQ3NJKAyGaM",
        };
        var subData = {
            "fk_user": userinfo.pk_id,
            "fk_user_name": userinfo.nick_name,
            "custid": this.data.thData.custid,
            "custname": this.data.thData.custname,
            "doccode": this.data.thData.doccode,
            "product_id": this.data.thData.product_id,
            "product_name": this.data.thData.product_name,
            "th_qty": this.data.thNum,
            "fk_pay_id": '0000', //插入提货支付单返回的提货记录单 pk_id
            "fk_user_address": this.data.addRessData.fk_user_address, //地址主键
            "province": this.data.addRessData.province,
            "province_name": this.data.addRessData.province_name,
            "city": this.data.addRessData.city,
            "city_name": this.data.addRessData.city_name,
            "area": this.data.addRessData.area,
            "area_name": this.data.addRessData.area_name,
            "street": this.data.addRessData.street,
            "street_name": this.data.addRessData.street_name,
            "specific_address": this.data.addRessData.specific_address,
        }
        // if (this.data.thData.cqfee > 0) {
            subData["open_id"] = userinfo.open_id;
            subData["pay_money"] = 10;//this.data.thData.cqfee;
            subData["fk_pay_id"] = '';
            this.onHttpRequestWxSubmitData(subData);
        // } else {
        //     this.onHttpRequestSubmitData(subData);
        // }


    },
    onHttpRequestData: function (doccode, product_id) {
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        var that = this
        // GA1LEKH,GA2P91B,GA27Z8G
        httpServer.httpRequest('P28T46-HNNV6L', 'O2R7P9KGXSAFON0I', '1.0.0', {
            "custid": "GA2P91B",
            "doccode": doccode,
            "product_id": product_id
        }).then((datas) => {
                wx.hideLoading();
                var res = JSON.parse(datas.replyContent);

                that.setData({
                    thData: res[0]
                })
            })
    },
    onHttpRequestSubmitData: function (subData) {
        var that = this
        wx.showLoading({
            title: '提货中',
            mask: true
        })
        // GA1LEKH,GA2P91B,GA27Z8G
        httpServer.httpRequest('P28T46-Z84FD8', '8RTR9I3RX4RVKJWC', '1.0.0', subData)
            .then((datas) => {
                wx.hideLoading(); 

                if (datas.errorCode == 0) {
                    wx.showToast({
                        title: "提货成功", //提示文字
                        duration: 2000, //显示时长
                        icon: "none",
                        mask: true,
                        success:function(){
                            setTimeout(function () {
                                var pages = getCurrentPages();
                                var beforePage = pages[pages.length - 2];
                                beforePage.onHttpRequestListData();
                                wx.navigateBack();
                            }, 2000)
                        }
                    })
                } else {
                    wx.showToast({
                        title: datas.errorMessage, //提示文字
                        duration: 2000, //显示时长
                        icon: "none",
                        mask: true
                    })
                }
            })
    },
    onHttpRequestWxSubmitData: function (subData) {
        wx.request({
            url: "https://wx.chinawmt.com/XCX_Pay/Api/XCX_Tihuo_Pay.ashx",
            data: subData,
            method: "POST",
            success: (res) => {
                if (res.statusCode == 200) {
                    var datas = res.data;
                    if (datas.errorCode == 0) {

                        var wxinfo = JSON.parse(datas.ReplyContent)
                        wx.requestPayment({
                            'timeStamp': wxinfo.timeStamp,
                            'nonceStr': wxinfo.nonceStr,
                            'package': 'prepay_id=' + wxinfo.prepay_id,
                            'signType': wxinfo.signType,
                            'paySign': wxinfo.paySign,
                            'success': function (res) {
                                console.log(res);
                                wx.showToast({
                                    title: res,
                                    duration: 2000,
                                    icon: "none",
                                    mask: true
                                })
                            },
                            'fail': function (res) {
                                console.log('fail:' + JSON.stringify(res));
                                wx.showToast({
                                    title: 'fail:' + JSON.stringify(res),
                                    duration: 2000,
                                    icon: "none",
                                    mask: true
                                })
                            }
                        })
                    } else {
                        wx.showToast({
                            title: datas.ReplyContent ? datas.ReplyContent : datas.errorMessage,
                            duration: 2000,
                            icon: "none",
                            mask: true
                        })
                    }
                } else {
                    wx.showToast({
                        title: "请求失败", //提示文字
                        duration: 2000, //显示时长
                        icon: "none",
                        mask: true
                    })
                }
                
            },
            fail: (res) => {
                wx.showToast({
                    title: res.data.error, //提示文字
                    duration: 2000, //显示时长
                    icon: "none",
                    mask: true
                })
            }
        })
    },
    change: function (e) {
        this.setData({
            thNum: e.detail.value
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
        
        this.setData({
            options: options
        });
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




// {
// 	"open_id": "oyrv54mOpfynk3i-cpmY04k6KTJw",
// 	"pk_id": "fdc1019c-8594-4b51-8c5d-3c97e3c50573",
// 	"user_state": 2,
// 	"cust_id": "GA27Z8G",
// 	"dealer_level": "2",
// 	"cust_name": "张东升",
// 	"mobile": "13702085039",
// 	"cust_level": 2,
// 	"levelname": "一星",
// 	"sum_jy_profit": 128.0000,
// 	"ky_jy_profit": 128.0000,
// 	"sum_xj_profit": 1633.7600,
// 	"ky_xj_profit": 0.7600,
// 	"by_money": 6994.0000,
// 	"hrcode": "46159",
// 	"hrname": "鲍晓博",
// 	"hrmobile": "",
// 	"dls_status": "正",
// 	"head_imgurl": null,
// 	"nick_name": null,
// 	"sex": null,
// 	"birthday": null,
// 	"is_birthday": false,
// 	"head_media_id": null,
// 	"wx_head_imgurl": null,
// 	"by_jy_profit": 0.0000,
// 	"zong_jy_profit": 128.0000,
// 	"free_xj_profit": 0.0000,
// 	"total_integral": 0,
// 	"xx_hrcode": "",
// 	"xx_hrname": "",
// 	"rights_etime": "2020-07-24",
// 	"is_coupon_1000_client": false,
// 	"notice_Msg": {
// 		"NoticeId": null,
// 		"NoticeCode": null,
// 		"NoticeName": null,
// 		"NoticeContent": null,
// 		"NoticeSummary": null,
// 		"NoticeURL": null
// 	}
// }