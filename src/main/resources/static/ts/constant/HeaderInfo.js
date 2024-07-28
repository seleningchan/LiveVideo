"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//请求数据类型
var HeaderInfo = /** @class */ (function () {
    function HeaderInfo() {
    }
    //key
    HeaderInfo.KEY = 'Content-Type';
    //json，只需要判断json其他的无需关心
    HeaderInfo.JSON_VALUE = 'application/json';
    return HeaderInfo;
}());
exports.default = HeaderInfo;
