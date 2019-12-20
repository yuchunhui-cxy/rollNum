;(function($, window, document) {
    "use strict";
    var defaults = {
        deVal: 0,
        className: 'dataNums',
        digit: '',
    };
    //新加的
    var oldValue = {
        value:0
    }
    //新加的

    function rollNum(obj, options) {
        this.obj = obj;
        this.options = $.extend(defaults, options);
        this.init = function() {
            //新加的
            let val = oldValue.value
            Object.defineProperty(oldValue,"value",{
                get(){
                    return val
                },
                set(newValue){
                    if(newValue != val){
                        val = newValue
                        var strHtml = '<ul class="' + options.className + ' inrow">'; //div下面的ul
                        for(var i = 0; i < newValue; i++) {
                            strHtml += '<li class="dataOne "><div class="dataBoc"><div class="tt" t="38"><span class="num0">0</span> <span class="num1">1</span> <span class="num2">2</span> <span class="num3">3</span> <span class="num4">4</span><span class="num5">5</span> <span class="num6">6</span> <span class="num7">7</span> <span class="num8">8</span> <span class="num9">9</span><span class="num0">0</span> <span class="num1">1</span> <span class="num2">2</span> <span class="num3">3</span> <span class="num4">4</span><span class="num5">5</span> <span class="num6">6</span> <span class="num7">7</span> <span class="num8">8</span> <span class="num9">9</span><span class="num10">.</span></div></div></li>';
                        }
                        strHtml += '</ul>';
                        obj.html(strHtml);
                    }
                }
            })
            //新加的
            this.initHtml(obj, defaults);
        }
    }

    rollNum.prototype = {
        initHtml: function(obj, options) {
            var strHtml = '<ul class="' + options.className + ' inrow">'; //div下面的ul
            var valLen = options.digit || (options.deVal + '').length; //值的长度
            var valArr = options.deVal + ''.split(); //值
            //新加的
            oldValue.value = valLen
            //新加的
            if(obj.find('.' + options.className).length <= 0) {
                for(var i = 0; i < valLen; i++) {
                    strHtml += '<li class="dataOne "><div class="dataBoc"><div class="tt" t="38"><span class="num0">0</span> <span class="num1">1</span> <span class="num2">2</span> <span class="num3">3</span> <span class="num4">4</span><span class="num5">5</span> <span class="num6">6</span> <span class="num7">7</span> <span class="num8">8</span> <span class="num9">9</span><span class="num0">0</span> <span class="num1">1</span> <span class="num2">2</span> <span class="num3">3</span> <span class="num4">4</span><span class="num5">5</span> <span class="num6">6</span> <span class="num7">7</span> <span class="num8">8</span> <span class="num9">9</span><span class="num10">.</span></div></div></li>';
                }
                strHtml += '</ul>';
                obj.html(strHtml);
            }
            this.scroNum(obj, options);
        },
        scroNum: function(obj, options) {
            var number = options.deVal; //值
            var $num_item = $(obj).find('.' + options.className).find('.tt'); //包裹span上面的div数组
            var h = $(obj).find('.dataBoc').height();//每一格的高度
            $num_item.css('transition', 'all 1s ease-in-out');
            var numberStr = number.toString();
            if(numberStr.length <= $num_item.length - 1) {
                var tempStr = '';
                for(var a = 0; a < $num_item.length - numberStr.length; a++) {
                    tempStr += '0';
                }
                numberStr = tempStr + numberStr;
            }
            var numberArr = numberStr.split('');
            var oRem = document.body.clientWidth || document.documentElement.clientWidth;
            oRem = oRem/750*100 * 0.29;
            var jqH = $num_item.find('span').eq(0).height();
            $num_item.each(function(i, item) {
                    setTimeout(function() {
                        if(numberArr[i] == "."){
                            $num_item.eq(i).css('top',-10*h - h*10 + 'px');
                        }else{
                            $num_item.eq(i).css('top',-parseInt(numberArr[i])*h - h*10 + 'px');
                        }
                    }, i * 0)
            });
        }
    }
    $.fn.rollNum = function(options) {
        var $that = this;
        var rollNumObj = new rollNum($that, options);
        rollNumObj.init();
    };})(jQuery, window, document);