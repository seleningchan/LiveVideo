"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//处理验证一些字符串的工具类
var StringUtil = /** @class */ (function () {
    function StringUtil() {
    }
    //检测字符串是否为空
    StringUtil.chkObjNull = function (obj) {
        if (typeof (obj) == "undefined") {
            return true;
        }
        else if (typeof (obj) == "string") {
            if (null == obj || "" == obj) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            if (null == obj) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    //根据对象生成提交需要的参数
    StringUtil.objToParm = function (obj) {
        var parm = '?';
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                var value = obj[key];
                parm += key + '=' + value + '&';
            }
        }
        return parm.substring(0, parm.length - 1);
    };
    return StringUtil;
}());
exports.default = StringUtil;
