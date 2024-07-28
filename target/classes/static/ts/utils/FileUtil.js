"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LoadingControl_js_1 = __importDefault(require("../components/LoadingControl.js"));
var StringUtil_js_1 = __importDefault(require("./StringUtil.js"));
var FileUtil = /** @class */ (function () {
    function FileUtil() {
    }
    //获取后缀名
    FileUtil.getFileSuffixName = function (fileName) {
        var suffixName = '';
        if (StringUtil_js_1.default.chkObjNull(fileName)) {
            return suffixName;
        }
        if (fileName.indexOf(".") !== -1) {
            var strArr = fileName.split(".");
            return strArr[strArr.length - 1];
        }
        return suffixName;
    };
    //文件转base64编码信息,读文件是需要时间的，利用回调函数
    FileUtil.fileToBaseInfo = function (file, callBackFun) {
        var reader = new FileReader();
        reader.onload = function (event) {
            var _a;
            var baseInfo = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
            var fileStyle = baseInfo.substring('data:'.length, baseInfo.indexOf(';base64,'));
            callBackFun(fileStyle, baseInfo);
        };
        reader.readAsDataURL(file);
    };
    //下载文件
    FileUtil.downloadFile = function (url, fileName) {
        var a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () { return document.body.removeChild(a); });
    };
    //对文件拆分也就是对base64字符串进行拆分,相当于分片传输
    FileUtil.splitBaseUrl = function (baseUrl, callBackFun, endCallBackFun) {
        var ratio = Math.ceil(baseUrl.length / this.sendMaxSize);
        for (var i = 0; i < ratio; i++) {
            //传三个参数，分片后的内容，当前第几片，总共几片
            callBackFun(baseUrl.substring(i * this.sendMaxSize, (i + 1) * this.sendMaxSize), i + 1, ratio);
        }
        //回调完再显示
        endCallBackFun();
        //关闭loading
        LoadingControl_js_1.default.close();
    };
    //对拆分的文件进行合并处理
    FileUtil.mergeBaseUrl = function (sfId, str, index, sum, callBackFun) {
        var strArr = this.mergeBaseUrlMap.get(sfId);
        if (StringUtil_js_1.default.chkObjNull(strArr)) {
            //第一次需要创建对象
            var arr = new Array();
            arr[index - 1] = str;
            this.mergeBaseUrlMap.set(sfId, arr);
        }
        else {
            strArr[index - 1] = str;
        }
        //每进来一次就检查一次
        this.chkMergeBaseUrl(sfId, sum, callBackFun);
    };
    //检查是否可以合并
    FileUtil.chkMergeBaseUrl = function (sfId, sum, callBackFun) {
        var strArr = this.mergeBaseUrlMap.get(sfId);
        if (strArr.length === sum) {
            var isMerge_1 = true;
            strArr.forEach(function (v) {
                if (v === undefined) {
                    isMerge_1 = false;
                }
            });
            if (isMerge_1) {
                //合并删除节省空间
                callBackFun(strArr.join(""));
                this.mergeBaseUrlMap.delete(sfId);
            }
        }
    };
    //设置发送最大文件大小(10mb),因为没有服务器的存储，文件大小相当于在某个时间直接存在内存中，所以要限制文件的大小
    FileUtil.fileMaxSize = 10485760;
    //每次最大发送大小(5kb)（如果发送太大会导致直接发送失败，从而导致信息通道关闭），所以以此值为标准进行分片传输
    FileUtil.sendMaxSize = 5120;
    //最大消息长度(1000个字符)（1000长度汉字接近5kb）
    FileUtil.maxMessageLenght = 1000;
    //消息过长后缀
    FileUtil.overMaxMessageSuffix = '--：消息过长，无法全部显示，你可以尝试以文件的方式进行发送！';
    //对合并的文件进行保存
    FileUtil.mergeBaseUrlMap = new Map();
    return FileUtil;
}());
exports.default = FileUtil;
