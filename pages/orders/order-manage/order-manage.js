// pages/orders/order-manage/order-manage.js
import httpServer from '../../../utils/httpUtils/httpServers.js';
import util from '../../../utils/httpUtils/util.js';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [ {
            name: "待付款",
        }, {
            name: "待发货",
        }, {
            name: "待收货",
        }, {
            name: "已完成",
        }, {
            name: "全部",
        }],
        orderData: [ [], [], [], [], []],
        currentTab: 0,
        scrollTop: 0,
        scrolls: [0,0,0,0,0],
        winHeight: 0,
        loaddings:[false,false,false,false,false],
        pullUpOns:[false,false,false,false,false],
        pageindexs:[1,1,1,1,1],
        animationData: "",
        showModalStatus: false,
        wlData:[]
    },

    change(e) {
        this.hideModal();
        var scs =  this.data.scrolls;
        scs[this.data.currentTab] = this.data.scrollTop;
        this.setData({
            scrolls: scs
        })       
        this.setData({
            currentTab: e.detail.index
        })
        wx.pageScrollTo({
            scrollTop: this.data.scrolls[e.detail.index],
            duration: 0
        })    

        if(this.data.orderData[this.data.currentTab].length ==0){

            wx.showNavigationBarLoading() //在标题栏中显示加载

            this.onHttpOrderList();
        }

    },
    toPageDetails: function(e){
        
        if(e.currentTarget.dataset.orderfrom == "ERP"){
            wx.navigateTo({
                url: '../order-erp-detail/order-erp-detail?doccode='+e.currentTarget.dataset.doccode+"&orderfrom="+e.currentTarget.dataset.orderfrom
              })
        }else if(e.currentTarget.dataset.orderfrom == "XCX"){
            wx.navigateTo({
                url: '../order-xcx-detail/order-xcx-detail?doccode='+e.currentTarget.dataset.doccode+"&orderfrom="+e.currentTarget.dataset.orderfrom+"&pid="+e.currentTarget.dataset.pid
              })
        }
    },
    ljfk: function(e){
        if(e.currentTarget.dataset.orderfrom == "ERP"){
            wx.navigateTo({
                url: '../order-erp-detail/order-erp-detail?doccode='+e.currentTarget.dataset.doccode+"&orderfrom="+e.currentTarget.dataset.orderfrom+"&type="+e.currentTarget.dataset.type
              })
        }else if(e.currentTarget.dataset.orderfrom == "XCX"){
            wx.navigateTo({
                url: '../order-xcx-detail/order-xcx-detail?doccode='+e.currentTarget.dataset.doccode+"&orderfrom="+e.currentTarget.dataset.orderfrom+"&type="+e.currentTarget.dataset.type+"&pid="+e.currentTarget.dataset.pid
              })
        }
    },
    txfh: function(e){
        var that = this,
        cust_id = "GA27Z8G",
        fk_user = "fdc1019c-8594-4b51-8c5d-3c97e3c50573",
        order_sn ="WOB201912250492A";
        // GA1LEKH,GA2P91B
        httpServer.httpRequest('0BD80D-H4TJH8', 'OHT7HQWY0DNJCTE5', '1.0.0', { "cust_id": cust_id,"fk_user": fk_user,"order_sn": order_sn,})
            .then((datas) => {
                wx.showToast({
                    title: datas.replyContent==""?datas.errorMessage:datas.replyContent, //提示文字
                    duration: 2000, //显示时长
                    icon: "none",
                    mask: true
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
    onHttpOrderList: function () {
        var that = this
        var orderDataJson = {
            custid: "GA27Z8G",
            orderstatus:  this.data.tabs[this.data.currentTab].name,
            pageindex: this.data.pageindexs[this.data.currentTab],
            pagenum: "10",
        }

        var that = this;
        // GA1LEKH,GA2P91B,GA27Z8G
        httpServer.httpRequest('0BD80D-2LV44R', 'CS7E0VBMBICCBS7Q', '1.0.0', orderDataJson)
            .then((datas) => {
                wx.hideNavigationBarLoading();

                var idx = that.data.currentTab;
                var orderdata = that.data.orderData;
                var lod = that.data.loaddings;
                var ppo = that.data.pullUpOns;
        
                lod[idx] = false;
        
                this.setData({
                    loaddings: lod,
                })
               
                var res = JSON.parse(datas.replyContent);

                if(res.length==0 && orderdata[idx].length!=0){
                    ppo[idx] = true;
                }else{
                    orderdata[idx] = orderdata[idx].concat(res);
                }

                that.setData({
                    orderData:orderdata,
                    pullUpOns: ppo,

                })

            })

    },
    onHttpWlDetail: function (orderId) {
        var that = this
        orderId = "WOB201912250492A";
        // GA1LEKH,GA2P91B
        httpServer.httpRequest('0BD80D-BBB02D', 'P00QT79WZ9S2DJMJ', '1.0.0', { "order_id": orderId})
            .then((datas) => {
               
                var res = JSON.parse(datas.replyContent);

                this.setData({
                    wlData: res.reverse()
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        
        var idx = this.data.currentTab;
        var lod = this.data.loaddings;
        lod[idx] = true;
        this.setData({
            loaddings: lod,
          })
        wx.showNavigationBarLoading() //在标题栏中显示加载

        this.onHttpOrderList();

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
        var idx = this.data.currentTab;
        var list = this.data.orderData;
        var lod = this.data.loaddings;
        var ppo = this.data.pullUpOns;
        var pagei = this.data.pageindexs;

        list[idx] = [];
        lod[idx] = true;
        ppo[idx] = false;
        pagei[idx] = 1;

        this.setData({
            orderData: list,
            loaddings: lod,
            pullUpOns: ppo,
            pageindexs: pagei
          });
        wx.showNavigationBarLoading(); //在标题栏中显示加载
        this.onHttpOrderList();
        wx.stopPullDownRefresh();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        var idx = this.data.currentTab;
        var list = this.data.orderData;
        var lod = this.data.loaddings;
        var ppo = this.data.pullUpOns;
        var pagei = this.data.pageindexs;
        if (ppo[idx]) return;
        if (list[idx].length == 0) return;


        lod[idx] = true;
        pagei[idx] =  pagei[idx] + 1;

        this.setData({
            loaddings: lod,
            pageindexs: pagei
        }) 
        wx.showNavigationBarLoading();

        this.onHttpOrderList();
    },
    
    onShareAppMessage: function () {

    },
    onPageScroll(e) {
        this.setData({
          scrollTop: e.scrollTop
        })
    }




 

})