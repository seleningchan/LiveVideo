"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
//给用户列表使用，产生层次感
var UserListTipsControl = /** @class */ (function () {
    function UserListTipsControl() {
    }
    return UserListTipsControl;
}());
exports.default = UserListTipsControl;
{
    this.userListTipsBoxEl = document.createElement('div');
    this.userListTipsBoxEl.className = 'user-list-tips-box';
}
mount(el, HTMLElement);
{
    el.appendChild(this.userListTipsBoxEl);
}
unMount(el, HTMLElement);
{
    el.removeChild(this.userListTipsBoxEl);
}
createNode(componentEl, HTMLElement, title, string);
HTMLElement;
{
    var mainEl = document.createElement('div');
    mainEl.className = 'user-list-tips-box-main';
    var headEl = document.createElement('div');
    headEl.className = 'user-list-tips-box-main-header';
    var titleEl = document.createTextNode(title);
    var closeEl = document.createElement('div');
    closeEl.className = 'user-list-tips-box-main-close';
    closeEl.addEventListener('click', this.close.bind(this));
    var leftEl = document.createElement('div');
    leftEl.className = 'user-list-tips-box-main-left-close';
    var rightEl = document.createElement('div');
    rightEl.className = 'user-list-tips-box-main-right-close';
    var bodyEl = document.createElement('div');
    bodyEl.className = 'user-list-tips-box-main-body';
    var otherBoxEl = document.createElement('div');
    otherBoxEl.className = 'user-list-tips-box-main-body-other-box';
    //body里面填传过来的组件
    otherBoxEl.appendChild(componentEl);
    bodyEl.appendChild(otherBoxEl);
    closeEl.appendChild(leftEl);
    closeEl.appendChild(rightEl);
    headEl.appendChild(titleEl);
    headEl.appendChild(closeEl);
    mainEl.appendChild(headEl);
    mainEl.appendChild(bodyEl);
    return mainEl;
}
open(title, string, componentEl, HTMLElement, callbackFun, Function = function () { });
{
    //可以接受一个关闭回调函数
    this.callbackFun = callbackFun;
    //先清空
    this.userListTipsBoxEl.innerHTML = '';
    this.userListTipsBoxEl.appendChild(this.createNode(componentEl, title));
    this.userListTipsBoxEl.style.display = 'flex';
    setTimeout(function () {
        _this.userListTipsBoxEl.style.opacity = '1';
    });
}
close();
{
    //关闭的时候，可以执行一个函数,但是不能影响下面的业务
    setTimeout(function () {
        _this.callbackFun();
    });
    this.userListTipsBoxEl.style.opacity = '0';
    setTimeout(function () {
        _this.userListTipsBoxEl.style.display = 'none';
        _this.userListTipsBoxEl.innerHTML = '';
    }, 600);
}
