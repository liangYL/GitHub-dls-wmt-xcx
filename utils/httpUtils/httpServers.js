var aes = require('./aes.js');
import util from './util';
const baseUrl = 'https://apitest.chinawmt.com:8001/api/';
const service = {
    htmlRequestEncryption: function (id, api_safety_code, vs, data) {
        var safety_code = "000000";
        var Url = `${baseUrl}${id}/${vs}`;
        console.log(Url)
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
      var dataMessage = safety_code + util.MapTOJson(result) + apiSafetyCode + safety_code;
        var sign = aes.CryptoJS.MD5(dataMessage).toString().toUpperCase();
        var sign16 = sign.substring(0, 16);
        var key = aes.CryptoJS.enc.Utf8.parse(sign16); //十六位十六进制数作为密钥
      var aesDataMessge = util.Encrypt(dataMessage, key);
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
                          var dec = util.Decrypt(datas.replyContent, key)
                            datas.replyContent = dec
                            resolve(datas)
                            console.log(datas)
                        } else {
                            reject(datas)
                        }
                    } else {

                    }
                },
                fail: function (res) {
                    // 请求失败
                }
            })
        })
    }
}
module.exports = {
    httpRequest: service.htmlRequestEncryption
};