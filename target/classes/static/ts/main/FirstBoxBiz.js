"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var MessageBoxControl_js_1 = require("../components/MessageBoxControl.js");
var StringUtil_js_1 = __importDefault(require("../utils/StringUtil.js"));
//首个显示的界面功能处理
var FirstBoxBiz = /** @class */ (function () {
    function FirstBoxBiz() {
    }
    //运行
    FirstBoxBiz.run = function () {
        this.fisstBoxEl = document.querySelector('.first-box');
        this.firstformBoxEls = document.querySelectorAll(".first-form-box");
        this.createRoomBtn = document.querySelector('.create-room-btn');
        this.enterRoomBtn = document.querySelector('.enter-room-btn');
        this.createRoomNameInput = document.querySelector('.create-roomName');
        this.createMaxNumberInput = document.querySelector('.create-maxNumber');
        this.enterRoomNameInput = document.querySelector('.enter-roomName');
        this.toCreateRoom = document.querySelector('.to-create-room');
        this.toEnterRoom = document.querySelector('.to-enter-room');
        this.bindOverturnEvent();
        this.listerCreateRoom();
        this.listerEnterRoom();
    };
    //翻转控制
    FirstBoxBiz.bindOverturnEvent = function () {
        var _this = this;
        this.toEnterRoom.addEventListener('click', function () {
            _this.firstformBoxEls[0].style.transform = 'rotateY(180deg)';
            _this.firstformBoxEls[1].style.transform = 'rotateY(360deg)';
        });
        this.toCreateRoom.addEventListener('click', function () {
            _this.firstformBoxEls[0].style.transform = 'rotateY(0deg)';
            _this.firstformBoxEls[1].style.transform = 'rotateY(180deg)';
        });
    };
    //界面隐藏,只有刷新页面才会重新显示
    FirstBoxBiz.hide = function () {
        this.fisstBoxEl.style.display = 'none';
    };
    //创建房间信息检测
    FirstBoxBiz.chkCreateRoomInfo = function () {
        var roomName = this.createRoomNameInput.value;
        var maxNumber = this.createMaxNumberInput.value;
        if (this.chkRoomName(roomName) && this.chkMaxNumber(maxNumber)) {
            return {
                isAccept: true,
                roomName: roomName,
                maxNumber: window.parseInt(maxNumber)
            };
        }
        return {
            isAccept: false
        };
    };
    //进入房间信息检测
    FirstBoxBiz.chkEnterRoomInfo = function () {
        var roomName = this.enterRoomNameInput.value;
        if (this.chkRoomName(roomName)) {
            return {
                isAccept: true,
                roomName: roomName
            };
        }
        return {
            isAccept: false
        };
    };
    //房间名称检测
    FirstBoxBiz.chkRoomName = function (roomName) {
        if (StringUtil_js_1.default.chkObjNull(roomName)) {
            MessageBoxControl_js_1.MessageBoxControl.open("房间名称不能为空！");
            return false;
        }
        return true;
    };
    //最大报名数检测
    FirstBoxBiz.chkMaxNumber = function (maxNumber) {
        if (StringUtil_js_1.default.chkObjNull(maxNumber)) {
            MessageBoxControl_js_1.MessageBoxControl.open("房间最大人数不能为空！");
            return false;
        }
        var numV = parseInt(maxNumber);
        if (window.isNaN(numV)) {
            MessageBoxControl_js_1.MessageBoxControl.open("房间最大人数必须为数字！");
            return false;
        }
        if (numV < 2) {
            MessageBoxControl_js_1.MessageBoxControl.open("房间最大人数不得小于2！");
            return false;
        }
        return true;
    };
    //绑定回调事件
    FirstBoxBiz.bindCallBackFun = function (createRoomCallBackFun, enterRoomCallBackFun) {
        this.createRoomCallBackFun = createRoomCallBackFun;
        this.enterRoomCallBackFun = enterRoomCallBackFun;
    };
    //创建房间
    FirstBoxBiz.listerCreateRoom = function () {
        var _this = this;
        this.createRoomBtn.addEventListener('click', function () {
            var createRoomInfo = _this.chkCreateRoomInfo();
            if (createRoomInfo.isAccept) {
                _this.createRoomCallBackFun(createRoomInfo.roomName, createRoomInfo.maxNumber);
            }
        });
    };
    //进入房间
    FirstBoxBiz.listerEnterRoom = function () {
        var _this = this;
        this.enterRoomBtn.addEventListener('click', function () {
            var enterRoomInfo = _this.chkEnterRoomInfo();
            if (enterRoomInfo.isAccept) {
                _this.enterRoomCallBackFun(enterRoomInfo.roomName);
            }
        });
    };
    return FirstBoxBiz;
}());
exports.default = FirstBoxBiz;
