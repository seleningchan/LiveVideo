"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ApiConstant_js_1 = require("../api/ApiConstant.js");
var RequestTypeConsatnt_js_1 = __importDefault(require("../constant/RequestTypeConsatnt.js"));
var HeaderInfo_js_1 = __importDefault(require("../constant/HeaderInfo.js"));
var StringUtil_js_1 = __importDefault(require("../utils/StringUtil.js"));
var MessageBoxControl_js_1 = require("../components/MessageBoxControl.js");
//异步请求
var AjaxService = /** @class */ (function () {
    function AjaxService(url, isJson, method) {
        if (isJson === void 0) { isJson = true; }
        if (method === void 0) { method = RequestTypeConsatnt_js_1.default.POST; }
        this.xhr = new XMLHttpRequest();
        this.xhr.open(method, ApiConstant_js_1.BaseUrl.url + url, true);
        if (isJson) {
            this.xhr.setRequestHeader(HeaderInfo_js_1.default.KEY, HeaderInfo_js_1.default.JSON_VALUE);
        }
    }
    //主要发送json数据
    AjaxService.prototype.send = function (data) {
        this.xhr.send(JSON.stringify(data));
        return this.end();
    };
    //其他的也可以进行发送
    AjaxService.prototype.sendOther = function (data) {
        this.xhr.send(data);
        return this.end();
    };
    //请求结束，拿取结果
    AjaxService.prototype.end = function () {
        var _this = this;
        return new Promise(function (res) {
            _this.xhr.onload = function () {
                if (_this.xhr.readyState === 4 && _this.xhr.status === 200) {
                    //检测是否无返回值，有些接口只处理业务无返回值，单独处理，否则转为json的时候会出错
                    if (StringUtil_js_1.default.chkObjNull(_this.xhr.response)) {
                        res();
                        return;
                    }
                    //检测是否报错
                    var response = JSON.parse(_this.xhr.response);
                    if (!StringUtil_js_1.default.chkObjNull(response['status']) && response['status'] === 400) {
                        //报错直接刷新
                        MessageBoxControl_js_1.MessageBoxControl.open(response['message'], function () { return window.location.reload(); });
                    }
                    else {
                        res(response);
                    }
                }
                else {
                    //请求失败，直接刷新网页
                    MessageBoxControl_js_1.MessageBoxControl.open("网络错误，请联系管理员！", function () { return window.location.reload(); });
                }
            };
        });
    };
    return AjaxService;
}());
exports.default = AjaxService;
