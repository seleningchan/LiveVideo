"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var AjaxService_js_1 = __importDefault(require("../service/AjaxService.js"));
var ApiConstant_js_1 = require("../api/ApiConstant.js");
var SseService_js_1 = __importDefault(require("../service/SseService.js"));
var StringUtil_js_1 = __importDefault(require("./StringUtil.js"));
var EventStant_js_1 = __importDefault(require("../constant/EventStant.js"));
var MessageTypeConstant_js_1 = __importDefault(require("../constant/MessageTypeConstant.js"));
var LoadingControl_js_1 = __importDefault(require("../components/LoadingControl.js"));
var MessageBoxControl_js_1 = require("../components/MessageBoxControl.js");
var VideoBoxControl_js_1 = __importDefault(require("../components/VideoBoxControl.js"));
var ChatRoomBoxBiz_js_1 = __importDefault(require("../main/ChatRoomBoxBiz.js"));
var FirstBoxBiz_js_1 = __importDefault(require("../main/FirstBoxBiz.js"));
var IDgenerateUtil_js_1 = __importDefault(require("./IDgenerateUtil.js"));
var ChatMessageControl_js_1 = __importDefault(require("../components/ChatMessageControl.js"));
var UserListControl_js_1 = __importDefault(require("../components/UserListControl.js"));
//信令交互工具类
var SignTransferUtil = /** @class */ (function () {
    function SignTransferUtil() {
    }
    //检测消息通道是否打开，是否可以发送消息
    SignTransferUtil.sendMessageStateMap = new Map();
    return SignTransferUtil;
}());
exports.default = SignTransferUtil;
{
    this.selfId = '';
    this.otherIds = new Array();
    this.offerRTCPeerConnectionMap = new Map();
    this.answerRTCPeerConnectionMap = new Map();
    this.icecandidateArr = new Array();
    this.selfRTCDataChannelMap = new Map();
    this.videoBoxMap = new Map();
}
async;
createRoom(roomName, string, maxNumber, number, stream, MediaStream);
{
    this.selfStream = stream;
    //创建房间，得到自己的id
    this.selfId = (await new AjaxService_js_1.default(ApiConstant_js_1.RoomInfoApi.createRoommUrl).send({
        roomName: roomName,
        maxNumber: maxNumber
    })).id;
    //创建房间不需要监听offer,因为他永远是发offer的哪一个
    this.listerNewMember(roomName, stream);
    this.listerNewAnswer(roomName);
    //关闭加载，隐藏第一个页面，显示聊天页
    LoadingControl_js_1.default.close();
    FirstBoxBiz_js_1.default.hide();
    //显示之前设置一下房间名
    ChatRoomBoxBiz_js_1.default.setRoomName(roomName);
    ChatRoomBoxBiz_js_1.default.show();
    //设置全员消息组件
    var chatMessage = new ChatMessageControl_js_1.default();
    chatMessage.bindSendMessageFun(IDgenerateUtil_js_1.default.generateId(this.selfId), function (message) {
        _this.sendAllMessage(message);
    });
    chatMessage.bindSelectSendFileFun(IDgenerateUtil_js_1.default.generateId(this.selfId), function (fileBaseUrl, fileName, fileStyle, isSplit, currentNum, totalNum) {
        _this.sendAllFile(fileBaseUrl, fileName, fileStyle, isSplit, currentNum, totalNum);
    });
    ChatRoomBoxBiz_js_1.default.setPublicChatMessage(chatMessage);
}
async;
enterRoom(roomName, string, stream, MediaStream);
{
    this.selfStream = stream;
    //进入房间，得到自己的id
    this.selfId = (await new AjaxService_js_1.default(ApiConstant_js_1.RoomInfoApi.enterRoomUrl).send({
        roomName: roomName
    })).id;
    //进入房间所有都监听
    this.listerNewMember(roomName, stream);
    this.listerNewOffer(roomName, stream);
    this.listerNewAnswer(roomName);
    //关闭加载，隐藏第一个页面，显示聊天页
    LoadingControl_js_1.default.close();
    FirstBoxBiz_js_1.default.hide();
    //显示之前设置一下房间名
    ChatRoomBoxBiz_js_1.default.setRoomName(roomName);
    ChatRoomBoxBiz_js_1.default.show();
    //设置全员消息组件
    var chatMessage = new ChatMessageControl_js_1.default();
    chatMessage.bindSendMessageFun(IDgenerateUtil_js_1.default.generateId(this.selfId), function (message) {
        _this.sendAllMessage(message);
    });
    chatMessage.bindSelectSendFileFun(IDgenerateUtil_js_1.default.generateId(this.selfId), function (fileBaseUrl, fileName, fileStyle, isSplit, currentNum, totalNum) {
        _this.sendAllFile(fileBaseUrl, fileName, fileStyle, isSplit, currentNum, totalNum);
    });
    ChatRoomBoxBiz_js_1.default.setPublicChatMessage(chatMessage);
}
listerNewMember(roomName, string, stream, MediaStream);
{
    new SseService_js_1.default(ApiConstant_js_1.RoomInfoExtApi.getNewMemberUrl, StringUtil_js_1.default.objToParm({
        roomName: roomName,
        id: this.selfId
    })).bindEvent(EventStant_js_1.default.NEW_MEMBER, function (data) {
        var idArr = data.ids;
        if (idArr.length !== 0) {
            //有人加入,创建rtc
            idArr.map(function (id) {
                //如果是在自己之前进来的就没必要再去和他进行连接，早来的永远主动连接后来的,由后端控制
                //除掉自己已经有的
                for (var _i = 0, _a = _this.otherIds; _i < _a.length; _i++) {
                    var v = _a[_i];
                    if (v === id) {
                        return;
                    }
                }
                _this.otherIds.push(id);
                var currentOffer;
                var offerPc = _this.createOfferConnect(stream, id, function () {
                    //回调拿到ice候选信息
                    var candidate = JSON.stringify(_this.icecandidateArr);
                    _this.icecandidateArr.splice(0, _this.icecandidateArr.length);
                    var offerStr = JSON.stringify(currentOffer);
                    //告诉服务器添加一个发送者
                    new AjaxService_js_1.default(ApiConstant_js_1.SignTransferApi.addOfferIdentityUrl).send({
                        fromId: _this.selfId,
                        toId: id,
                        roomName: roomName,
                        offer: offerStr,
                        candidate: candidate
                    });
                });
                offerPc.createOffer().then(function (offer) {
                    offerPc.setLocalDescription(offer).then(function () {
                        currentOffer = offer;
                    });
                });
                //存储RTC
                _this.offerRTCPeerConnectionMap.set(id, offerPc);
                //监听关闭
                _this.listerClose(id, offerPc);
            });
        }
    });
}
listerNewOffer(roomName, string, stream, MediaStream);
{
    new SseService_js_1.default(ApiConstant_js_1.SignTransferExtApi.getNewOfferUrl, StringUtil_js_1.default.objToParm({
        roomName: roomName,
        id: this.selfId
    })).bindEvent(EventStant_js_1.default.MEW_OFFER, function (data) {
        //获取的都是自己需要的offer
        data.forEach(function (offerIdentity) {
            var answerPc = _this.createAnswerConnect(stream, offerIdentity.fromId);
            var offer = JSON.parse(offerIdentity.offer);
            answerPc.setRemoteDescription(new RTCSessionDescription(offer)).then(function () {
                answerPc.createAnswer().then(function (answer) {
                    answerPc.setLocalDescription(answer).then(function () {
                        //把ice添加进来
                        var candidateArr = JSON.parse(offerIdentity.candidate);
                        candidateArr.forEach(function (candidate) {
                            answerPc.addIceCandidate(candidate);
                        });
                        var answerStr = JSON.stringify(answer);
                        //告诉服务器添加一个接收者
                        new AjaxService_js_1.default(ApiConstant_js_1.SignTransferApi.addAnswerIdentityUrl).send({
                            fromId: _this.selfId,
                            toId: offerIdentity.fromId,
                            roomName: roomName,
                            answer: answerStr
                        });
                    });
                });
            });
            //存储RTC
            _this.answerRTCPeerConnectionMap.set(offerIdentity.fromId, answerPc);
            //监听关闭
            _this.listerClose(offerIdentity.fromId, answerPc);
            //设置视频id
            _this.videoBoxMap.set(offerIdentity.fromId, new VideoBoxControl_js_1.default(IDgenerateUtil_js_1.default.generateId(offerIdentity.fromId)));
            //设置私有消息组件
            var chatMessage = new ChatMessageControl_js_1.default();
            chatMessage.bindSendMessageFun(IDgenerateUtil_js_1.default.generateId(_this.selfId), function (message) {
                _this.sendAppointMessage(message, offerIdentity.fromId);
            });
            chatMessage.bindSelectSendFileFun(IDgenerateUtil_js_1.default.generateId(_this.selfId), function (fileBaseUrl, fileName, fileStyle, isSplit, currentNum, totalNum) {
                _this.sendAppoinFile(fileBaseUrl, fileName, fileStyle, offerIdentity.fromId, isSplit, currentNum, totalNum);
            });
            ChatRoomBoxBiz_js_1.default.addPrivateChatMessage(IDgenerateUtil_js_1.default.generateId(offerIdentity.fromId), chatMessage);
        });
    });
}
listerNewAnswer(roomName, string);
{
    new SseService_js_1.default(ApiConstant_js_1.SignTransferExtApi.getNewAnswerUrl, StringUtil_js_1.default.objToParm({
        roomName: roomName,
        id: this.selfId
    })).bindEvent(EventStant_js_1.default.NEW_ANSWER, function (data) {
        //获取的都是自己需要的answer
        data.forEach(function (answerIdentity) {
            //根据id找到自己对应的answer
            var offerPc = _this.offerRTCPeerConnectionMap.get(answerIdentity.fromId);
            var answer = JSON.parse(answerIdentity.answer);
            offerPc === null || offerPc === void 0 ? void 0 : offerPc.setRemoteDescription(new RTCSessionDescription(answer));
            //设置视频id
            _this.videoBoxMap.set(answerIdentity.fromId, new VideoBoxControl_js_1.default(IDgenerateUtil_js_1.default.generateId(answerIdentity.fromId)));
            //设置私有消息组件
            var chatMessage = new ChatMessageControl_js_1.default();
            chatMessage.bindSendMessageFun(IDgenerateUtil_js_1.default.generateId(_this.selfId), function (message) {
                _this.sendAppointMessage(message, answerIdentity.fromId);
            });
            chatMessage.bindSelectSendFileFun(IDgenerateUtil_js_1.default.generateId(_this.selfId), function (fileBaseUrl, fileName, fileStyle, isSplit, currentNum, totalNum) {
                _this.sendAppoinFile(fileBaseUrl, fileName, fileStyle, answerIdentity.fromId, isSplit, currentNum, totalNum);
            });
            ChatRoomBoxBiz_js_1.default.addPrivateChatMessage(IDgenerateUtil_js_1.default.generateId(answerIdentity.fromId), chatMessage);
        });
    });
}
createOfferConnect(stream, MediaStream, id, string, callBack, Function = function () { });
RTCPeerConnection;
{
    var offerPc_1 = new RTCPeerConnection();
    //创建监听消息组件
    this.offerReceiveMessage(id, offerPc_1);
    offerPc_1.ontrack = function (obj) { return _this.listerTrack(obj, id); };
    stream.getTracks().forEach(function (track) {
        offerPc_1.addTrack(track, stream);
    });
    offerPc_1.onicecandidate = function (event) { return _this.listerIceCandidate(event, callBack); };
    return offerPc_1;
}
createAnswerConnect(stream, MediaStream, id, string);
{
    var answerPc_1 = new RTCPeerConnection();
    //创建监听消息组件
    this.answerReceiveMessage(id, answerPc_1);
    answerPc_1.ontrack = function (obj) { return _this.listerTrack(obj, id); };
    stream.getTracks().forEach(function (track) {
        answerPc_1.addTrack(track, stream);
    });
    //不需要候选信息
    return answerPc_1;
}
listerTrack(event, RTCTrackEvent, id, string);
{
    //设置流,并添加组件
    var videoBox = this.videoBoxMap.get(id);
    videoBox.createVideo(event.streams[0]);
    //可能会多次执行，但是对于相同的节点，并不会追加
    ChatRoomBoxBiz_js_1.default.addVideoBox(videoBox);
}
listerIceCandidate(event, RTCPeerConnectionIceEvent, callBack, Function);
{
    if (event.candidate) {
        this.icecandidateArr.push(event.candidate);
    }
    else {
        //利用回调解决ice存储使用问题
        callBack();
    }
}
listerClose(key, string, pc, RTCPeerConnection);
{
    pc.oniceconnectionstatechange = function () {
        if (pc.iceConnectionState === 'disconnected' || pc.iceConnectionState === 'closed') {
            // 连接已关闭
            _this.offerRTCPeerConnectionMap.delete(key);
            _this.answerRTCPeerConnectionMap.delete(key);
            _this.selfRTCDataChannelMap.delete(key);
            //防止不是正常退出的
            new AjaxService_js_1.default(ApiConstant_js_1.RoomInfoApi.outRoomUrl).send({
                id: key
            });
            //移除
            var videoBox = _this.videoBoxMap.get(key);
            ChatRoomBoxBiz_js_1.default.delVideoBox(videoBox);
            //聊天列表也要移除
            ChatRoomBoxBiz_js_1.default.delPrivateMessage(IDgenerateUtil_js_1.default.generateId(key));
        }
    };
}
close();
{
    this.selfRTCDataChannelMap.forEach(function (dc) {
        dc.close();
    });
    this.offerRTCPeerConnectionMap.forEach(function (pc) {
        pc.close();
    });
    this.answerRTCPeerConnectionMap.forEach(function (pc) {
        pc.close();
    });
    this.selfStream.getTracks().forEach(function (track) {
        track.stop();
    });
    //房间去除本人
    new AjaxService_js_1.default(ApiConstant_js_1.RoomInfoApi.outRoomUrl).send({
        id: this.selfId
    });
    //刷新网页
    window.location.reload();
}
sendAppointMessage(message, string, key, string);
{
    if (!this.sendMessageStateMap.get(key)) {
        MessageBoxControl_js_1.MessageBoxControl.open("消息通道未打开或则发生错误已关闭！");
        return;
    }
    var dc = this.selfRTCDataChannelMap.get(key);
    dc === null || dc === void 0 ? void 0 : dc.send(JSON.stringify({
        sfid: IDgenerateUtil_js_1.default.generateId(this.selfId),
        message: message,
        state: MessageTypeConstant_js_1.default.privateState,
        style: MessageTypeConstant_js_1.default.messageStyle
    }));
}
sendAppoinFile(fileBaseUrl, string, fileName, string, fileStyle, string, key, string, isSplit, boolean, currentNum, number, totalNum, number);
{
    if (!this.sendMessageStateMap.get(key)) {
        MessageBoxControl_js_1.MessageBoxControl.open("消息通道未打开或则发生错误已关闭！");
        return;
    }
    var dc = this.selfRTCDataChannelMap.get(key);
    dc === null || dc === void 0 ? void 0 : dc.send(JSON.stringify({
        sfid: IDgenerateUtil_js_1.default.generateId(this.selfId),
        fileName: fileName,
        fileBaseUrl: fileBaseUrl,
        fileStyle: fileStyle,
        state: MessageTypeConstant_js_1.default.privateState,
        style: MessageTypeConstant_js_1.default.fileStyle,
        isSplit: isSplit,
        currentNum: currentNum,
        totalNum: totalNum
    }));
}
sendAllMessage(message, string);
{
    //是否有人
    var isAnyone_1 = false;
    this.selfRTCDataChannelMap.forEach(function (dc, key) {
        if (!_this.sendMessageStateMap.get(key)) {
            return;
        }
        isAnyone_1 = true;
        dc.send(JSON.stringify({
            sfid: IDgenerateUtil_js_1.default.generateId(_this.selfId),
            message: message,
            state: MessageTypeConstant_js_1.default.publicState,
            style: MessageTypeConstant_js_1.default.messageStyle
        }));
    });
    if (!isAnyone_1) {
        MessageBoxControl_js_1.MessageBoxControl.open("无人进入或则进入的人信息通道还未打开或则通道发生错误已关闭！");
    }
}
sendAllFile(fileBaseUrl, string, fileName, string, fileStyle, string, isSplit, boolean, currentNum, number, totalNum, number);
{
    //是否有人
    var isAnyone_2 = false;
    this.selfRTCDataChannelMap.forEach(function (dc, key) {
        if (!_this.sendMessageStateMap.get(key)) {
            return;
        }
        isAnyone_2 = true;
        dc.bufferedAmountLowThreshold = 102400;
        dc.send(JSON.stringify({
            sfid: IDgenerateUtil_js_1.default.generateId(_this.selfId),
            fileName: fileName,
            fileBaseUrl: fileBaseUrl,
            fileStyle: fileStyle,
            state: MessageTypeConstant_js_1.default.publicState,
            style: MessageTypeConstant_js_1.default.fileStyle,
            isSplit: isSplit,
            currentNum: currentNum,
            totalNum: totalNum
        }));
    });
    if (!isAnyone_2) {
        MessageBoxControl_js_1.MessageBoxControl.open("无人进入或则进入的人信息通道还未打开或则通道发生错误已关闭！");
    }
}
offerReceiveMessage(key, string, pc, RTCPeerConnection);
{
    this.sendMessageStateMap.set(key, false);
    this.handleChannel(key, pc.createDataChannel('xiaomaomi-xj'));
}
answerReceiveMessage(key, string, pc, RTCPeerConnection);
{
    this.sendMessageStateMap.set(key, false);
    pc.ondatachannel = function (event) {
        _this.handleChannel(key, event.channel);
    };
}
handleChannel(key, string, dc, RTCDataChannel);
{
    this.selfRTCDataChannelMap.set(key, dc);
    dc.onmessage = function (event) {
        var messageInfo = JSON.parse(event.data);
        //全员的
        if (messageInfo.state === MessageTypeConstant_js_1.default.publicState) {
            ChatRoomBoxBiz_js_1.default.showPublicDot();
            var chatMessage = ChatRoomBoxBiz_js_1.default.getPublicChatMessage();
            if (messageInfo.style === MessageTypeConstant_js_1.default.messageStyle) {
                //文字信息
                chatMessage.receiveMessage(messageInfo.sfid, messageInfo.message);
            }
            else {
                //接受文件
                chatMessage.receiveFile(messageInfo.sfid, messageInfo.fileName, messageInfo.fileBaseUrl, messageInfo.fileStyle, messageInfo.isSplit, messageInfo.currentNum, messageInfo.totalNum);
            }
        }
        else {
            //私有的,来消息显示红点
            ChatRoomBoxBiz_js_1.default.showPrivateDot();
            UserListControl_js_1.default.showUserDot(messageInfo.sfid);
            var chatMessage = ChatRoomBoxBiz_js_1.default.getPrivateChatMessage(messageInfo.sfid);
            if (messageInfo.style === MessageTypeConstant_js_1.default.messageStyle) {
                //文字信息
                chatMessage.receiveMessage(messageInfo.sfid, messageInfo.message);
            }
            else {
                //接受文件
                chatMessage.receiveFile(messageInfo.sfid, messageInfo.fileName, messageInfo.fileBaseUrl, messageInfo.fileStyle, messageInfo.isSplit, messageInfo.currentNum, messageInfo.totalNum);
            }
        }
    };
    dc.onopen = function () {
        //进行记载，只有通道打开的才能发送消息
        _this.sendMessageStateMap.set(key, true);
    };
    //监听关闭去除
    dc.onclose = function () {
        _this.selfRTCDataChannelMap.delete(key);
    };
    dc.onerror = function (event) {
        _this.selfRTCDataChannelMap.delete(key);
        if (event.error.message.toLowerCase().indexOf('close') !== -1) {
            //关闭通道，不算报错
            return;
        }
        MessageBoxControl_js_1.MessageBoxControl.open("发生错误，错误信息：" + event.error.message + "，信息通道已关闭!", function () { return window.location.reload(); });
    };
}
