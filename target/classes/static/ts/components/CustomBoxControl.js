"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
//可接受自定义的浮层
var CustomBoxControl = /** @class */ (function () {
    function CustomBoxControl() {
    }
    return CustomBoxControl;
}());
{
    this.customComponentBoxEl = document.createElement('div');
    this.customComponentBoxEl.className = 'custom-box';
}
mount(el, HTMLElement);
{
    el.appendChild(this.customComponentBoxEl);
}
unMount(el, HTMLElement);
{
    el.removeChild(this.customComponentBoxEl);
}
createNode(componentEl, HTMLElement, title, string);
HTMLElement;
{
    var mainEl = document.createElement('div');
    mainEl.className = 'custom-box-main';
    var headEl = document.createElement('div');
    headEl.className = 'custom-box-main-header';
    var titleEl = document.createTextNode(title);
    var closeEl = document.createElement('div');
    closeEl.className = 'custom-box-main-close';
    closeEl.addEventListener('click', this.close.bind(this));
    var leftEl = document.createElement('div');
    leftEl.className = 'custom-box-main-left-close';
    var rightEl = document.createElement('div');
    rightEl.className = 'custom-box-main-right-close';
    var bodyEl = document.createElement('div');
    bodyEl.className = 'custom-box-main-body';
    var otherBoxEl = document.createElement('div');
    otherBoxEl.className = 'custom-box-main-body-other-box';
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
    this.customComponentBoxEl.innerHTML = '';
    //先让其显示,去掉类名custom
    componentEl.className = componentEl.className.replace('custom-use-box', '');
    this.customComponentBoxEl.appendChild(this.createNode(componentEl, title));
    this.customComponentBoxEl.style.display = 'flex';
    setTimeout(function () {
        _this.customComponentBoxEl.style.opacity = '1';
    });
}
close();
{
    //关闭的时候，可以执行一个函数,但是不能影响下面的业务
    setTimeout(function () {
        _this.callbackFun();
    });
    this.customComponentBoxEl.style.opacity = '0';
    setTimeout(function () {
        _this.customComponentBoxEl.style.display = 'none';
        _this.customComponentBoxEl.innerHTML = '';
    }, 600);
}
exports.default = CustomBoxControl;
