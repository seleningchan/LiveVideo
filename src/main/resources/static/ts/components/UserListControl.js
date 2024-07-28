"use strict";
//用户列表组件
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var ChatRoomBoxBiz_js_1 = __importDefault(require("../main/ChatRoomBoxBiz.js"));
var CustomBoxControl_js_1 = __importDefault(require("./CustomBoxControl.js"));
var UserListControl = /** @class */ (function () {
    function UserListControl() {
    }
    //记录一下，用于删除
    UserListControl.userInfoBoxMap = new Map();
    //控制红点是否显示
    UserListControl.dotMap = new Map();
    return UserListControl;
}());
exports.default = UserListControl;
{
    this.userListBoxEl = document.createElement('div');
    this.userListBoxEl.classList.add('user-list-box');
}
getUserListBox();
HTMLDivElement;
{
    return this.userListBoxEl;
}
addUserInfoBox(id, string);
{
    var userInfoBox = document.createElement('div');
    userInfoBox.className = 'user-info-box';
    var userHeadSculpture = document.createElement('div');
    userHeadSculpture.className = 'user-head-sculpture';
    userHeadSculpture.innerText = 'ID';
    var userSfid = document.createElement('span');
    userSfid.className = 'user-sfid';
    userSfid.innerText = id;
    var userDot = document.createElement("div");
    userDot.className = 'user-dot';
    userInfoBox.appendChild(userHeadSculpture);
    userInfoBox.appendChild(userSfid);
    userInfoBox.appendChild(userDot);
    this.userListBoxEl.appendChild(userInfoBox);
    this.userInfoBoxMap.set(id, userInfoBox);
    this.dotMap.set(id, {
        userDotEl: userDot,
        needShow: true
    });
    userInfoBox.addEventListener('click', this.clickEvent.bind(this, id));
}
clickEvent(id, string);
{
    this.dotMap.get(id).needShow = false;
    this.hideUserDot(id);
    CustomBoxControl_js_1.default.open("私人消息", ChatRoomBoxBiz_js_1.default.getPrivateChatMessage(id).getChatMessageBoxEl(), function () { return _this.dotMap.get(id).needShow = true; });
}
showUserDot(id, string);
{
    //如果是false的话代表在聊天页，无需显示
    if (!this.dotMap.get(id).needShow) {
        return;
    }
    this.dotMap.get(id).userDotEl.style.display = 'block';
}
hideUserDot(id, string);
{
    this.dotMap.get(id).userDotEl.style.display = 'none';
}
delUserInfoBox(id, string);
{
    var userInfoBox = this.userInfoBoxMap.get(id);
    this.userListBoxEl.removeChild(userInfoBox);
}
