"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var FileTypeConstant_js_1 = __importDefault(require("../constant/FileTypeConstant.js"));
var FileUtil_js_1 = __importDefault(require("../utils/FileUtil.js"));
var StringUtil_js_1 = __importDefault(require("../utils/StringUtil.js"));
var ChatMessageImageControl_js_1 = __importDefault(require("./ChatMessageImageControl.js"));
var ChatMessageVideoControl_js_1 = __importDefault(require("./ChatMessageVideoControl.js"));
var LoadingControl_js_1 = __importDefault(require("./LoadingControl.js"));
var MessageBoxControl_js_1 = require("./MessageBoxControl.js");
//聊天界面控制
var ChatMessageControl = /** @class */ (function () {
    function ChatMessageControl() {
        this.chatMessageBoxEl = document.createElement('div');
        this.chatMessageBoxEl.classList.add('custom-use-box');
        this.chatMessageBoxEl.classList.add('chat-message-box');
        var chatMessageHeaderBox = document.createElement('div');
        chatMessageHeaderBox.className = 'chat-message-header-box';
        chatMessageHeaderBox.innerText = 'ID相当于此人的姓名，对应了视频显示框上面的id';
        this.chatMessageBoxEl.appendChild(chatMessageHeaderBox);
        this.chatMessageBodyBoxEl = document.createElement('div');
        this.chatMessageBodyBoxEl.className = 'chat-message-body-box';
        this.chatMessageBoxEl.appendChild(this.chatMessageBodyBoxEl);
        var chatMessageFooterBoxEl = document.createElement('div');
        chatMessageFooterBoxEl.className = 'chat-message-footer-box';
        var chatMessageInputBoxEl = document.createElement('div');
        chatMessageInputBoxEl.className = 'chat-message-input-box';
        this.chatMessageInputEl = document.createElement('input');
        chatMessageInputBoxEl.appendChild(this.chatMessageInputEl);
        chatMessageFooterBoxEl.appendChild(chatMessageInputBoxEl);
        this.chatMessageSendBtnEl = document.createElement('div');
        this.chatMessageSendBtnEl.className = 'chat-message-send-btn';
        this.chatMessageSendBtnEl.innerText = '发送';
        chatMessageFooterBoxEl.appendChild(this.chatMessageSendBtnEl);
        this.fileBoxEl = document.createElement('div');
        this.fileBoxEl.className = 'file-box';
        this.hideFileInputEl = document.createElement('input');
        this.hideFileInputEl.type = 'file';
        this.hideFileInputEl.style.display = 'none';
        this.fileBoxEl.appendChild(this.hideFileInputEl);
        var fileLeftBoxEl = document.createElement('div');
        fileLeftBoxEl.className = 'file-left-box';
        var fileRightBoxEl = document.createElement('div');
        fileRightBoxEl.className = 'file-right-box';
        this.fileBoxEl.appendChild(fileLeftBoxEl);
        this.fileBoxEl.appendChild(fileRightBoxEl);
        chatMessageFooterBoxEl.appendChild(this.fileBoxEl);
        this.chatMessageBoxEl.appendChild(chatMessageFooterBoxEl);
        this.bindMessageEvent();
    }
    //绑定消息监听事件
    ChatMessageControl.prototype.bindMessageEvent = function () {
        var _this = this;
        this.chatMessageInputEl.addEventListener('input', function (e) {
            _this.chatMessageInputEl.value = _this.chatMessageInputEl.value.trim();
            if (StringUtil_js_1.default.chkObjNull(_this.chatMessageInputEl.value)) {
                _this.chatMessageSendBtnEl.classList.remove('active');
            }
            else {
                _this.chatMessageSendBtnEl.classList.add('active');
            }
        });
    };
    //获取控件
    ChatMessageControl.prototype.getChatMessageBoxEl = function () {
        return this.chatMessageBoxEl;
    };
    //创建接收信息组件
    ChatMessageControl.prototype.createReceiveMessage = function (id, message) {
        var chatMessageBodyLeftBoxEl = document.createElement('div');
        chatMessageBodyLeftBoxEl.className = 'chat-message-body-left-box';
        var chatMessageBodyHeadSculpture = document.createElement('div');
        chatMessageBodyHeadSculpture.className = 'chat-message-body-head-sculpture';
        chatMessageBodyHeadSculpture.innerText = '他';
        chatMessageBodyLeftBoxEl.appendChild(chatMessageBodyHeadSculpture);
        var chatMessageBodyMessageBox = document.createElement('div');
        chatMessageBodyMessageBox.className = 'chat-message-body-message-box';
        var chatMessageBodyIdBox = document.createElement('span');
        chatMessageBodyIdBox.className = 'chat-message-body-id-box';
        chatMessageBodyIdBox.appendChild(document.createTextNode('ID:'));
        var chatMessageBodyId = document.createElement('span');
        chatMessageBodyId.className = 'chat-message-body-id';
        chatMessageBodyId.innerText = id;
        chatMessageBodyIdBox.appendChild(chatMessageBodyId);
        chatMessageBodyMessageBox.appendChild(chatMessageBodyIdBox);
        var chatMessageBodyMessage = document.createElement('div');
        chatMessageBodyMessage.className = 'chat-message-body-message';
        chatMessageBodyMessage.innerText = message;
        chatMessageBodyMessageBox.appendChild(chatMessageBodyMessage);
        chatMessageBodyLeftBoxEl.appendChild(chatMessageBodyMessageBox);
        this.chatMessageBodyBoxEl.appendChild(chatMessageBodyLeftBoxEl);
        //自动滚动到底部
        this.chatMessageBodyBoxEl.scrollTop = this.chatMessageBodyBoxEl.scrollHeight;
    };
    //创建发送信息组件
    ChatMessageControl.prototype.createSendMessage = function (id, message) {
        var chatMessageBodyRightBoxEl = document.createElement('div');
        chatMessageBodyRightBoxEl.className = 'chat-message-body-right-box';
        var chatMessageBodyMessageBox = document.createElement('div');
        chatMessageBodyMessageBox.className = 'chat-message-body-message-box';
        var chatMessageBodyIdBox = document.createElement('span');
        chatMessageBodyIdBox.className = 'chat-message-body-id-box';
        chatMessageBodyIdBox.appendChild(document.createTextNode('ID:'));
        var chatMessageBodyId = document.createElement('span');
        chatMessageBodyId.className = 'chat-message-body-id';
        chatMessageBodyId.innerText = id;
        chatMessageBodyIdBox.appendChild(chatMessageBodyId);
        chatMessageBodyMessageBox.appendChild(chatMessageBodyIdBox);
        var chatMessageBodyMessage = document.createElement('div');
        chatMessageBodyMessage.className = 'chat-message-body-message';
        chatMessageBodyMessage.innerText = message;
        chatMessageBodyMessageBox.appendChild(chatMessageBodyMessage);
        var chatMessageBodyHeadSculpture = document.createElement('div');
        chatMessageBodyHeadSculpture.className = 'chat-message-body-head-sculpture';
        chatMessageBodyHeadSculpture.innerText = '我';
        chatMessageBodyRightBoxEl.appendChild(chatMessageBodyMessageBox);
        chatMessageBodyRightBoxEl.appendChild(chatMessageBodyHeadSculpture);
        this.chatMessageBodyBoxEl.appendChild(chatMessageBodyRightBoxEl);
        //自动滚动到底部
        this.chatMessageBodyBoxEl.scrollTop = this.chatMessageBodyBoxEl.scrollHeight;
    };
    //创建接收图片组件
    ChatMessageControl.prototype.createReceiveImage = function (id, fileName, imgBase64Url) {
        var chatMessageBodyLeftBoxEl = document.createElement('div');
        chatMessageBodyLeftBoxEl.className = 'chat-message-body-left-box';
        var chatMessageBodyHeadSculpture = document.createElement('div');
        chatMessageBodyHeadSculpture.className = 'chat-message-body-head-sculpture';
        chatMessageBodyHeadSculpture.innerText = '他';
        chatMessageBodyLeftBoxEl.appendChild(chatMessageBodyHeadSculpture);
        var chatMessageBodyMessageBox = document.createElement('div');
        chatMessageBodyMessageBox.className = 'chat-message-body-message-box';
        var chatMessageBodyIdBox = document.createElement('span');
        chatMessageBodyIdBox.className = 'chat-message-body-id-box';
        chatMessageBodyIdBox.appendChild(document.createTextNode('ID:'));
        var chatMessageBodyId = document.createElement('span');
        chatMessageBodyId.className = 'chat-message-body-id';
        chatMessageBodyId.innerText = id;
        chatMessageBodyIdBox.appendChild(chatMessageBodyId);
        chatMessageBodyMessageBox.appendChild(chatMessageBodyIdBox);
        var chatMessageBodyMessage = document.createElement('div');
        chatMessageBodyMessage.className = 'chat-message-body-image-box';
        var imgEl = document.createElement('img');
        imgEl.className = 'chat-message-body-image';
        imgEl.src = imgBase64Url;
        chatMessageBodyMessage.appendChild(imgEl);
        chatMessageBodyMessageBox.appendChild(chatMessageBodyMessage);
        chatMessageBodyLeftBoxEl.appendChild(chatMessageBodyMessageBox);
        this.chatMessageBodyBoxEl.appendChild(chatMessageBodyLeftBoxEl);
        //自动滚动到底部
        this.chatMessageBodyBoxEl.scrollTop = this.chatMessageBodyBoxEl.scrollHeight;
        chatMessageBodyMessage.addEventListener('click', function () {
            ChatMessageImageControl_js_1.default.open(imgBase64Url, fileName);
        });
    };
    //创建发送图片组件
    ChatMessageControl.prototype.createSendImage = function (id, fileName, imgBase64Url) {
        var chatMessageBodyRightBoxEl = document.createElement('div');
        chatMessageBodyRightBoxEl.className = 'chat-message-body-right-box';
        var chatMessageBodyMessageBox = document.createElement('div');
        chatMessageBodyMessageBox.className = 'chat-message-body-message-box';
        var chatMessageBodyIdBox = document.createElement('span');
        chatMessageBodyIdBox.className = 'chat-message-body-id-box';
        chatMessageBodyIdBox.appendChild(document.createTextNode('ID:'));
        var chatMessageBodyId = document.createElement('span');
        chatMessageBodyId.className = 'chat-message-body-id';
        chatMessageBodyId.innerText = id;
        chatMessageBodyIdBox.appendChild(chatMessageBodyId);
        chatMessageBodyMessageBox.appendChild(chatMessageBodyIdBox);
        var chatMessageBodyMessage = document.createElement('div');
        chatMessageBodyMessage.className = 'chat-message-body-image-box';
        var imgEl = document.createElement('img');
        imgEl.className = 'chat-message-body-image';
        imgEl.src = imgBase64Url;
        chatMessageBodyMessage.appendChild(imgEl);
        chatMessageBodyMessageBox.appendChild(chatMessageBodyMessage);
        var chatMessageBodyHeadSculpture = document.createElement('div');
        chatMessageBodyHeadSculpture.className = 'chat-message-body-head-sculpture';
        chatMessageBodyHeadSculpture.innerText = '我';
        chatMessageBodyRightBoxEl.appendChild(chatMessageBodyMessageBox);
        chatMessageBodyRightBoxEl.appendChild(chatMessageBodyHeadSculpture);
        this.chatMessageBodyBoxEl.appendChild(chatMessageBodyRightBoxEl);
        //自动滚动到底部
        this.chatMessageBodyBoxEl.scrollTop = this.chatMessageBodyBoxEl.scrollHeight;
        chatMessageBodyMessage.addEventListener('click', function () {
            ChatMessageImageControl_js_1.default.open(imgBase64Url, fileName);
        });
    };
    //创建接收视频组件
    ChatMessageControl.prototype.createReceiveVideo = function (id, fileName, videoBaseUrl) {
        var chatMessageBodyLeftBoxEl = document.createElement('div');
        chatMessageBodyLeftBoxEl.className = 'chat-message-body-left-box';
        var chatMessageBodyHeadSculpture = document.createElement('div');
        chatMessageBodyHeadSculpture.className = 'chat-message-body-head-sculpture';
        chatMessageBodyHeadSculpture.innerText = '他';
        chatMessageBodyLeftBoxEl.appendChild(chatMessageBodyHeadSculpture);
        var chatMessageBodyMessageBox = document.createElement('div');
        chatMessageBodyMessageBox.className = 'chat-message-body-message-box';
        var chatMessageBodyIdBox = document.createElement('span');
        chatMessageBodyIdBox.className = 'chat-message-body-id-box';
        chatMessageBodyIdBox.appendChild(document.createTextNode('ID:'));
        var chatMessageBodyId = document.createElement('span');
        chatMessageBodyId.className = 'chat-message-body-id';
        chatMessageBodyId.innerText = id;
        chatMessageBodyIdBox.appendChild(chatMessageBodyId);
        chatMessageBodyMessageBox.appendChild(chatMessageBodyIdBox);
        var chatMessageBodyMessage = document.createElement('div');
        chatMessageBodyMessage.className = 'chat-message-body-video-box';
        var videoEl = document.createElement('video');
        videoEl.className = 'chat-message-body-video';
        videoEl.src = videoBaseUrl;
        chatMessageBodyMessage.appendChild(videoEl);
        chatMessageBodyMessageBox.appendChild(chatMessageBodyMessage);
        chatMessageBodyLeftBoxEl.appendChild(chatMessageBodyMessageBox);
        this.chatMessageBodyBoxEl.appendChild(chatMessageBodyLeftBoxEl);
        //自动滚动到底部
        this.chatMessageBodyBoxEl.scrollTop = this.chatMessageBodyBoxEl.scrollHeight;
        chatMessageBodyMessage.addEventListener('click', function () {
            ChatMessageVideoControl_js_1.default.open(videoBaseUrl, fileName);
        });
    };
    //创建发送视频组件
    ChatMessageControl.prototype.createSendVideo = function (id, fileName, videoBaseUrl) {
        var chatMessageBodyRightBoxEl = document.createElement('div');
        chatMessageBodyRightBoxEl.className = 'chat-message-body-right-box';
        var chatMessageBodyMessageBox = document.createElement('div');
        chatMessageBodyMessageBox.className = 'chat-message-body-message-box';
        var chatMessageBodyIdBox = document.createElement('span');
        chatMessageBodyIdBox.className = 'chat-message-body-id-box';
        chatMessageBodyIdBox.appendChild(document.createTextNode('ID:'));
        var chatMessageBodyId = document.createElement('span');
        chatMessageBodyId.className = 'chat-message-body-id';
        chatMessageBodyId.innerText = id;
        chatMessageBodyIdBox.appendChild(chatMessageBodyId);
        chatMessageBodyMessageBox.appendChild(chatMessageBodyIdBox);
        var chatMessageBodyMessage = document.createElement('div');
        chatMessageBodyMessage.className = 'chat-message-body-video-box';
        var videoEl = document.createElement('video');
        videoEl.className = 'chat-message-body-video';
        videoEl.src = videoBaseUrl;
        chatMessageBodyMessage.appendChild(videoEl);
        chatMessageBodyMessageBox.appendChild(chatMessageBodyMessage);
        var chatMessageBodyHeadSculpture = document.createElement('div');
        chatMessageBodyHeadSculpture.className = 'chat-message-body-head-sculpture';
        chatMessageBodyHeadSculpture.innerText = '我';
        chatMessageBodyRightBoxEl.appendChild(chatMessageBodyMessageBox);
        chatMessageBodyRightBoxEl.appendChild(chatMessageBodyHeadSculpture);
        this.chatMessageBodyBoxEl.appendChild(chatMessageBodyRightBoxEl);
        //自动滚动到底部
        this.chatMessageBodyBoxEl.scrollTop = this.chatMessageBodyBoxEl.scrollHeight;
        chatMessageBodyMessage.addEventListener('click', function () {
            ChatMessageVideoControl_js_1.default.open(videoBaseUrl, fileName);
        });
    };
    //创建接受文件组件
    ChatMessageControl.prototype.createReceiveFile = function (id, fileName, url) {
        var chatMessageBodyLeftBoxEl = document.createElement('div');
        chatMessageBodyLeftBoxEl.className = 'chat-message-body-left-box';
        var chatMessageBodyHeadSculpture = document.createElement('div');
        chatMessageBodyHeadSculpture.className = 'chat-message-body-head-sculpture';
        chatMessageBodyHeadSculpture.innerText = '他';
        chatMessageBodyLeftBoxEl.appendChild(chatMessageBodyHeadSculpture);
        var chatMessageBodyMessageBox = document.createElement('div');
        chatMessageBodyMessageBox.className = 'chat-message-body-message-box';
        var chatMessageBodyIdBox = document.createElement('span');
        chatMessageBodyIdBox.className = 'chat-message-body-id-box';
        chatMessageBodyIdBox.appendChild(document.createTextNode('ID:'));
        var chatMessageBodyId = document.createElement('span');
        chatMessageBodyId.className = 'chat-message-body-id';
        chatMessageBodyId.innerText = id;
        chatMessageBodyIdBox.appendChild(chatMessageBodyId);
        chatMessageBodyMessageBox.appendChild(chatMessageBodyIdBox);
        var chatMessageBodyFile = document.createElement('div');
        chatMessageBodyFile.className = 'chat-message-body-message-file';
        var chatMessageBodyMessageFileBody = document.createElement('div');
        chatMessageBodyMessageFileBody.className = 'chat-message-body-message-file-body';
        var imgEl = document.createElement('img');
        imgEl.className = 'chat-message-body-message-file-icon';
        imgEl.src = './src/img/file-icon.png';
        chatMessageBodyMessageFileBody.appendChild(imgEl);
        var chatMessageBodyMessageFileName = document.createElement('span');
        chatMessageBodyMessageFileName.className = 'chat-message-body-message-file-name';
        chatMessageBodyMessageFileName.innerText = fileName;
        chatMessageBodyMessageFileBody.appendChild(chatMessageBodyMessageFileName);
        chatMessageBodyFile.appendChild(chatMessageBodyMessageFileBody);
        var chatMessageBodyMessageFileFooter = document.createElement('div');
        chatMessageBodyMessageFileFooter.className = 'chat-message-body-message-file-footer';
        var chatMessageBodyMessageFileStyleText = document.createElement('span');
        chatMessageBodyMessageFileStyleText.className = 'chat-message-body-message-file-style-text';
        var suffixName = FileUtil_js_1.default.getFileSuffixName(fileName);
        if (StringUtil_js_1.default.chkObjNull(suffixName)) {
            chatMessageBodyMessageFileStyleText.innerText = '未知文件';
        }
        else {
            chatMessageBodyMessageFileStyleText.innerText = suffixName + '文件';
        }
        chatMessageBodyMessageFileFooter.appendChild(chatMessageBodyMessageFileStyleText);
        var chatMessageBodyMessageFileDownloadBtn = document.createElement('div');
        chatMessageBodyMessageFileDownloadBtn.className = 'chat-message-body-message-file-download-btn';
        chatMessageBodyMessageFileDownloadBtn.innerText = '下载';
        chatMessageBodyMessageFileDownloadBtn.addEventListener('click', function () { return FileUtil_js_1.default.downloadFile(url, fileName); });
        chatMessageBodyMessageFileFooter.appendChild(chatMessageBodyMessageFileDownloadBtn);
        chatMessageBodyFile.appendChild(chatMessageBodyMessageFileFooter);
        chatMessageBodyMessageBox.appendChild(chatMessageBodyFile);
        chatMessageBodyLeftBoxEl.appendChild(chatMessageBodyMessageBox);
        this.chatMessageBodyBoxEl.appendChild(chatMessageBodyLeftBoxEl);
        //自动滚动到底部
        this.chatMessageBodyBoxEl.scrollTop = this.chatMessageBodyBoxEl.scrollHeight;
    };
    //创建发送文件组件
    ChatMessageControl.prototype.createSendFile = function (id, fileName, url) {
        var chatMessageBodyRightBoxEl = document.createElement('div');
        chatMessageBodyRightBoxEl.className = 'chat-message-body-right-box';
        var chatMessageBodyMessageBox = document.createElement('div');
        chatMessageBodyMessageBox.className = 'chat-message-body-message-box';
        var chatMessageBodyIdBox = document.createElement('span');
        chatMessageBodyIdBox.className = 'chat-message-body-id-box';
        chatMessageBodyIdBox.appendChild(document.createTextNode('ID:'));
        var chatMessageBodyId = document.createElement('span');
        chatMessageBodyId.className = 'chat-message-body-id';
        chatMessageBodyId.innerText = id;
        chatMessageBodyIdBox.appendChild(chatMessageBodyId);
        chatMessageBodyMessageBox.appendChild(chatMessageBodyIdBox);
        var chatMessageBodyFile = document.createElement('div');
        chatMessageBodyFile.className = 'chat-message-body-message-file';
        var chatMessageBodyMessageFileBody = document.createElement('div');
        chatMessageBodyMessageFileBody.className = 'chat-message-body-message-file-body';
        var imgEl = document.createElement('img');
        imgEl.className = 'chat-message-body-message-file-icon';
        imgEl.src = './src/img/file-icon.png';
        chatMessageBodyMessageFileBody.appendChild(imgEl);
        var chatMessageBodyMessageFileName = document.createElement('span');
        chatMessageBodyMessageFileName.className = 'chat-message-body-message-file-name';
        chatMessageBodyMessageFileName.innerText = fileName;
        chatMessageBodyMessageFileBody.appendChild(chatMessageBodyMessageFileName);
        chatMessageBodyFile.appendChild(chatMessageBodyMessageFileBody);
        var chatMessageBodyMessageFileFooter = document.createElement('div');
        chatMessageBodyMessageFileFooter.className = 'chat-message-body-message-file-footer';
        var chatMessageBodyMessageFileStyleText = document.createElement('span');
        chatMessageBodyMessageFileStyleText.className = 'chat-message-body-message-file-style-text';
        var suffixName = FileUtil_js_1.default.getFileSuffixName(fileName);
        if (StringUtil_js_1.default.chkObjNull(suffixName)) {
            chatMessageBodyMessageFileStyleText.innerText = '未知文件';
        }
        else {
            chatMessageBodyMessageFileStyleText.innerText = suffixName + '文件';
        }
        chatMessageBodyMessageFileFooter.appendChild(chatMessageBodyMessageFileStyleText);
        var chatMessageBodyMessageFileDownloadBtn = document.createElement('div');
        chatMessageBodyMessageFileDownloadBtn.className = 'chat-message-body-message-file-download-btn';
        chatMessageBodyMessageFileDownloadBtn.innerText = '下载';
        chatMessageBodyMessageFileDownloadBtn.addEventListener('click', function () { return FileUtil_js_1.default.downloadFile(url, fileName); });
        chatMessageBodyMessageFileFooter.appendChild(chatMessageBodyMessageFileDownloadBtn);
        chatMessageBodyFile.appendChild(chatMessageBodyMessageFileFooter);
        chatMessageBodyMessageBox.appendChild(chatMessageBodyFile);
        var chatMessageBodyHeadSculpture = document.createElement('div');
        chatMessageBodyHeadSculpture.className = 'chat-message-body-head-sculpture';
        chatMessageBodyHeadSculpture.innerText = '我';
        chatMessageBodyRightBoxEl.appendChild(chatMessageBodyMessageBox);
        chatMessageBodyRightBoxEl.appendChild(chatMessageBodyHeadSculpture);
        this.chatMessageBodyBoxEl.appendChild(chatMessageBodyRightBoxEl);
        //自动滚动到底部
        this.chatMessageBodyBoxEl.scrollTop = this.chatMessageBodyBoxEl.scrollHeight;
    };
    //绑定发送点击事件
    ChatMessageControl.prototype.bindSendMessageFun = function (id, callBackFun) {
        var _this = this;
        this.chatMessageSendBtnEl.addEventListener('click', function () {
            //不是活动状态或则为空都不处理
            if (!_this.chatMessageSendBtnEl.classList.contains('active')) {
                return;
            }
            var message = _this.chatMessageInputEl.value;
            if (StringUtil_js_1.default.chkObjNull(message)) {
                return;
            }
            //检验消息长度
            if (message.length > FileUtil_js_1.default.maxMessageLenght) {
                MessageBoxControl_js_1.MessageBoxControl.open("你发送的消息过长，已对消息进行截取发送！");
                message = message.substring(0, FileUtil_js_1.default.maxMessageLenght - FileUtil_js_1.default.overMaxMessageSuffix.length) + FileUtil_js_1.default.overMaxMessageSuffix;
            }
            //发送
            _this.createSendMessage(id, message);
            callBackFun(message);
            _this.chatMessageInputEl.value = '';
            _this.chatMessageSendBtnEl.classList.remove('active');
        });
    };
    //绑定发送文件事件
    ChatMessageControl.prototype.bindSelectSendFileFun = function (id, callBackFun) {
        var _this = this;
        this.fileBoxEl.addEventListener('click', function () {
            _this.hideFileInputEl.click();
        });
        this.hideFileInputEl.addEventListener('change', function () {
            var file = _this.hideFileInputEl.files[0];
            //没有选择文件
            if (file == undefined) {
                return;
            }
            //检查文件大小
            if (file.size > FileUtil_js_1.default.fileMaxSize) {
                MessageBoxControl_js_1.MessageBoxControl.open("文件最大不得超过" + Math.floor(FileUtil_js_1.default.fileMaxSize / 1024 / 1024) + "MB!");
                return;
            }
            var fileName = file.name;
            //对文件进行base64处理
            FileUtil_js_1.default.fileToBaseInfo(file, function (fileStyle, fileBaseUrl) {
                //发送文件超过限定大小，进行分片
                if (file.size > FileUtil_js_1.default.sendMaxSize) {
                    //开启loading,发完之后再显示
                    LoadingControl_js_1.default.open();
                    FileUtil_js_1.default.splitBaseUrl(fileBaseUrl, function (splitStr, currentNum, totalNum) {
                        callBackFun(splitStr, fileName, fileStyle, true, currentNum, totalNum);
                    }, function () {
                        if (fileStyle.startsWith(FileTypeConstant_js_1.default.imgType)) {
                            _this.createSendImage(id, fileName, fileBaseUrl);
                        }
                        else if (fileStyle.startsWith(FileTypeConstant_js_1.default.videoType)) {
                            _this.createSendVideo(id, fileName, fileBaseUrl);
                        }
                        else {
                            _this.createSendFile(id, fileName, fileBaseUrl);
                        }
                    });
                }
                else {
                    //普通的直接显示即可
                    if (fileStyle.startsWith(FileTypeConstant_js_1.default.imgType)) {
                        _this.createSendImage(id, fileName, fileBaseUrl);
                    }
                    else if (fileStyle.startsWith(FileTypeConstant_js_1.default.videoType)) {
                        _this.createSendVideo(id, fileName, fileBaseUrl);
                    }
                    else {
                        _this.createSendFile(id, fileName, fileBaseUrl);
                    }
                    callBackFun(fileBaseUrl, fileName, fileStyle, false, 0, 0);
                }
            });
            _this.hideFileInputEl.value = '';
        });
    };
    //接受消息
    ChatMessageControl.prototype.receiveMessage = function (id, message) {
        this.createReceiveMessage(id, message);
    };
    //接受文件
    ChatMessageControl.prototype.receiveFile = function (id, fileName, fileBaseUrl, fileStyle, isSplit, currentNum, totalNum) {
        var _this = this;
        //不是分片直接显示
        if (!isSplit) {
            if (fileStyle.startsWith(FileTypeConstant_js_1.default.imgType)) {
                this.createReceiveImage(id, fileName, fileBaseUrl);
            }
            else if (fileStyle.startsWith(FileTypeConstant_js_1.default.videoType)) {
                this.createReceiveVideo(id, fileName, fileBaseUrl);
            }
            else {
                this.createReceiveFile(id, fileName, fileBaseUrl);
            }
        }
        else {
            //是分片进行合并
            FileUtil_js_1.default.mergeBaseUrl(id, fileBaseUrl, currentNum, totalNum, function (mergeBaseUrl) {
                if (fileStyle.startsWith(FileTypeConstant_js_1.default.imgType)) {
                    _this.createReceiveImage(id, fileName, mergeBaseUrl);
                }
                else if (fileStyle.startsWith(FileTypeConstant_js_1.default.videoType)) {
                    _this.createReceiveVideo(id, fileName, mergeBaseUrl);
                }
                else {
                    _this.createReceiveFile(id, fileName, mergeBaseUrl);
                }
            });
        }
    };
    return ChatMessageControl;
}());
exports.default = ChatMessageControl;
