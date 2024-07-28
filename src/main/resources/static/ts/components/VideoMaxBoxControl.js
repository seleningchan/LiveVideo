"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoMaxBoxControl = void 0;
//video-max-box组件，用于放大显示
var VideoMaxBoxControl = /** @class */ (function () {
    function VideoMaxBoxControl() {
    }
    return VideoMaxBoxControl;
}());
exports.VideoMaxBoxControl = VideoMaxBoxControl;
{
    this.videoMaxBoxEl = document.createElement('div');
    this.videoMaxBoxEl.className = 'video-max-box';
}
mount(el, HTMLElement);
{
    el.appendChild(this.videoMaxBoxEl);
}
unMount(el, HTMLElement);
{
    el.removeChild(this.videoMaxBoxEl);
}
createNode(canvasOrVideoEl, HTMLCanvasElement | HTMLVideoElement, videoBoxEl, HTMLDivElement, hideCanvas, HTMLCanvasElement | null);
HTMLElement;
{
    var mainEl = document.createElement('div');
    mainEl.className = 'video-max-box-main';
    var headerEl = document.createElement('div');
    headerEl.className = 'video-max-box-header';
    var closeEl = document.createElement('div');
    closeEl.className = 'video-max-box-close';
    closeEl.addEventListener('click', this.close.bind(this, canvasOrVideoEl, videoBoxEl, hideCanvas));
    var leftEl = document.createElement('div');
    leftEl.className = 'video-max-box-left';
    var rightEl = document.createElement('div');
    rightEl.className = 'video-max-box-right';
    closeEl.appendChild(leftEl);
    closeEl.appendChild(rightEl);
    headerEl.appendChild(closeEl);
    mainEl.appendChild(headerEl);
    var bodyEl = document.createElement('div');
    bodyEl.className = 'video-max-box-body';
    //放大一倍
    if (hideCanvas != null) {
        hideCanvas.width *= 2;
        hideCanvas.height *= 2;
    }
    canvasOrVideoEl.width *= 2;
    canvasOrVideoEl.height *= 2;
    bodyEl.appendChild(canvasOrVideoEl);
    mainEl.appendChild(bodyEl);
    var footerEl = document.createElement('div');
    footerEl.className = 'video-max-box-footer';
    mainEl.appendChild(footerEl);
    return mainEl;
}
open(canvasOrVideoEl, HTMLCanvasElement | HTMLVideoElement, videoBoxEl, HTMLDivElement, hideCanvas, HTMLCanvasElement | null);
{
    //先清空
    this.videoMaxBoxEl.innerHTML = '';
    this.videoMaxBoxEl.appendChild(this.createNode(canvasOrVideoEl, videoBoxEl, hideCanvas));
    this.videoMaxBoxEl.style.display = 'flex';
    setTimeout(function () {
        _this.videoMaxBoxEl.style.opacity = '1';
    });
}
close(canvasOrVideoEl, HTMLCanvasElement | HTMLVideoElement, videoBoxEl, HTMLDivElement, hideCanvas, HTMLCanvasElement | null);
{
    this.videoMaxBoxEl.style.opacity = '0';
    setTimeout(function () {
        if (null != hideCanvas) {
            hideCanvas.width /= 2;
            hideCanvas.height /= 2;
        }
        //把组件再还回去，不用来回创造了,把宽高调一下
        canvasOrVideoEl.width /= 2;
        canvasOrVideoEl.height /= 2;
        videoBoxEl.appendChild(canvasOrVideoEl);
    }, 400);
    setTimeout(function () {
        _this.videoMaxBoxEl.style.display = 'none';
        _this.videoMaxBoxEl.innerHTML = '';
    }, 600);
}
