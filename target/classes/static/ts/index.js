"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var MainBiz_js_1 = __importDefault(require("./main/MainBiz.js"));
window.onload = function () {
    //开始运行
    MainBiz_js_1.default.run();
    //此处可用作调试
    //...
};
