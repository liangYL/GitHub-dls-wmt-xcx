// pages/orders/order-evaluate/order-evaluate.js
import httpServer from '../../../utils/httpUtils/httpServers.js';
import util from '../../../utils/httpUtils/util.js';


Page({

    /**
     * 页面的初始数据
     */
    data: {
        cp_current: 0,
        kf_current: 0,
        wl_current: 0,
        tvalue:'',
        files:{
          "img":[],
          "video":""
        },
        options:null,
        serverUrl:"https://wx.chinawmt.com/Soa_Api/SOA_UploadFiles.ashx"
    },
    changea: function (e) {
        this.setData({
          index: e.detail.index,
          cp_current: e.detail.index
        })
      },
    changeb: function (e) {
        this.setData({
          index: e.detail.index,
          kf_current: e.detail.index
        })
      },
     changec: function (e) {
        this.setData({
          index: e.detail.index,
          wl_current: e.detail.index
        })
      },
      textareainput: function(e){
        this.setData({
            tvalue:e.detail.value
        })
      },
      sctp: function(){
        var that = this;

          wx.chooseVideo({
                  sourceType: ['album', 'camera'],
                  maxDuration: 60,
                  camera: 'back',
                  success (res) {
                    console.log(res);

                    // tempFilePath可以作为img标签的src属性显示图片
                    const tempFilePath = res.tempFilePath

                    wx.uploadFile({
                      url: 'https://wx.chinawmt.com/Soa_Api/SOA_UploadFiles.ashx',
                      filePath: tempFilePath,
                      name: 'file',
                      formData: {
                        ConnId: 'Platform_SOA_conn',
                        SystemId: 'Project_Mall_Mini_App',
                        LoginId: 'F41ABE52-9617-4DDD-8D37-DCA8A82D50E6',
                        Object: 'pm_order_goods_evaluate',
                        ObjectId: '',
                        Attrib: "public",
                        SsoToken: "",
                        wxAppId: "wx09c952bc1398bf17"
                      },
                      success (res){
                        console.log(res.data);
                        var d =   JSON.parse(res.data)
                        const data =  JSON.parse(d.ReplyContent);
                        
                        var files = that.data.files;
                        files.video = data.Url
                        that.setData({
                          files:files
                        })
                      }
                    })


                  },
                  fail: function(res){
                    console.log(res);
                    util.toastMessage(res.errMsg);

                  }
                })
      },
      submit: function(){
      
          
        if(this.data.cp_current == 0){
            util.toastMessage("请选择产品满意度");
            return;
        }
        if(this.data.kf_current == 0){
            util.toastMessage("请选择客服满意度");
            return;
        }
        if(this.data.tvalue == ""){
            util.toastMessage("请填写评价信息");
            return;
        }
        var rr =  JSON.stringify(this.data.files);
        // rr = rr.replace("\"","");
        // rr = rr.replace(/\"/g, "");
        // rr =  rr.substring(1, rr.length -1);
        // rr = rr.replace(/"(\w+)":/g, "$1:");
        
        // var rs_ev = '';
        // if(this.data.files.img.length != 0 && this.data.files.video != ''){
        //   for (let index = 0; index < this.data.files.img.length; index++) {
        //     rs_ev += this.data.files.img[index]+',';
        //   }
        //   rs_ev = rs_ev+"_"+this.data.files.video;
        // }

        var data = {
            fk_user:"F41ABE52-9617-4DDD-8D37-DCA8A82D50E6",
            order_sn:this.data.options.doccode,
            logistics_star:this.data.wl_current,
            goods_star:this.data.cp_current,
            custom_star:this.data.kf_current,
            evaluate_info:this.data.tvalue,
            rs_evaluate:this.data.files,//相关视频和图片
            goods_name:this.data.options.productName,
            head_imgurl:"",
            goods_erp_code:this.data.options.productId,//产品编号
        }

        httpServer.httpRequest('0BD80D-8DBPRN', 'S1R47V11O7JLEAF2', '1.0.0', data)
        .then((datas) => {
          
          if (datas.errorCode == 0) {
            wx.showToast({
                title: "评价成功", //提示文字
                duration: 2000, //显示时长
                icon: "none",
                mask: true,
                success:function(){
                    setTimeout(function () {
                        var pages = getCurrentPages();
                        var beforePage = pages[pages.length - 2];
                        beforePage.onPullDownRefresh();
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
           

        });


      },
      result: function(e) {
        console.log(e)
        if(e.detail.status == 1){
          console.log(e.detail.imgArr)
          var files = this.data.files;
          files.img = e.detail.imgArr
          this.setData({
            files:files
          })
        }
        
      },
      videoResult: function(e) {
        console.log(e)
        if(e.detail.vstatus == 1){
          console.log(e.detail.vurl)
          var files = this.data.files;
          files.video = e.detail.vurl
          this.setData({
            files:files
          })
        }
        
      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.setData({
        options:options
      })
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