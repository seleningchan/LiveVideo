"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//canvas人脸的样式
var CanvasStyle = /** @class */ (function () {
    function CanvasStyle() {
    }
    return CanvasStyle;
}());
exports.default = CanvasStyle;
{
    this.styleMap = new Map();
    this.styleMap.set("original", "原");
    this.styleMap.set("grayscale", "黑白");
    this.styleMap.set("sepia", "复古");
    this.styleMap.set("invert", "反差");
    this.styleMap.set("applyBeautyEffect", "简单美颜");
    this.styleMap.set("characterize", "字符化");
}
getStyleMap();
Map < string, string > {
    return: this.styleMap
};
