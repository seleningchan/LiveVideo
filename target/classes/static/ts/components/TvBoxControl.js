"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageBoxControl_js_1 = require("./MessageBoxControl.js");
//屏幕共享按钮控制,只有一个，不做多处理
var TvBoxControl = /** @class */ (function () {
    function TvBoxControl() {
    }
    //运行
    TvBoxControl.run = function () {
        this.tvBoxEl = document.querySelector('.tv-box');
        this.tvHeaderBoxEl = document.querySelector('.tv-header-box');
        this.tvHeaderSpanEl = document.querySelector('.tv-header-box > span');
        this.tvBodyBoxEl = document.querySelector('.tv-body-box');
        this.tvFooterBoxEl = document.querySelector('.tv-footer-box');
        this.listerClickEvent();
    };
    //绑定事件
    TvBoxControl.bindEvent = function (openCallBackFun, closeCallBackFun) {
        this.openCallBackFun = openCallBackFun;
        this.closeCallBackFun = closeCallBackFun;
    };
    //点击事件
    TvBoxControl.listerClickEvent = function () {
        var _this = this;
        this.tvBoxEl.addEventListener('click', function () {
            if (!_this.switch) {
                if (_this.isOnce) {
                    _this.isOnce = false;
                    MessageBoxControl_js_1.MessageBoxControl.open("屏幕共享开启后，如果点击浏览器自带的停止共享，下一次将重新选择分享的屏幕，如果是点击此网站自带的图标的话，会使用上一次选择的屏幕进行分享。", function () {
                        _this.open();
                    });
                    return;
                }
                _this.open();
            }
            else {
                _this.close();
            }
        });
    };
    //打开
    TvBoxControl.open = function () {
        this.switch = true;
        this.tvHeaderBoxEl.style.borderColor = 'green';
        this.tvHeaderSpanEl.style.color = 'green';
        this.tvBodyBoxEl.style.backgroundColor = 'green';
        this.tvFooterBoxEl.style.backgroundColor = 'green';
        this.openCallBackFun();
    };
    //关闭
    TvBoxControl.close = function () {
        this.publicClose();
        this.closeCallBackFun();
    };
    //公共关闭,因为一些原因屏幕关闭的时候，调用此方法
    TvBoxControl.publicClose = function () {
        this.switch = false;
        this.tvHeaderBoxEl.style.borderColor = 'rgba(255, 255, 255, 0.747)';
        this.tvHeaderSpanEl.style.color = 'rgba(255, 255, 255, 0.747)';
        this.tvBodyBoxEl.style.backgroundColor = 'rgba(255, 255, 255, 0.747)';
        this.tvFooterBoxEl.style.backgroundColor = 'rgba(255, 255, 255, 0.747)';
    };
    TvBoxControl.switch = false;
    //检验是否第一次打开
    TvBoxControl.isOnce = true;
    return TvBoxControl;
}());
exports.default = TvBoxControl;
