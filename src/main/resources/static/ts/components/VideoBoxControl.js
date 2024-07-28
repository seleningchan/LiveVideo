"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VideoMaxBoxControl_js_1 = require("./VideoMaxBoxControl.js");
//此为别人专属的显示，直接使用视频组件进行显示即可
var VideoBoxControl = /** @class */ (function () {
    function VideoBoxControl(sfId) {
        this.videoId = '';
        //手机和电脑的尺寸
        this.sjWh = {
            w: 160,
            h: 214
        };
        this.dnWh = {
            w: 480,
            h: 360
        };
        this.currentWh = {
            w: 0,
            h: 0
        };
        this.videoBoxEl = document.createElement('div');
        this.videoBoxMaskEl = document.createElement('div');
        this.videoEl = document.createElement('video');
        this.videoEl.width = 0;
        this.videoEl.height = 0;
        this.videoBoxEl.appendChild(this.videoBoxMaskEl);
        this.videoBoxEl.appendChild(this.videoEl);
        this.videoBoxEl.classList.add('video-box');
        this.videoBoxMaskEl.className = 'video-box-mask';
        var videoMaskIdEl = document.createElement('div');
        videoMaskIdEl.className = 'video-mask-id';
        videoMaskIdEl.innerText = sfId;
        this.videoBoxMaskEl.appendChild(videoMaskIdEl);
        this.changeWh();
        this.listerClickEvent();
    }
    //自处理
    VideoBoxControl.prototype.changeWh = function () {
        var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        if (windowWidth > windowHeight) {
            this.videoBoxEl.style.width = this.dnWh.w + 'px';
            this.videoBoxEl.style.height = this.dnWh.h + 'px';
            this.currentWh.w = this.dnWh.w;
            this.currentWh.h = this.dnWh.h;
            return;
        }
        this.videoBoxEl.style.width = this.sjWh.w + 'px';
        this.videoBoxEl.style.height = this.sjWh.h + 'px';
        this.currentWh.w = this.sjWh.w;
        this.currentWh.h = this.sjWh.h;
    };
    //点击事件
    VideoBoxControl.prototype.listerClickEvent = function () {
        var _this = this;
        this.videoBoxMaskEl.addEventListener('click', function (_) {
            VideoMaxBoxControl_js_1.VideoMaxBoxControl.open(_this.videoEl, _this.videoBoxEl, null);
        });
    };
    //创建视频
    VideoBoxControl.prototype.createVideo = function (stream) {
        var _this = this;
        this.videoEl.srcObject = stream;
        this.videoEl.muted = false;
        this.videoEl.onloadedmetadata = function (_) {
            _this.changeVideo(_this.videoEl.videoWidth, _this.videoEl.videoHeight);
            _this.videoEl.play();
        };
    };
    //获取整个节点，用于删除和添加
    VideoBoxControl.prototype.getVideoBoxEl = function () {
        return this.videoBoxEl;
    };
    //设置id
    VideoBoxControl.prototype.setVideoId = function (id) {
        this.videoId = id;
    };
    //获取id
    VideoBoxControl.prototype.getVideoId = function () {
        return this.videoId;
    };
    //调节视频的大小
    VideoBoxControl.prototype.changeVideo = function (width, height) {
        if (width === 0 || height === 0) {
            this.videoEl.width = this.currentWh.w;
            this.videoEl.height = this.currentWh.h;
            return;
        }
        var wRotia = width / this.currentWh.w;
        var hRatio = height / this.currentWh.h;
        //视频很宽
        if (wRotia >= hRatio) {
            this.videoEl.width = this.currentWh.w;
            //防止分辨率错误
            this.videoEl.height = Math.ceil(height / wRotia / 2) * 2;
            return;
        }
        this.videoEl.height = this.currentWh.h;
        //防止分辨率错误
        this.videoEl.width = Math.ceil(width / hRatio / 2) * 2;
    };
    return VideoBoxControl;
}());
exports.default = VideoBoxControl;
