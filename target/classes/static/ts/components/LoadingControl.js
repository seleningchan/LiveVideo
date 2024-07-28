"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
//加载提示组件
var LoadingControl = /** @class */ (function () {
    function LoadingControl() {
    }
    LoadingControl.loadingHtml = "\n        <div class=\"loading-box\">\n            <div class=\"loading-box-item\"></div>\n            <div class=\"loading-box-item\"></div>\n            <div class=\"loading-box-item\"></div>\n            <div class=\"loading-box-item\"></div>\n            <div class=\"loading-box-item\"></div>\n            <div class=\"loading-box-item\"></div>\n            <div class=\"loading-box-item\"></div>\n            <div class=\"loading-box-item\"></div>\n            <div class=\"loading-box-item\"></div>\n            <div class=\"loading-box-item\"></div>\n            <div class=\"loading-box-item\"></div>\n            <div class=\"loading-box-item\"></div>\n            <div class=\"loading-box-item\"></div>\n        </div>\n    ";
    return LoadingControl;
}());
{
    //创造组件
    this.loadingEl = document.createElement('div');
    this.loadingEl.className = 'loading';
    this.loadingEl.innerHTML = this.loadingHtml;
}
mount(el, HTMLElement);
{
    el.append(this.loadingEl);
}
unMount(el, HTMLElement);
{
    el.removeChild(this.loadingEl);
}
open();
{
    this.loadingEl.style.display = "flex";
    setTimeout(function () {
        _this.loadingEl.style.opacity = '1';
    });
}
close();
{
    this.loadingEl.style.opacity = '0';
    setTimeout(function () {
        _this.loadingEl.style.display = "none";
    }, 1000);
}
exports.default = LoadingControl;
