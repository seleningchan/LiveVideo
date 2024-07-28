"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageTypeConstant = /** @class */ (function () {
    function MessageTypeConstant() {
    }
    //全员还是私发
    MessageTypeConstant.publicState = 'public';
    MessageTypeConstant.privateState = 'private';
    //普通消息还是文件
    MessageTypeConstant.messageStyle = 'message';
    MessageTypeConstant.fileStyle = 'file';
    return MessageTypeConstant;
}());
exports.default = MessageTypeConstant;
