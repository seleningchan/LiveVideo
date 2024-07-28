"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var FileUtil_js_1 = __importDefault(require("../utils/FileUtil.js"));
//因为自定义组件就在聊天上，没有办法再使用自定义组件，需要再写一个
var ChatMessageVideoControl = /** @class */ (function () {
    function ChatMessageVideoControl() {
    }
    return ChatMessageVideoControl;
}());
exports.default = ChatMessageVideoControl;
{
    this.chatMessageVideoBoxEl = document.createElement('div');
    this.chatMessageVideoBoxEl.className = 'chat-message-video-box';
    var mainEl = document.createElement('div');
    mainEl.className = 'chat-message-video-box-main';
    var headerEl = document.createElement('div');
    headerEl.className = 'chat-message-video-box-header';
    var closeEl = document.createElement('div');
    closeEl.className = 'chat-message-video-box-close';
    closeEl.addEventListener('click', this.close.bind(this));
    var leftEl = document.createElement('div');
    leftEl.className = 'chat-message-video-box-left';
    var rightEl = document.createElement('div');
    rightEl.className = 'chat-message-video-box-right';
    closeEl.appendChild(leftEl);
    closeEl.appendChild(rightEl);
    headerEl.appendChild(closeEl);
    mainEl.appendChild(headerEl);
    var bodyEl = document.createElement('div');
    bodyEl.className = 'chat-message-video-box-body';
    this.videoEl = document.createElement('video');
    this.videoEl.className = 'chat-message-video-box-video';
    this.videoEl.controls = true;
    bodyEl.appendChild(this.videoEl);
    mainEl.appendChild(bodyEl);
    var footerEl = document.createElement('div');
    footerEl.className = 'chat-message-video-box-footer';
    var btnBox = document.createElement('div');
    btnBox.className = 'button-box';
    btnBox.innerText = '下载';
    btnBox.addEventListener('click', function () {
        FileUtil_js_1.default.downloadFile(_this.downloadFileUrl, _this.downloadFileName);
    });
    footerEl.appendChild(btnBox);
    mainEl.appendChild(footerEl);
    this.chatMessageVideoBoxEl.appendChild(mainEl);
}
mount(el, HTMLElement);
{
    el.appendChild(this.chatMessageVideoBoxEl);
}
unMount(el, HTMLElement);
{
    el.removeChild(this.chatMessageVideoBoxEl);
}
open(videoBaseUrl, string, fileName, string);
{
    this.downloadFileUrl = videoBaseUrl;
    this.downloadFileName = fileName;
    this.videoEl.src = videoBaseUrl;
    this.videoEl.onloadedmetadata = function () {
        _this.videoEl.play();
    };
    this.chatMessageVideoBoxEl.style.display = 'flex';
    setTimeout(function () {
        _this.chatMessageVideoBoxEl.style.opacity = '1';
    });
}
close();
{
    try {
        this.downloadFileUrl = '';
        this.downloadFileName = '';
        this.videoEl.pause();
        this.videoEl.src = '';
    }
    finally {
        this.chatMessageVideoBoxEl.style.opacity = '0';
        setTimeout(function () {
            _this.chatMessageVideoBoxEl.style.display = 'none';
        }, 600);
    }
}
