// pages/team/partnership.js
const form = require("../../../components/utils/formValidation.js")

Page({

    /**
     * 页面的初始数据
     */
    data: {
        region: [], //['北京市','北京市','东城区'],
        relation: '',
        showActionSheet: false,
        itemList: [{
            text: "朋友",
            color: "#1a1a1a"
        }, {
            text: "亲人",
            color: "#1a1a1a"
        }, {
            text: "同事",
            color: "#1a1a1a"
        }, {
            text: "同学",
            color: "#1a1a1a"
        }],
    },
    formSubmit: function (e) {
        //表单规则
        let rules = [{
            name: "name",
            rule: ["required", "isChinese", "minLength:2", "maxLength: 8"], //可使用区间，此处主要测试功能
            msg: ["请输入合伙人姓名", "姓名必须全部为中文", "姓名必须2个或以上字符", "姓名不能超过8个字符"]
        }, {
            name: "sex",
            rule: ["required"],
            msg: ["请选择性别"]
        }, {
            name: "wechat",
            rule: ["required"],
            msg: ["请输入微信号"]
        }, {
            name: "mobile",
            rule: ["required", "isMobile"],
            msg: ["请输入手机号", "请输入正确的手机号"]
        }, {
            name: "detailaddress",
            rule: ["required"], //可使用区间，此处主要测试功能
            msg: ["请输入详细地址"]
        }];

        if (this.data.relation == '') {
            wx.showToast({
                title: "请选择关系",
                icon: "none"
            });
            return;
        }
        if (this.data.region.length == 0) {
            wx.showToast({
                title: "请选择地址",
                icon: "none"
            });
            return;
        }

        //进行表单检查
        let formData = e.detail.value;
        let checkRes = form.validation(formData, rules);
        if (!checkRes) {

            var data = {
                fk_user: "F41ABE52-9617-4DDD-8D37-DCA8A82D50E6",
                province: '',
                province_name: '',
                city: '',
                city_name: '',
                area: '',
                area_name: '', 
                street: '',
                street_name: "",
                detailaddress: formData.detailaddress,
                remark: formData.remark,
                custid: '',
                name: formData.name,
                sex: formData.sex,
                wechat: formData.wechat,
                mobile: formData.mobile,
                relation: this.data.relation,
            }

            httpServer.httpRequest('0BD80D-8DBPRN', 'S1R47V11O7JLEAF2', '1.0.0', data)
                .then((datas) => {

                    if (datas.errorCode == 0) {
                        wx.showToast({
                            title: "评价成功", //提示文字
                            duration: 2000, //显示时长
                            icon: "none",
                            mask: true,
                            success: function () {
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


        } else {
            wx.showToast({
                title: checkRes,
                icon: "none"
            });
        }
    },
    bindRegionChange: function (e) {
        console.log(e.detail);
        this.setData({
            region: e.detail.value
        })
    },
    openActionSheet: function (e) {
        this.setData({
            showActionSheet: true
        })
    },
    itemClick: function (e) {
        let index = e.detail.index;
        this.setData({
            showActionSheet: false,
            relation: this.data.itemList[index].text
        })
    },
    closeActionSheet: function () {
        this.setData({
            showActionSheet: false
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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