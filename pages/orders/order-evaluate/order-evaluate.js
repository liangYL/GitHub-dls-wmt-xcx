// pages/orders/order-manage/order-manage.js
import httpServer from '../../../utils/httpUtils/httpServers.js';
import util from '../../../utils/httpUtils/util.js';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [ {
            name: "待评价",
        }, {
            name: "已评价",
        }],
        orderData: [ [], []],
        currentTab: 0,
        scrollTop: 0,
        scrolls: [0,0],
        winHeight: 0,
        loaddings:[false,false],
        pullUpOns:[false,false],
        pageindexs:[1,1],
        animationData: "",
        showModalStatus: false,
        tabsWidth:100,
        current:3
    },

    change(e) {

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
    qpj: function(e){
        
        wx.navigateTo({
          url: '../order-evaluate-detail/order-evaluate-detail?doccode='+e.currentTarget.dataset.doccode+"&productId="+e.currentTarget.dataset.productid+"&productName="+e.currentTarget.dataset.productname
        })
    },

  
    onHttpOrderList: function () {
        var that = this
        var orderDataJson = {
            custid: "GA2P91B",
            orderstatus: this.data.tabs[this.data.currentTab].name,
            pageindex: this.data.pageindexs[this.data.currentTab],
            pagenum: "10"
        }

        var that = this;
        // GA1LEKH,GA2P91B,GA27Z8G
        httpServer.httpRequest('0BD80D-FX2XTP', 'UTJ2YQ41KBOYXGL1', '1.0.0', orderDataJson)
        // httpServer.httpRequest('0BD80D-2LV44R', 'CS7E0VBMBICCBS7Q', '1.0.0', orderDataJson)
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

                // var ss =  res[1].list[0].rs_evaluate;
                

                if(res.length==0 && orderdata[idx].length!=0){
                    ppo[idx] = true;
                }else{

                    for (let i = 0; i < res.length; i++) {
                        for (let j = 0; j < res[i].list.length; j++) {
                            if(res[i].list[j].rs_evaluate != ""){
                                try {
                                    res[i].list[j].rs_evaluate = JSON.parse(res[i].list[j].rs_evaluate);
                                } catch (d) {}
                            }
                        
                        }
                    }

                    orderdata[idx] = orderdata[idx].concat(res);

                }

                that.setData({
                    orderData:orderdata,
                    pullUpOns: ppo,

                })

            })

    },
    clickImg :function(e){

        wx.previewImage({
            urls: e.currentTarget.dataset.src, //需要预览的图片http链接列表，注意是数组
            current: '', // 当前显示图片的http链接，默认是第一个
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            tabsWidth: wx.getSystemInfoSync().windowWidth
          })

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