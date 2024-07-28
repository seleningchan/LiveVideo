"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ApiConstant_js_1 = require("../api/ApiConstant.js");
var MessageBoxControl_js_1 = require("../components/MessageBoxControl.js");
var EventStant_js_1 = __importDefault(require("../constant/EventStant.js"));
var StringUtil_js_1 = __importDefault(require("../utils/StringUtil.js"));
//接受服务端信息（Server-Sent Events）
var SseService = /** @class */ (function () {
    function SseService(url, parm) {
        this.eventSource = new EventSource(ApiConstant_js_1.BaseUrl.url + url + parm);
    }
    //开始-在连接的时候触发open事件
    SseService.prototype.start = function (callBackFun) {
        this.eventSource.onopen = function (_) { return callBackFun(); };
        //自处理异常
        this.bindHandleExceptionEvent();
        return this;
    };
    //自定义监听事件
    SseService.prototype.bindEvent = function (event, callBackFun) {
        this.eventSource.addEventListener(event, function (e) { return callBackFun(JSON.parse(e.data)); });
        return this;
    };
    //如果不自定义，默认监听事件,与自定义事件互斥
    SseService.prototype.bindDefaultEvent = function (callBackFun) {
        this.eventSource.addEventListener('message', function (e) { return callBackFun(JSON.parse(e.data)); });
        return this;
    };
    //错误事件自处理
    SseService.prototype.bindHandleExceptionEvent = function () {
        this.eventSource.addEventListener(EventStant_js_1.default.HANDLE_EXCEPTION, function (e) {
            var exceptionInfo = JSON.parse(e.data);
            if (!StringUtil_js_1.default.chkObjNull(exceptionInfo.statue) && exceptionInfo.statue === 400) {
                //处理错误
                MessageBoxControl_js_1.MessageBoxControl.open("流发生错误，请稍后再试，错误内容：" + exceptionInfo.message, function () { return window.location.reload(); });
            }
        });
    };
    //关闭
    SseService.prototype.close = function () {
        this.eventSource.close();
    };
    return SseService;
}());
exports.default = SseService;
