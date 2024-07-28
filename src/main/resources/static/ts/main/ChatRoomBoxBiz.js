"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ConfirmTipsBoxControl_js_1 = require("../components/ConfirmTipsBoxControl.js");
var CustomBoxControl_js_1 = __importDefault(require("../components/CustomBoxControl.js"));
var UserListControl_js_1 = __importDefault(require("../components/UserListControl.js"));
var UserListTipsControl_js_1 = __importDefault(require("../components/UserListTipsControl.js"));
//聊天室业务控制
var ChatRoomBoxBiz = /** @class */ (function () {
    function ChatRoomBoxBiz() {
    }
    //运行
    ChatRoomBoxBiz.run = function () {
        this.chatRoomBoxEl = document.querySelector('.chat-room-box');
        this.exitChatRoomEl = document.querySelector('.exit-chat-room');
        this.chatRoomNameEl = this.exitChatRoomEl.nextElementSibling;
        this.chatRoomBodyVideoBoxEl = document.querySelector('.chat-room-body-video-box');
        this.chatMessageLeftBtn = document.querySelector('.chat-message-left-btn');
        this.chatMessageRightBtn = document.querySelector('.chat-message-right-btn');
        this.chatMessageLeftDot = document.querySelector('.chat-message-left-dot');
        this.chatMessageRightDot = document.querySelector('.chat-message-right-dot');
        this.listerClickCloseEvent();
        this.listerPrivateBtnClick();
        this.listerPublicBtnClick();
    };
    //设置房间名
    ChatRoomBoxBiz.setRoomName = function (roomName) {
        this.chatRoomNameEl.innerText = '房间名：' + roomName;
    };
    //添加一个视频组件
    ChatRoomBoxBiz.addVideoBox = function (videoBox) {
        this.chatRoomBodyVideoBoxEl.appendChild(videoBox.getVideoBoxEl());
    };
    //去掉一个视频组件
    ChatRoomBoxBiz.delVideoBox = function (videoBox) {
        this.chatRoomBodyVideoBoxEl.removeChild(videoBox.getVideoBoxEl());
    };
    //绑定关闭回调事件
    ChatRoomBoxBiz.bindCloseCallBackFun = function (callBackFun) {
        this.closeCallBackFun = callBackFun;
    };
    //隐藏页面
    ChatRoomBoxBiz.hide = function () {
        this.chatRoomBoxEl.style.display = 'none';
    };
    //显示页面
    ChatRoomBoxBiz.show = function () {
        document.body.style.backgroundColor = '#111';
        this.chatRoomBoxEl.style.display = 'flex';
    };
    //监听点击关闭事件
    ChatRoomBoxBiz.listerClickCloseEvent = function () {
        var _this = this;
        this.exitChatRoomEl.addEventListener('click', function () {
            ConfirmTipsBoxControl_js_1.ConfirmTipsBoxControl.open("确定要退出吗？", function () { return _this.closeCallBackFun(); });
        });
    };
    //显示全员消息小红点
    ChatRoomBoxBiz.showPublicDot = function () {
        if (this.publicFlag) {
            //如果当前已经在全员页不处理
            return;
        }
        this.chatMessageLeftDot.style.display = 'block';
    };
    //隐藏全员消息小红点
    ChatRoomBoxBiz.hidePublicDot = function () {
        this.chatMessageLeftDot.style.display = 'none';
    };
    //显示私有消息小红点
    ChatRoomBoxBiz.showPrivateDot = function () {
        if (this.privateFlag) {
            //如果当前已经在私有聊天页不处理
            return;
        }
        this.chatMessageRightDot.style.display = 'block';
    };
    //隐藏私有消息小红点
    ChatRoomBoxBiz.hidePrivateDot = function () {
        this.chatMessageRightDot.style.display = 'none';
    };
    //房间全部人员聊天按钮
    ChatRoomBoxBiz.listerPublicBtnClick = function () {
        var _this = this;
        this.chatMessageLeftBtn.addEventListener('click', function () {
            //开启公共标识
            _this.publicFlag = true;
            _this.hidePublicDot();
            CustomBoxControl_js_1.default.open("全员聊天", _this.publicChatMessage.getChatMessageBoxEl(), function () { return _this.publicFlag = false; });
        });
    };
    //房间私人聊天按钮
    ChatRoomBoxBiz.listerPrivateBtnClick = function () {
        var _this = this;
        this.chatMessageRightBtn.addEventListener('click', function () {
            //开启私有标识
            _this.privateFlag = true;
            _this.hidePrivateDot();
            UserListTipsControl_js_1.default.open("用户列表", UserListControl_js_1.default.getUserListBox(), function () { return _this.privateFlag = false; });
        });
    };
    //添加私人聊天框
    ChatRoomBoxBiz.addPrivateChatMessage = function (id, chatMessage) {
        this.privateChatMessageMap.set(id, chatMessage);
        UserListControl_js_1.default.addUserInfoBox(id);
    };
    //获取私人聊天框
    ChatRoomBoxBiz.getPrivateChatMessage = function (id) {
        return this.privateChatMessageMap.get(id);
    };
    //删除私用聊天框
    ChatRoomBoxBiz.delPrivateMessage = function (id) {
        this.privateChatMessageMap.delete(id);
        UserListControl_js_1.default.delUserInfoBox(id);
    };
    //设置全员聊天框，只有一个
    ChatRoomBoxBiz.setPublicChatMessage = function (chatMessage) {
        this.publicChatMessage = chatMessage;
    };
    //获取全员聊天
    ChatRoomBoxBiz.getPublicChatMessage = function () {
        return this.publicChatMessage;
    };
    ChatRoomBoxBiz.privateFlag = false;
    ChatRoomBoxBiz.publicFlag = false;
    ChatRoomBoxBiz.privateChatMessageMap = new Map();
    return ChatRoomBoxBiz;
}());
exports.default = ChatRoomBoxBiz;
