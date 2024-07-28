"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageBoxControl_js_1 = require("./MessageBoxControl.js");
var VideoMaxBoxControl_js_1 = require("./VideoMaxBoxControl.js");
//此为发送者也就是自己专属的显示，附带canvas，用于变换样式
var SelfVideoBoxControl = /** @class */ (function () {
    function SelfVideoBoxControl() {
        this.videoId = '';
        //是否绘画的是显示的那个canvas
        this.isShowCanvasSwitch = true;
        //当前需要绘画的函数
        this.draw = function () { };
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
        this.stream = new MediaStream();
        this.videoBoxEl = document.createElement('div');
        this.videoBoxMaskEl = document.createElement('div');
        this.videoEl = document.createElement('video');
        this.hideCanvas = document.createElement('canvas');
        this.videoEl.width = 0;
        this.videoEl.height = 0;
        this.videoEl.style.opacity = '0';
        this.videoEl.style.position = 'absolute';
        this.videoEl.style.top = '0';
        this.videoEl.style.left = '0';
        this.canvasEl = document.createElement('canvas');
        this.ctxEl = this.canvasEl.getContext('2d', { alpha: false, willReadFrequently: true });
        this.hideCtx = this.hideCanvas.getContext('2d', { alpha: false, willReadFrequently: true });
        this.videoBoxEl.appendChild(this.videoBoxMaskEl);
        this.videoBoxEl.appendChild(this.videoEl);
        this.videoBoxEl.appendChild(this.hideCanvas);
        this.videoBoxEl.appendChild(this.canvasEl);
        this.hideCanvas.className = 'hide-canvas';
        this.videoBoxEl.classList.add('video-box');
        this.videoBoxMaskEl.className = 'video-box-mask';
        this.changeWh();
        this.listerClickEvent();
        //默认样式
        this.listerSetCanvas();
    }
    //自处理
    SelfVideoBoxControl.prototype.changeWh = function () {
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
    SelfVideoBoxControl.prototype.listerClickEvent = function () {
        var _this = this;
        this.videoBoxMaskEl.addEventListener('click', function (_) {
            VideoMaxBoxControl_js_1.VideoMaxBoxControl.open(_this.canvasEl, _this.videoBoxEl, _this.hideCanvas);
        });
    };
    //创建视频,自己不需要听见自己的声音
    SelfVideoBoxControl.prototype.createVideo = function (stream) {
        var _this = this;
        var videoTracks = stream.getVideoTracks();
        var audioTracks = stream.getAudioTracks();
        if (videoTracks.length < 1 || audioTracks.length < 1) {
            MessageBoxControl_js_1.MessageBoxControl.open("视频或音频缺失！", function () { return window.location.reload(); });
        }
        audioTracks.forEach(function (track) { return _this.stream.addTrack(track); });
        this.videoEl.srcObject = stream;
        //静音
        this.videoEl.muted = true;
        this.videoEl.width = this.canvasEl.width / 10;
        this.videoEl.height = this.canvasEl.height / 10;
        this.videoEl.onloadedmetadata = function (_) {
            _this.changeCanvasByVideo(_this.videoEl.videoWidth, _this.videoEl.videoHeight);
            _this.hideCanvas.width = Math.ceil(_this.canvasEl.width / 5);
            _this.hideCanvas.height = Math.ceil(_this.canvasEl.height / 5);
            _this.videoEl.play();
        };
    };
    //获取整个节点，用于添加
    SelfVideoBoxControl.prototype.getVideoBoxEl = function () {
        return this.videoBoxEl;
    };
    //设置id
    SelfVideoBoxControl.prototype.setVideoId = function (id) {
        this.videoId = id;
    };
    //获取id
    SelfVideoBoxControl.prototype.getVideoId = function () {
        this.videoId;
    };
    //监听设置canvas,两个canvas，根据样式需要设置不同的canvas
    SelfVideoBoxControl.prototype.listerSetCanvas = function () {
        if (this.isShowCanvasSwitch) {
            this.ctxEl.drawImage(this.videoEl, 0, 0, this.canvasEl.width, this.canvasEl.height);
            this.draw();
        }
        else {
            this.hideCtx.drawImage(this.videoEl, 0, 0, this.hideCanvas.width, this.hideCanvas.height);
            this.ctxEl.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
            this.ctxEl.fillStyle = 'white';
            this.ctxEl.fillRect(0, 0, this.canvasEl.width, this.canvasEl.height);
            this.draw();
        }
        //需要绑定this
        setTimeout(this.listerSetCanvas.bind(this));
    };
    //根据视频的大小控制canvas的大小
    SelfVideoBoxControl.prototype.changeCanvasByVideo = function (width, height) {
        if (width === 0 || height === 0) {
            this.canvasEl.width = this.currentWh.w;
            this.canvasEl.height = this.currentWh.h;
            return;
        }
        var wRotia = width / this.currentWh.w;
        var hRatio = height / this.currentWh.h;
        //视频很宽
        if (wRotia >= hRatio) {
            this.canvasEl.width = this.currentWh.w;
            //防止分辨率错误
            this.canvasEl.height = Math.ceil(height / wRotia / 2) * 2;
            return;
        }
        this.canvasEl.height = this.currentWh.h;
        //防止分辨率错误
        this.canvasEl.width = Math.ceil(width / hRatio / 2) * 2;
    };
    //如果有屏幕共享的话，需要修改video内容来影响canvas
    SelfVideoBoxControl.prototype.modifyVideo = function (stream) {
        this.videoEl.srcObject = stream;
    };
    //获取canvas流
    SelfVideoBoxControl.prototype.getStream = function () {
        var _this = this;
        var canvasStream = this.canvasEl.captureStream();
        var videoTracks = canvasStream.getVideoTracks();
        videoTracks.forEach(function (track) { return _this.stream.addTrack(track); });
        return this.stream;
    };
    //修改canvas的样式内容
    SelfVideoBoxControl.prototype.modifyStyle = function (styleName) {
        try {
            eval("this." + styleName + "();");
        }
        catch (e) {
            MessageBoxControl_js_1.MessageBoxControl.open("不存在的人脸样式！");
        }
    };
    //普通，不做处理，默认就是这个
    SelfVideoBoxControl.prototype.original = function () {
        this.isShowCanvasSwitch = true;
        this.draw = function () { };
    };
    //黑白
    SelfVideoBoxControl.prototype.grayscale = function () {
        this.isShowCanvasSwitch = true;
        this.draw = this.handleGrayscale;
    };
    //数据处理
    SelfVideoBoxControl.prototype.handleGrayscale = function () {
        var imgData = this.ctxEl.getImageData(0, 0, this.canvasEl.width, this.canvasEl.height);
        var data = imgData.data;
        for (var i = 0; i < data.length; i += 4) {
            var avg = Math.floor(0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]);
            data[i] = avg;
            data[i + 1] = avg;
            data[i + 2] = avg;
        }
        this.ctxEl.putImageData(imgData, 0, 0);
    };
    //复古
    SelfVideoBoxControl.prototype.sepia = function () {
        this.isShowCanvasSwitch = true;
        this.draw = this.handleSepia;
    };
    //数据处理
    SelfVideoBoxControl.prototype.handleSepia = function () {
        var imgData = this.ctxEl.getImageData(0, 0, this.canvasEl.width, this.canvasEl.height);
        var data = imgData.data;
        for (var i = 0; i < data.length; i += 4) {
            var red = data[i], green = data[i + 1], blue = data[i + 2];
            data[i] = Math.min(Math.round(0.393 * red + 0.769 * green + 0.189 * blue), 255);
            data[i + 1] = Math.min(Math.round(0.349 * red + 0.686 * green + 0.168 * blue), 255);
            data[i + 2] = Math.min(Math.round(0.272 * red + 0.534 * green + 0.131 * blue), 255);
        }
        this.ctxEl.putImageData(imgData, 0, 0);
    };
    //反差
    SelfVideoBoxControl.prototype.invert = function () {
        this.isShowCanvasSwitch = true;
        this.draw = this.handleInvert;
    };
    //数据处理
    SelfVideoBoxControl.prototype.handleInvert = function () {
        var imgData = this.ctxEl.getImageData(0, 0, this.canvasEl.width, this.canvasEl.height);
        var data = imgData.data;
        for (var i = 0; i < data.length; i += 4) {
            data[i] = 255 - data[i];
            data[i + 1] = 255 - data[i + 1];
            data[i + 2] = 255 - data[i + 2];
        }
        this.ctxEl.putImageData(imgData, 0, 0);
    };
    //简单美颜
    SelfVideoBoxControl.prototype.applyBeautyEffect = function () {
        this.isShowCanvasSwitch = true;
        this.draw = this.handleApplyBeautyEffect;
    };
    //数据处理
    SelfVideoBoxControl.prototype.handleApplyBeautyEffect = function () {
        var imgData = this.ctxEl.getImageData(0, 0, this.canvasEl.width, this.canvasEl.height);
        var data = imgData.data;
        for (var i = 0; i < data.length; i += 4) {
            data[i] += 50;
            data[i + 1] += 50;
            data[i + 2] += 50;
            var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] += avg * 0.1;
            data[i + 1] += avg * 0.1;
            data[i + 2] += avg * 0.1;
        }
        this.ctxEl.putImageData(imgData, 0, 0);
    };
    //字符化
    SelfVideoBoxControl.prototype.characterize = function () {
        this.isShowCanvasSwitch = false;
        this.draw = this.handleCharacterize;
    };
    //数据处理
    SelfVideoBoxControl.prototype.handleCharacterize = function () {
        var imgData = this.hideCtx.getImageData(0, 0, this.hideCanvas.width, this.hideCanvas.height);
        var data = imgData.data;
        var x = 0;
        var y = 0;
        var asciiArr = "#$@WOo[(/?=~*^_` ".split("");
        var ratio = 257 / asciiArr.length;
        for (var i = 0; i < data.length; i += 4) {
            var avg = Math.floor(0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]);
            var index = Math.round(Math.floor(avg / ratio));
            this.ctxEl.fillStyle = 'black';
            this.ctxEl.font = "5px Arial";
            this.ctxEl.fillText(asciiArr[index], x, y);
            x += 5;
            if (x >= this.canvasEl.width) {
                y += 5;
                x = 0;
            }
        }
    };
    return SelfVideoBoxControl;
}());
exports.default = SelfVideoBoxControl;
