"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var FileUtil_js_1 = __importDefault(require("../utils/FileUtil.js"));
//因为自定义组件就在聊天上，没有办法再使用自定义组件，需要再写一个
var ChatMessageImageControl = /** @class */ (function () {
    function ChatMessageImageControl() {
    }
    return ChatMessageImageControl;
}());
exports.default = ChatMessageImageControl;
{
    this.chatMessageImageBoxEl = document.createElement('div');
    this.chatMessageImageBoxEl.className = 'chat-message-image-box';
    var mainEl = document.createElement('div');
    mainEl.className = 'chat-message-image-box-main';
    var headerEl = document.createElement('div');
    headerEl.className = 'chat-message-image-box-header';
    var closeEl = document.createElement('div');
    closeEl.className = 'chat-message-image-box-close';
    closeEl.addEventListener('click', this.close.bind(this));
    var leftEl = document.createElement('div');
    leftEl.className = 'chat-message-image-box-left';
    var rightEl = document.createElement('div');
    rightEl.className = 'chat-message-image-box-right';
    closeEl.appendChild(leftEl);
    closeEl.appendChild(rightEl);
    headerEl.appendChild(closeEl);
    mainEl.appendChild(headerEl);
    var bodyEl = document.createElement('div');
    bodyEl.className = 'chat-message-image-box-body';
    this.imageEl = document.createElement('img');
    this.imageEl.className = 'chat-message-image-box-img';
    bodyEl.appendChild(this.imageEl);
    mainEl.appendChild(bodyEl);
    var footerEl = document.createElement('div');
    footerEl.className = 'chat-message-image-box-footer';
    var btnBox = document.createElement('div');
    btnBox.className = 'button-box';
    btnBox.innerText = '下载';
    btnBox.addEventListener('click', function () {
        FileUtil_js_1.default.downloadFile(_this.downloadFileUrl, _this.downloadFileName);
    });
    footerEl.appendChild(btnBox);
    mainEl.appendChild(footerEl);
    this.chatMessageImageBoxEl.appendChild(mainEl);
}
mount(el, HTMLElement);
{
    el.appendChild(this.chatMessageImageBoxEl);
}
unMount(el, HTMLElement);
{
    el.removeChild(this.chatMessageImageBoxEl);
}
open(imageBaseUrl, string, fileName, string);
{
    this.downloadFileUrl = imageBaseUrl;
    this.downloadFileName = fileName;
    this.imageEl.src = imageBaseUrl;
    this.chatMessageImageBoxEl.style.display = 'flex';
    setTimeout(function () {
        _this.chatMessageImageBoxEl.style.opacity = '1';
    });
}
close();
{
    try {
        this.downloadFileUrl = '';
        this.downloadFileName = '';
        this.imageEl.src = '';
    }
    finally {
        this.chatMessageImageBoxEl.style.opacity = '0';
        setTimeout(function () {
            _this.chatMessageImageBoxEl.style.display = 'none';
        }, 600);
    }
}
