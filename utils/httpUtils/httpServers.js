let aes = require('./aes.js');
let util = require('./util.js');
import {
    MapTOJson,
    Encrypt,
    Decrypt
} from './util';
const baseUrl = 'https://apitest.chinawmt.com:8001/api/';
const service = {
    htmlRequestEncryption: function (id, api_safety_code, vs, data) {
        console.log(data)
        var safety_code = "000000";
        var Url = `${baseUrl}${id}/${vs}`;
        var apiSafetyCode = api_safety_code;
        var dataArr = new Array();
        for (var keys in data) {
            var dataObj = {
                keys: keys,
                name: data[keys]
            }
            dataArr.push(dataObj)
        }
        dataArr.sort(function (a, b) {
            return a["keys"].localeCompare(b["keys"])
        });
        var result = new Map(dataArr.map(i => [i["keys"], i["name"]]));
        var dataMessage = safety_code + MapTOJson(result) + apiSafetyCode + safety_code;
        var sign = aes.CryptoJS.MD5(dataMessage).toString().toUpperCase();
        var sign16 = sign.substring(0, 16);
        var key = aes.CryptoJS.enc.Utf8.parse(sign16); //十六位十六进制数作为密钥
        var aesDataMessge = Encrypt(dataMessage, key);
        return new Promise((resolve, reject) => {
            wx.request({
                url: Url,
                data: aesDataMessge,
                method: "POST",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('sign', sign);
                },
                header: {
                    'sign': sign
                },
                contentType: "application/text",
                dataType: 'text',
                success: function (res) {
                    if (res.statusCode == 200) {
                        var datas = JSON.parse(res.data);
                        if (datas.replyContent !== null) {
                            var dec = Decrypt(datas.replyContent, key)
                            datas.replyContent = dec
                            resolve(datas)
                        } else {
                            // reject(datas)
                            wx.showToast({
                                title: datas.errorMessage, //提示文字
                                duration: 2000, //显示时长
                                icon: "none",
                                mask: true
                            })
                        }
                    } else {
                        util.toast("数据请求失败")
                    }
                },
                fail: function (res) {
                    // 请求失败
                }
            })
        })
    },
    // 这是共有服务请求封装
    httpRequestPrivate: function (url, Data) {
        let Url = url;
        return new Promise((resolve, reject) => {
            wx.request({
                url: Url,
                data: Data,
                method: "POST",
                header: {
                    'content-type': 'application/json'
                },
                success: (res) => {
                    if(res.data.errorCode == 0) {
                        let dataJson = JSON.parse(res.data.ReplyContent)
                        resolve(dataJson)
                    }else {
                        reject(res)
                    }
                },
                fail: (res) => {
                    wx.showToast({
                        title: res.data.error, //提示文字
                        duration: 2000, //显示时长
                        mask: true
                    })
                }
            })
        })
    }
}
module.exports = {
    httpRequest: service.htmlRequestEncryption,
    httpRequestPrivate:service.httpRequestPrivate
};