"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomInfoExtApi = exports.RoomInfoApi = exports.SignTransferExtApi = exports.SignTransferApi = exports.BaseUrl = void 0;
//主地址
var BaseUrl = /** @class */ (function () {
    function BaseUrl() {
    }
    BaseUrl.url = 'http://localhost:9000';
    return BaseUrl;
}());
exports.BaseUrl = BaseUrl;
//房间信息接口
var RoomInfoApi = /** @class */ (function () {
    function RoomInfoApi() {
    }
    RoomInfoApi.baseUrl = '/room-info/';
    RoomInfoApi.createRoommUrl = this.baseUrl + 'create-room';
    RoomInfoApi.enterRoomUrl = this.baseUrl + 'enter-room';
    RoomInfoApi.outRoomUrl = this.baseUrl + 'out-room';
    return RoomInfoApi;
}());
exports.RoomInfoApi = RoomInfoApi;
//信令交互接口
var SignTransferApi = /** @class */ (function () {
    function SignTransferApi() {
    }
    SignTransferApi.baseUrl = '/sign-transfer/';
    SignTransferApi.addOfferIdentityUrl = this.baseUrl + 'add-offer-identity';
    SignTransferApi.addAnswerIdentityUrl = this.baseUrl + 'add-answer-identity';
    return SignTransferApi;
}());
exports.SignTransferApi = SignTransferApi;
//信令交互扩展接口
var SignTransferExtApi = /** @class */ (function () {
    function SignTransferExtApi() {
    }
    SignTransferExtApi.baseUrl = '/sign-transfer-ext/';
    SignTransferExtApi.getNewOfferUrl = this.baseUrl + 'get-new-offer';
    SignTransferExtApi.getNewAnswerUrl = this.baseUrl + 'get-new-answer';
    return SignTransferExtApi;
}());
exports.SignTransferExtApi = SignTransferExtApi;
//房间扩展接口
var RoomInfoExtApi = /** @class */ (function () {
    function RoomInfoExtApi() {
    }
    RoomInfoExtApi.baseUrl = '/room-info-ext/';
    RoomInfoExtApi.getNewMemberUrl = this.baseUrl + 'get-new-member';
    return RoomInfoExtApi;
}());
exports.RoomInfoExtApi = RoomInfoExtApi;
