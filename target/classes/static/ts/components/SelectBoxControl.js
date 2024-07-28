"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//下拉框组件,可能会有多个使用
var SelectBoxControl = /** @class */ (function () {
    function SelectBoxControl() {
    }
    //运行
    SelectBoxControl.run = function () {
        this.selectBoxEls = document.querySelectorAll('.select-box');
        this.selectOptionBoxElMap = new Map();
        this.handleAllOption();
        this.bindClickEvent();
        this.handleCheckEvent();
        this.optionElsClickEvent();
    };
    //绑定改变事件
    SelectBoxControl.bindChangeEvent = function (el, callBackFun) {
        this.callBackFunMap.set(el, callBackFun);
    };
    //处理选中事件
    SelectBoxControl.handleCheckEvent = function () {
        var _this = this;
        this.selectOptionBoxElMap.forEach(function (v, k) {
            v.forEach(function (el) {
                var checkVl = el.getAttribute('check');
                if (checkVl === 'check') {
                    _this.checkDataToSpan(el, k);
                }
            });
        });
    };
    //信息选中赋予
    SelectBoxControl.checkDataToSpan = function (optionBoxEl, optionBoxBoxEl) {
        var spanEl = optionBoxBoxEl.previousElementSibling;
        spanEl.innerText = optionBoxEl.innerText;
    };
    //获取所有的option组件
    SelectBoxControl.handleAllOption = function () {
        var _this = this;
        this.selectBoxEls.forEach(function (el) {
            var optionBoxEl = el.querySelector(".select-option-box-box");
            _this.selectOptionBoxBoxEls.push(optionBoxEl);
            var selectOptionBoxEls = el.querySelectorAll('.select-option-box');
            _this.selectOptionBoxElMap.set(optionBoxEl, selectOptionBoxEls);
            el.style.height = _this.selectBoxHeight + 'px';
        });
        //计算高度和位置
        this.selectOptionBoxBoxEls.forEach(function (el) {
            var selectOptionEls = _this.selectOptionBoxElMap.get(el);
            var height = selectOptionEls.length * _this.selectBoxHeight;
            el.style.height = height + 'px';
            el.style.top = -height - 2 + 'px';
        });
    };
    //下拉款展开和关闭
    SelectBoxControl.bindClickEvent = function () {
        var _this = this;
        this.selectBoxEls.forEach(function (el, key) {
            el.addEventListener('click', function () {
                if (_this.switch) {
                    _this.extendEvent(_this.selectOptionBoxBoxEls[key]);
                }
                else {
                    _this.closeEvent(_this.selectOptionBoxBoxEls[key]);
                }
                _this.switch = !_this.switch;
            });
        });
    };
    //下拉框展开事件
    SelectBoxControl.extendEvent = function (optionBoxEl) {
        optionBoxEl.style.display = 'flex';
        setTimeout(function () { return optionBoxEl.style.opacity = '1'; });
    };
    //关闭，收起事件
    SelectBoxControl.closeEvent = function (optionBoxEl) {
        optionBoxEl.style.opacity = '0';
        setTimeout(function () {
            optionBoxEl.style.display = 'none';
        }, 300);
    };
    //选项点击事件
    SelectBoxControl.optionElsClickEvent = function () {
        var _this = this;
        this.selectOptionBoxElMap.forEach(function (v, k) {
            v.forEach(function (optionEl) {
                optionEl.addEventListener('click', function () {
                    setTimeout(_this.checkDataToSpan.bind(_this, optionEl, k));
                    //执行回调函数，传入值
                    _this.callBackFunMap.get(k)(optionEl.getAttribute('value'));
                });
            });
        });
    };
    SelectBoxControl.selectOptionBoxBoxEls = [];
    SelectBoxControl.selectBoxHeight = 40;
    SelectBoxControl.switch = true;
    SelectBoxControl.callBackFunMap = new Map();
    return SelectBoxControl;
}());
exports.default = SelectBoxControl;
