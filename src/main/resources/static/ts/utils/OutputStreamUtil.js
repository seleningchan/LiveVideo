"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var MessageBoxControl_js_1 = require("../components/MessageBoxControl.js");
var StringUtil_js_1 = __importDefault(require("./StringUtil.js"));
//输出的流,不做浏览器兼容处理
var OutputStreamUtil = /** @class */ (function () {
    function OutputStreamUtil() {
    }
    //获取摄像头流
    OutputStreamUtil.getUserMedia = function (callBackFun) {
        var _this = this;
        if (!StringUtil_js_1.default.chkObjNull(this.userMediaStream)) {
            callBackFun(this.userMediaStream);
            return;
        }
        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        }).then(function (stream) {
            _this.userMediaStream = stream;
            callBackFun(stream);
            stream.getTracks().forEach(function (track) {
                track.onended = function () {
                    MessageBoxControl_js_1.MessageBoxControl.open("权限关闭，将退出！", function () { return window.location.reload(); });
                };
            });
        }).catch(function () {
            MessageBoxControl_js_1.MessageBoxControl.open("未获得权限，无法进行视频聊天！", function () { return window.location.reload(); });
        });
    };
    //获取屏幕流
    OutputStreamUtil.getDisplayMedia = function (callBackFun, errorCallBackFun) {
        var _this = this;
        if (!StringUtil_js_1.default.chkObjNull(this.displayMediaStream)) {
            callBackFun(this.displayMediaStream);
            return;
        }
        navigator.mediaDevices.getDisplayMedia({
            audio: true,
            video: true
        }).then(function (stream) {
            _this.displayMediaStream = stream;
            //监听关闭
            stream.getVideoTracks()[0].onended = function () {
                errorCallBackFun();
                _this.displayMediaStream = null;
            };
            callBackFun(stream);
        }).catch(function () {
            //这个报错没有事，不用刷新网页
            MessageBoxControl_js_1.MessageBoxControl.open("未获得权限，无法进行屏幕共享！", function () {
                errorCallBackFun();
            });
        });
    };
    return OutputStreamUtil;
}());
exports.default = OutputStreamUtil;
