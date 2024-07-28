"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LoadingControl_js_1 = __importDefault(require("../components/LoadingControl.js"));
var MessageBoxControl_js_1 = require("../components/MessageBoxControl.js");
var VideoMaxBoxControl_js_1 = require("../components/VideoMaxBoxControl.js");
var FirstBoxBiz_js_1 = __importDefault(require("./FirstBoxBiz.js"));
var ConfirmTipsBoxControl_js_1 = require("../components/ConfirmTipsBoxControl.js");
var OutputStreamUtil_js_1 = __importDefault(require("../utils/OutputStreamUtil.js"));
var SelfVideoBoxControl_js_1 = __importDefault(require("../components/SelfVideoBoxControl.js"));
var CanvasStyle_js_1 = __importDefault(require("../constant/CanvasStyle.js"));
var SelectBoxControl_js_1 = __importDefault(require("../components/SelectBoxControl.js"));
var TvBoxControl_js_1 = __importDefault(require("../components/TvBoxControl.js"));
var ChatRoomBoxBiz_js_1 = __importDefault(require("./ChatRoomBoxBiz.js"));
var SignTransferUtil_js_1 = __importDefault(require("../utils/SignTransferUtil.js"));
var CustomBoxControl_js_1 = __importDefault(require("../components/CustomBoxControl.js"));
var UserListTipsControl_js_1 = __importDefault(require("../components/UserListTipsControl.js"));
var ChatMessageImageControl_js_1 = __importDefault(require("../components/ChatMessageImageControl.js"));
var ChatMessageVideoControl_js_1 = __importDefault(require("../components/ChatMessageVideoControl.js"));
//处理主要业务
var MainBiz = /** @class */ (function () {
    function MainBiz() {
    }
    //运行
    MainBiz.run = function () {
        var _this = this;
        LoadingControl_js_1.default.mount(this.bodyEl);
        MessageBoxControl_js_1.MessageBoxControl.mount(this.bodyEl);
        VideoMaxBoxControl_js_1.VideoMaxBoxControl.mount(this.bodyEl);
        ConfirmTipsBoxControl_js_1.ConfirmTipsBoxControl.mount(this.bodyEl);
        CustomBoxControl_js_1.default.mount(this.bodyEl);
        UserListTipsControl_js_1.default.mount(this.bodyEl);
        ChatMessageImageControl_js_1.default.mount(this.bodyEl);
        ChatMessageVideoControl_js_1.default.mount(this.bodyEl);
        //创建房间和进入房间页
        this.firstBoxViewCode(function () {
            //回调函数，给予节点加载时间，防止获取不到节点
            FirstBoxBiz_js_1.default.run();
        });
        FirstBoxBiz_js_1.default.bindCallBackFun(function (roomName, maxNumber) {
            //创建房间
            _this.createRoom(roomName, maxNumber);
        }, function (roomName) {
            //进入房间
            _this.enterRoom(roomName);
        });
        //视频聊天框
        this.chatRoomBoxCode(function () {
            ChatRoomBoxBiz_js_1.default.run();
            ChatRoomBoxBiz_js_1.default.hide();
        });
        ChatRoomBoxBiz_js_1.default.bindCloseCallBackFun(function () { return SignTransferUtil_js_1.default.close(); });
        this.setSelfVideoStyle();
        //处理所有下拉框
        SelectBoxControl_js_1.default.run();
        //屏幕共享
        TvBoxControl_js_1.default.run();
        //绑定打开和关闭流
        TvBoxControl_js_1.default.bindEvent(function () {
            OutputStreamUtil_js_1.default.getDisplayMedia(_this.selfVideoBox.modifyVideo.bind(_this.selfVideoBox), function () {
                TvBoxControl_js_1.default.publicClose();
                OutputStreamUtil_js_1.default.getUserMedia(_this.selfVideoBox.modifyVideo.bind(_this.selfVideoBox));
            });
        }, function () {
            OutputStreamUtil_js_1.default.getUserMedia(_this.selfVideoBox.modifyVideo.bind(_this.selfVideoBox));
        });
    };
    //创建房间
    MainBiz.createRoom = function (roomName, maxNumber) {
        var _this = this;
        OutputStreamUtil_js_1.default.getUserMedia(function (stream) {
            LoadingControl_js_1.default.open();
            _this.selfVideoBox.createVideo(stream);
            ChatRoomBoxBiz_js_1.default.addVideoBox(_this.selfVideoBox);
            SignTransferUtil_js_1.default.createRoom(roomName, maxNumber, _this.selfVideoBox.getStream());
        });
    };
    //进入房间
    MainBiz.enterRoom = function (roomName) {
        var _this = this;
        OutputStreamUtil_js_1.default.getUserMedia(function (stream) {
            LoadingControl_js_1.default.open();
            _this.selfVideoBox.createVideo(stream);
            ChatRoomBoxBiz_js_1.default.addVideoBox(_this.selfVideoBox);
            SignTransferUtil_js_1.default.enterRoom(roomName, _this.selfVideoBox.getStream());
        });
    };
    //赋予自定义下拉框视频样式值
    MainBiz.setSelfVideoStyle = function () {
        var selfVideoStyleSelect = document.querySelector('.self-video-style');
        //绑定下拉框点击事件,记得修改this
        SelectBoxControl_js_1.default.bindChangeEvent(selfVideoStyleSelect, this.selfVideoBox.modifyStyle.bind(this.selfVideoBox));
        CanvasStyle_js_1.default.getStyleMap().forEach(function (v, k) {
            var divEl = document.createElement('div');
            if (k === 'original') {
                divEl.setAttribute("check", "check");
            }
            divEl.className = 'select-option-box';
            divEl.setAttribute('value', k);
            divEl.innerText = v;
            selfVideoStyleSelect.appendChild(divEl);
        });
    };
    //首次显示页面部分代码
    MainBiz.firstBoxViewCode = function (callBackFun) {
        var firstBoxEl = document.createElement('div');
        firstBoxEl.className = 'first-box';
        var firstBoxContent = "\n            <div class=\"first-form-box\">\n                <div class=\"first-form-create-room\">\n                    <div class=\"first-form-header\">\n                        <span>webrtc\u89C6\u9891\u804A\u5929\u5BA4</span>\n                    </div>\n                    <div class=\"first-form-body\">\n                        <div class=\"input-box-box\">\n                            <span>\u623F\u95F4\u540D\u79F0\uFF1A</span>\n                            <div class=\"input-box\">\n                                <input type=\"text\" class=\"create-roomName\" placeholder=\"\u8BF7\u8F93\u5165\u623F\u95F4\u540D\u79F0...\">\n                            </div>\n                        </div>\n                        <div class=\"input-box-box\">\n                            <span>\u623F\u95F4\u6700\u5927\u4EBA\u6570\uFF1A</span>\n                            <div class=\"input-box\">\n                                <input type=\"number\" class=\"create-maxNumber\" placeholder=\"\u8BF7\u8F93\u5165\u623F\u95F4\u6700\u5927\u4EBA\u6570...\">\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"first-form-footer\">\n                        <div class=\"button-box create-room-btn\">\u521B\u5EFA\u623F\u95F4</div>\n                        <span style=\"font-size: .9em;cursor: pointer;\" class=\"to-enter-room\">>>>\u8FDB\u5165\u623F\u95F4\u9875</span>\n                    </div>\n                </div>\n            </div>\n            <div class=\"first-form-box\">\n                <div class=\"first-form-enter-room\">\n                    <div class=\"first-form-header\">\n                        <span>webrtc\u89C6\u9891\u804A\u5929\u5BA4</span>\n                    </div>\n                    <div class=\"first-form-body\">\n                        <div class=\"input-box-box\">\n                            <span>\u623F\u95F4\u540D\u79F0\uFF1A</span>\n                            <div class=\"input-box\">\n                                <input type=\"text\" class=\"enter-roomName\" placeholder=\"\u8BF7\u8F93\u5165\u623F\u95F4\u540D\u79F0...\">\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"first-form-footer\">\n                        <div class=\"button-box enter-room-btn\">\u8FDB\u5165\u623F\u95F4</div>\n                        <span style=\"font-size: .9em;cursor: pointer;\" class=\"to-create-room\">>>>\u521B\u5EFA\u623F\u95F4\u9875</span>\n                    </div>\n                </div>\n            </div>\n        ";
        firstBoxEl.innerHTML = firstBoxContent;
        this.bodyEl.appendChild(firstBoxEl);
        setTimeout(function () {
            callBackFun();
        });
    };
    MainBiz.chatRoomBoxCode = function (callBackFun) {
        var chatRoomBoxEl = document.createElement('div');
        chatRoomBoxEl.className = 'chat-room-box';
        var chatRoomCode = "\n            <div class=\"chat-room-header-box\">\n                <div class=\"exit-chat-room\">\n                    <div class=\"exit-chat-room-left\"></div>\n                    <div class=\"exit-chat-room-right\"></div>\n                </div>\n                <span></span>\n            </div>\n            <div class=\"chat-room-body-box\">\n                <div class=\"chat-room-body-video-box\">\n                </div>\n            </div>\n            <div class=\"chat-room-footer-box\">\n                <div class=\"chat-room-footer-left-box\">\n                    <span>\u89C6\u9891\u6837\u5F0F\uFF1A</span>\n                    <div class=\"select-box\">\n                        <span>test</span>\n                        <div class=\"select-option-box-box self-video-style\">\n                        </div>\n                    </div>\n                </div>\n                <div class=\"chat-room-footer-middle-box\">\n                    <div class=\"tv-box\">\n                        <div class=\"tv-header-box\">\n                            <span>TV</span>\n                        </div>\n                        <div class=\"tv-body-box\">\n                        </div>\n                        <div class=\"tv-footer-box\">\n                        </div>\n                    </div>\n                </div>\n                <div class=\"chat-room-footer-right-box\">\n                    <div class=\"chat-message-btn-box\">\n                        <div class=\"chat-message-left-btn\">\n                            <div class=\"chat-message-left-dot\"></div>\n                            \u5168\u5458\u6D88\u606F\n                        </div>\n                        <div class=\"chat-message-right-btn\">\n                            <div class=\"chat-message-right-dot\"></div>\n                            \u79C1\u4EBA\u6D88\u606F\n                        </div>\n                    </div>\n                </div>\n            </div>\n        ";
        chatRoomBoxEl.innerHTML = chatRoomCode;
        this.bodyEl.appendChild(chatRoomBoxEl);
        setTimeout(function () {
            callBackFun();
        });
    };
    MainBiz.bodyEl = document.body;
    MainBiz.selfVideoBox = new SelfVideoBoxControl_js_1.default();
    return MainBiz;
}());
exports.default = MainBiz;
