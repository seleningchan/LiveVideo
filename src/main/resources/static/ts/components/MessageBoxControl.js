"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageBoxControl = void 0;
//message-box组件，用于提示消息
var MessageBoxControl = /** @class */ (function () {
    function MessageBoxControl() {
    }
    return MessageBoxControl;
}());
exports.MessageBoxControl = MessageBoxControl;
{
    this.messageBoxEl = document.createElement('div');
    this.messageBoxEl.className = 'message-box';
}
mount(el, HTMLElement);
{
    el.appendChild(this.messageBoxEl);
}
unMount(el, HTMLElement);
{
    el.removeChild(this.messageBoxEl);
}
createNode(message, string, callbackFun, Function);
HTMLElement;
{
    var mainEl = document.createElement('div');
    mainEl.className = 'message-box-main';
    var headerEl = document.createElement('div');
    headerEl.className = 'message-box-header';
    var tipsEl = document.createTextNode("提示");
    headerEl.appendChild(tipsEl);
    mainEl.appendChild(headerEl);
    var bodyEl = document.createElement('div');
    bodyEl.className = 'message-box-body';
    bodyEl.innerText = message;
    mainEl.appendChild(bodyEl);
    var footerEl = document.createElement('div');
    footerEl.className = 'message-box-footer';
    var buttonEl = document.createElement('div');
    buttonEl.className = 'message-box-button';
    buttonEl.innerText = '确定';
    buttonEl.addEventListener('click', function () {
        try {
            callbackFun();
        }
        finally {
            //无论怎样要关闭
            _this.close();
        }
    });
    footerEl.appendChild(buttonEl);
    mainEl.appendChild(footerEl);
    return mainEl;
}
open(message, string, callbackFun, Function = function () { });
{
    //先清空
    this.messageBoxEl.innerHTML = '';
    this.messageBoxEl.appendChild(this.createNode(message, callbackFun));
    this.messageBoxEl.style.display = 'flex';
    setTimeout(function () {
        _this.messageBoxEl.style.opacity = '1';
    });
}
close();
{
    this.messageBoxEl.style.opacity = '0';
    setTimeout(function () {
        _this.messageBoxEl.style.display = 'none';
        _this.messageBoxEl.innerHTML = '';
    }, 600);
}
