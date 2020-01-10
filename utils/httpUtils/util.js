const app = getApp();
const CryptoJS = require('./aes.js');
const ivData = app.globalData.iv;
const util = {
    // 加密方法
    Encrypt: function (word, key) {
        let srcs = CryptoJS.CryptoJS.enc.Utf8.parse(word);
        let encrypted = CryptoJS.CryptoJS.AES.encrypt(srcs, key, {
            iv: ivData,
            mode: CryptoJS.CryptoJS.mode.CBC,
            padding: CryptoJS.CryptoJS.pad.Pkcs7
        });
        console.log(CryptoJS)
        return encrypted.toString();
    },
    // 解密方法
    Decrypt: function (word, key) {
        var decrypt = CryptoJS.CryptoJS.AES.decrypt(word, key, {
            iv: ivData,
            mode: CryptoJS.CryptoJS.mode.CBC,
            padding: CryptoJS.CryptoJS.pad.Pkcs7
        });
        var decryptedStr = decrypt.toString(CryptoJS.CryptoJS.enc.Utf8);
        return decryptedStr.toString();
    },
    // json处理
    MapTOJson: function (m) {
        var str = '{';
        var i = 1;
        m.forEach(function (item, key, mapObj) {
            if (mapObj.size == i) {
                
                if(Object.prototype.toString.call(item) == "[object Object]"){
                    str += '"' + key + '":' + JSON.stringify(item)  ;

                }else{
                    str += '"' + key + '":"' + item + '"';
                }
            } else {
                if(Object.prototype.toString.call(item) == "[object Object]"){
                    str += '"' + key + '":' + JSON.stringify(item) + ',';

                }else{
                    str += '"' + key + '":"' + item + '",';

                }
            }
            i++;
        });
        str += '}';
        return str;
    },
    isNullOrEmpty: function(value) {
        //是否为空
        return (value === null || value === '' || value === undefined) ? true : false;
      },
    trim: function (value) {
        //去空格
        return value.replace(/(^\s*)|(\s*$)/g, "");
    },
    isMobile: function (value) {
        //是否为手机号
        return /^(?:13\d|14\d|15\d|16\d|17\d|18\d|19\d)\d{5}(\d{3}|\*{3})$/.test(value);
    },
    toast: function (text, duration, success) {
        wx.showToast({
            title: text,
            icon: success ? 'success' : 'none',
            duration: duration || 2000
        })
    },
    toastMessage: function (text) {
        wx.showToast({
            title: text,
            icon:  'none',
            duration: 2000,
            mask: true
        })
    },
}

module.exports = {
    Encrypt: util.Encrypt,
    Decrypt: util.Decrypt,
    MapTOJson: util.MapTOJson,
    trim: util.trim,
    isNullOrEmpty:util.isNullOrEmpty,
    toast: util.toast,
    toastMessage:util.toastMessage,
    isMobile: util.isMobile
}