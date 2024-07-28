"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmTipsBoxControl = void 0;
//用于确认提示的弹窗
var ConfirmTipsBoxControl = /** @class */ (function () {
    function ConfirmTipsBoxControl() {
    }
    return ConfirmTipsBoxControl;
}());
exports.ConfirmTipsBoxControl = ConfirmTipsBoxControl;
{
    this.confirmTipsBoxEl = document.createElement('div');
    this.confirmTipsBoxEl.className = 'confirm-tips-box';
}
mount(el, HTMLElement);
{
    el.appendChild(this.confirmTipsBoxEl);
}
unMount(el, HTMLElement);
{
    el.removeChild(this.confirmTipsBoxEl);
}
createNode(message, string, callbackFun, Function);
HTMLElement;
{
    var mainEl = document.createElement('div');
    mainEl.className = 'confirm-tips-box-main';
    var headerEl = document.createElement('div');
    headerEl.className = 'confirm-tips-box-header';
    var tipsEl = document.createTextNode("特别提示");
    headerEl.appendChild(tipsEl);
    mainEl.appendChild(headerEl);
    var bodyEl = document.createElement('div');
    bodyEl.className = 'confirm-tips-box-body';
    bodyEl.innerHTML = message;
    mainEl.appendChild(bodyEl);
    var footerEl = document.createElement('div');
    footerEl.className = 'confirm-tips-box-footer';
    var cancellBthEl = document.createElement('div');
    cancellBthEl.className = 'confirm-tips-box-calcel';
    cancellBthEl.innerText = '取消';
    cancellBthEl.addEventListener('click', this.close.bind(this));
    var determineBthEl = document.createElement('div');
    determineBthEl.className = 'confirm-tips-box-determine';
    determineBthEl.innerText = '确定';
    determineBthEl.addEventListener('click', function () {
        try {
            callbackFun();
        }
        finally {
            //无论怎样要关闭
            _this.close();
        }
    });
    footerEl.appendChild(cancellBthEl);
    footerEl.appendChild(determineBthEl);
    mainEl.appendChild(footerEl);
    return mainEl;
}
open(message, string, callbackFun, Function);
{
    //先清空
    this.confirmTipsBoxEl.innerHTML = '';
    this.confirmTipsBoxEl.appendChild(this.createNode(message, callbackFun));
    this.confirmTipsBoxEl.style.display = 'flex';
    setTimeout(function () {
        _this.confirmTipsBoxEl.style.opacity = '1';
    });
}
close();
{
    this.confirmTipsBoxEl.style.opacity = '0';
    setTimeout(function () {
        _this.confirmTipsBoxEl.style.display = 'none';
        _this.confirmTipsBoxEl.innerHTML = '';
    }, 600);
}
