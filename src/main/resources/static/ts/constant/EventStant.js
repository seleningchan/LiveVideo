"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//事件类型名称
var EventStant = /** @class */ (function () {
    function EventStant() {
    }
    //获取新的成员
    EventStant.NEW_MEMBER = 'new_member';
    //获取新的offer
    EventStant.MEW_OFFER = 'new_offer';
    //获取新的answer
    EventStant.NEW_ANSWER = 'new_answer';
    //异常处理
    EventStant.HANDLE_EXCEPTION = 'handle_exception';
    return EventStant;
}());
exports.default = EventStant;
