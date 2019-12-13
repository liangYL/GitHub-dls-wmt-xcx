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
                str += '"' + key + '":"' + item + '"';
            } else {
                str += '"' + key + '":"' + item + '",';
            }
            i++;
        });
        str += '}';
        return str;
    },
    trim: function (value) {
        //去空格
        return value.replace(/(^\s*)|(\s*$)/g, "");
    }

}

module.exports = {
    Encrypt: util.Encrypt,
    Decrypt: util.Decrypt,
    MapTOJson: util.MapTOJson,
    trim: util.trim
}