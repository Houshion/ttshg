/**
 * Created by Administrator on 2017/5/24.
 */
function showMask(){
    $('.mask').remove();
    $('body').append('<div class="mask" style="position: fixed;cursor:pointer;height: 100%;width: 100%;top:0;background:rgba(0,0,0,0.6);z-index: 1;"></div>');
}
function hideMask(){
    $('.mask').remove();
}
//数据为空提示
function emptyTip(tip){
    return '<div class="h20"></div><div class="empty"><div class="logo"><img src="../img/empty_page_nothing.png"></div><div class="msg" style="color: #999;">'+tip+'</div></div>';
}
//判断身份证格式是否正确
function checkIdCode(value){
    var value = $.trim(value);
    var userCardreg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    var taiwanreg=/^[A-Z][0-9]{9}$/;   //台湾
    var xianggangreg=/^[A-Z][0-9]{6}\([0-9A]\)$/; //香港
    var aomenreg=/^[157][0-9]{6}\([0-9]\)$/;   //澳门
    //return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value);
    return (userCardreg.test(value)||taiwanreg.test(value)||xianggangreg.test(value)||aomenreg.test(value));
}

//判断是否为空
function isNull(value){
    if($.trim(value).length){
        return false;
    }else{
        return true;
    }
}
//判断手机或者电话号码格式
function checkMobileAndTel(value){
    return /^1(3|4|5|7|8)\d{9}$/.test(value);
};
//多张图片上传，配合表单使用
function upLoadImg(file,picbox,size){
    var size = size?size:1;
    if($('.shade').length == 0){
        $('body').append($('<div class="shade" onclick="javascript:closeShade()" style="position: absolute;width: 100%;height: 100%;top: 0;left: 0;background: rgba(0, 0, 0, 0.2);z-index: 1000;display: none;"><div class="" style="width: 300px;height: 200px;line-height: 200px;position: absolute;top: 50%;left: 50%;margin-top: -100px;margin-left: -150px;background: white;border-radius: 5px;text-align: center;"><span class="text_span"></span></div></div>'));
    }
    if($('.shadeImg').length == 0) {
        $('body').append($('<div class="shadeImg" onclick="javascript:closeShadeImg()" style="position: absolute;display: none;width: 100%;height: 100%;top: 0;left: 0;z-index: 15;text-align: center;background: rgba(0, 0, 0, 0.2);"><div><img class="showImg" src="" style="width: 100%;margin-top: 140px;"></div></div>'));
    }
    var objUrl;
    var img_html;
    var template = $(file).parent().html();
    var picbox = document.getElementById(picbox);
    var filepath = $(file).val();
    if($(picbox).children('label').length > size){
        $(".shade").fadeIn(500);
        $(".text_span").text("最多可以上传"+size + '张图片');
        $(picbox).find('label:last input').attr('name','');
        return false;
    }else{
        $(picbox).find('label:last input').attr('name',"backpics[]");
    };
    for(var i = 0; i < file.files.length; i++) {
        objUrl = getObjectURL(file.files[i]);
        var extStart = filepath.lastIndexOf(".");
        var ext = filepath.substring(extStart, filepath.length).toUpperCase();
        if(ext != ".BMP" && ext != ".PNG" && ext != ".GIF" && ext != ".JPG" && ext != ".JPEG") {
            $(".shade").fadeIn(500);
            $(".text_span").text("图片限于bmp,png,gif,jpeg,jpg格式");
            return false;
        } else {
            img_html = "<div class='isImg' style='height: 100%'><img src='" + objUrl + "' onclick='javascript:lookBigImg(this)' style='height: 100%; width: 100%;' /><button class='removeBtn' onclick='javascript:removeImg(this)' style='position:absolute;right: 0;top: 0;background: rgba(0,0,0,0.2);color: #fff;border-radius: 50%;width: 0.3rem;height: 0.3rem;font-size: 0.1rem;display: flex;align-items: center;justify-content: center;'>x</button></div>";
            $(file).parent().append(img_html);
            var obj = $('<label class="a-upload fl" style="position: relative">'+template+'</label>');
            $(picbox).append(obj);
        }
    }
    return true;
}
function getObjectURL(file) {
    var url = null;
    if(window.createObjectURL != undefined) {
        url = window.createObjectURL(file);
    } else if(window.URL != undefined) {
        url = window.URL.createObjectURL(file);
    } else if(window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}
function removeImg(r){
    $(r).parents('label').remove();
    event.stopPropagation();
    event.preventDefault();
    return false;
}
function lookBigImg(b){
    $(".shadeImg").fadeIn(500);
    $(".showImg").attr("src",$(b).attr("src"));
    event.stopPropagation();
    event.preventDefault();
    return false;
}
function closeShade(){
    $(".shade").fadeOut(500);
}
function closeShadeImg(){
    $(".shadeImg").fadeOut(500);
};
/*图片上传end*/
/*日期格式化*/
function formatDate(now,ff) {
    var year=now.getFullYear();
    var month=now.getMonth()+1<10?'0'+(now.getMonth()+1):now.getMonth()+1;
    var date=now.getDate()<10?'0'+now.getDate():now.getDate();
    var hour=now.getHours()<10?'0'+now.getHours():now.getHours();
    var minute=now.getMinutes()<10?'0'+now.getMinutes():now.getMinutes();
    var second=now.getSeconds()<10?'0'+now.getSeconds():now.getSeconds();
    if(ff=='Y-m-d'){
        return year+"-"+month+"-"+date;
    }else if(ff=='Y-m-d H:i:s'){
        return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
    }else if(ff=='H:i:s'){
        return hour+':'+minute+':'+second;
    }
}
function format(time,ff){
    if(time.length==10)time=time*1000;
    var d=new Date(time);
    return formatDate(d,ff);
}
//加载中
function loadingShow(){
    $('.loading').remove();
    var str = '<div class="loading"><div class="spinner5"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div><div class="bounce4"></div></div><div class="loadingTip" style="margin-top: 0.2rem;">加载中...</div></div>';
    $('body').append(str);
}
//关掉加载
function loadingHide(){
    $('.loading').remove();
}
/**
 * 获取url参数
 */
function getUrlParam(name, explode, url){
    var param = window.location.search.substr(1);
    if(url){
        if(explode){
            param = url.substr(url.indexOf(explode) + 1);
        }else{
            param = url.substr(url.indexOf('?') + 1);
        }
    }else{
        if(explode){
            param = window.location.href.substr(window.location.href.indexOf(explode) + 1);
        }
    }
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = param.match(reg);
    if (r != null) return unescape(r[2]); return '';
}
//判断checkbox被选中的个数
function checkedLong(str){
    return $(str+":checked").length;
}
var dlctipbox = {
    success:function(msg){
        var str='<section id="dlctipbox_mask" onclick="dlctipbox.clear()" style="width: 100%;height: 100%;position: fixed;background: rgba(0,0,0,0.4);top: 0;left: 0;"></section>'+
            '<div id="dlctipbox_success" class="flex flex-column bw border-r4" style="width: 6rem;height: 3.8rem;position: fixed;top: 50%;left: 50%;margin-top: -1.9rem;margin-left: -3rem;">'+
            '<img src="../img/success.png" style="width: 1rem;height: 1rem;"/>'+
            '<p class="font16 col3 mt20">'+(msg?msg:'Jerry制作')+'</p>'+
            '</div>';
        $(document.body).append(str);
        $('body').on('click','#dlctipbox_mask',function(){dlctipbox.clear();});
    },
    error:function(msg){
        var str='<section id="dlctipbox_mask" onclick="dlctipbox.clear()" style="width: 100%;height: 100%;position: fixed;background: rgba(0,0,0,0.4);top: 0;left: 0;"></section>'+
            '<div id="dlctipbox_success" class="flex flex-column bw border-r4" style="width: 6rem;height: 3.8rem;position: fixed;top: 50%;left: 50%;margin-top: -1.9rem;margin-left: -3rem;">'+
            '<img src="../img/error.png" style="width: 1rem;height: 1rem;"/>'+
            '<p class="font16 col3 mt20 plr24">'+(msg?msg:'Jerry制作')+'</p>'+
            '</div>';
        $(document.body).append(str);
        $('body').on('click','#dlctipbox_mask',function(){dlctipbox.clear();});
    },
    clear: function(){
        $('#dlctipbox_success,#dlctipbox_mask,#dlctipbox_confirm,#dlctipbox_tip,#dlctipbox_loading').remove();
    },
    confirm:function(msg,callback,cancelcall){
        showMask();
        var str='<section id="dlctipbox_confirm" class="flex flex-column bw border-r4" style="z-index:9999;width: 6rem;height: 3.8rem;position: fixed;top: 50%;left: 50%;margin-top: -1.9rem;margin-left: -3rem;">'+
            '<div class="msg font16 col3">'+(msg?msg:"Jerry制作")+'</div>'+
            '<div class="btn_bar" style="margin-top: .9rem;">'+
            '<button class="font16 col9 border-r4 confirm_btn" style="width: 1.6rem;line-height: .6rem;border: 1px solid #dadada;background: transparent;" data-btn="1">取消</button>'+
            '<button class="font16 colw bgc1 border-r4 confirm_btn" style="width: 1.6rem;line-height: .6rem;margin-left: .8rem;" data-btn="2">确定</button>'+
            '</div>'+
            '</section>';
        $(document.body).append(str);
        $('body').on('click','.confirm_btn',function(){
            if($(this).data('btn')==2){
                if(callback){
                    callback();
                }
            }else{
                if(cancelcall){
                    cancelcall();
                }
            }
            hideMask();$('#dlctipbox_confirm').remove();
        });
    },
    tip:function(msg){
        var str='<section id="dlctipbox_mask" onclick="dlctipbox.clear()" style="width: 100%;height: 100%;position: fixed;background: rgba(0,0,0,0.4);top: 0;left: 0;"></section>'+
            '<section id="dlctipbox_tip" class="bw border-r4" style="width: 6rem;height: 2.5rem;position: fixed;top: 50%;left: 50%;margin-top: -1.9rem;margin-left: -3rem;">'+
            '<div class="flex" style="padding: 0 .45rem;height: .94rem;">'+
            '<div class="line_x" style="height: 1px;flex: 1;background: #dadada;"></div>'+
            '<span style="padding: 0 .16rem;" class="font15 col3">提示</span>'+
            '<div class="line_x" style="height: 1px;flex: 1;background: #dadada;"></div>'+
            '</div>'+
            '<div style="padding: 0 .45rem;font-size: .28rem;color: #333;margin-top: .3rem;" class="tac">'+(msg?msg:'Jerry制作')+'</div>'+
            '</section>';
        $(document.body).append(str);
        $('body').on('click','#dlctipbox_mask',function(){dlctipbox.clear()});
    },
    loading:function(msg){
        var msg=msg?msg:'加载中...';
        var str='<div style="background: rgba(0,0,0,0.6);width: 2rem;z-index:999999;height: 2rem;position: fixed;left: 50%;top: 50%;margin-left: -1rem;margin-top: -1rem;" class="flex flex-column" id="dlctipbox_loading">'+
            '<div class="loadEffect">'+
            '<span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>'+
            '</div>'+
            '<p style="color: #fff;font-size: .28rem;margin-top: .1rem;">'+msg+'</p>'+
            '</div>';
        $(document.body).append(str);
    },
    show: function(msg, position, duration, keep) {
        if(!keep)this.clear();
        var msg = msg?msg:'Jerry制作';
        if(!msg){
            var m=document.getElementById('tooltipbox_show_div');
            var d = 0.2;
            m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
            m.style.opacity = '0';
            setTimeout(function() {
                try{ document.body.removeChild(m); }catch(e){}
            }, d * 1000);
            return;
        }
        if(position!='bottom' && position!='middle' && position!='top'){
            position ='bottom';
        }

        duration = isNaN(duration) ? 1000 : duration;
        var m = document.createElement('div');
        m.id = 'tooltipbox_show_div';
        m.innerHTML = msg;
        var css = "width:60%; font-size:14px;min-width:150px; background:#000; opacity:0.7; min-height:35px; overflow:hidden; color:#fff; line-height:35px; text-align:center; border-radius:5px; position:fixed; left:20%; z-index:999999;";
        if(position=='top'){
            css+="top:10%; ";
        } else if(position=='bottom'){
            css+="bottom:10%; ";
        } else if(position=='middle'){
            css+="top:50%;margin-top:-18px;";
        }
        m.style.cssText = css;
        document.body.appendChild(m);
        if(duration!=0){
            setTimeout(function() {
                var d = 0.2;
                m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
                m.style.opacity = '0';
                setTimeout(function() {
                    try{ document.body.removeChild(m); }catch(e){}
                }, d * 1000);
            }, duration);
        }
    },
    alert:function(msg,callback,data,keep){
        if(!keep)this.clear();
        var msg=msg?msg:'Jerry制作';
        var html = '<div id="tooltipbox_alert" style="z-index:999999997;"><div class="layer" style="height: 100%; width: 100%; background: rgba(0,0,0,0.4); position: fixed; top: 0px; left: 0px; z-index: 999999998; display: none;"></div><div class="tips" style="min-height: 120px; min-width: 250px; background: #fff; position: fixed; top: 50%; left: 50%; z-index: 999999999; margin: -100px -146px; display: none; border-radius:3px; border:1px solid rgba(255,255,255,0.6); padding:20px 20px 10px 20px;"><div class="title" style="min-height:90px; min-width:250px; font-size:16px; color:#676767;">';
        html+=msg;
        html+='</div><div class="sub" style="min-height:30px; min-width:250px;"><nav data-action="ok" style="min-height:30px; width:auto; padding:0px 10px; margin:0px 2px; font-size:16px; line-height:30px; float:right; color:#5e7199; cursor:pointer;">确定</nav>';
        html+='</div></div></div>';

        if($('#tooltipbox_tip').length>0){
            $('#tooltipbox_tip').remove();
        }
        var div =$(html);
        $(document.body).append(div);
        $('.layer',div).fadeIn(100);$('.tips',div).fadeIn(100);

        div.find('nav').unbind('click').click(function(){

            var action=$(this).data('action');
            if(action=='ok'){
                if(callback){
                    callback(data);
                }
                div.remove();
            }
        });
    }
};
function dlcUrl(){
    return 'http://pudishj.app.xiaozhuschool.com';
}
function dlc_request(method, data, cb,type){
    var data = data || {};
    url = dlcUrl()+method;
    $.ajax({
        type: type?type:'post',
        url: url,
        data: data,
        dataType: 'json',
        crossDomain:true,
        success:function(res){
            if(cb)cb(res);
        },
        error:function(err){
            if(err)cb(err)
        }
    });
}
window.alert = function(name){
    var iframe = document.createElement("IFRAME");
    iframe.style.display="none";
    iframe.setAttribute("src", 'data:text/plain,');
    document.documentElement.appendChild(iframe);
    window.frames[0].window.alert(name);
    iframe.parentNode.removeChild(iframe);
};




window.confirm = function (message) {
    var iframe = document.createElement("IFRAME");
    iframe.style.display = "none";
    iframe.setAttribute("src", 'data:text/plain,');
    document.documentElement.appendChild(iframe);
    var alertFrame = window.frames[0];
    var result = alertFrame.window.confirm(message);
    iframe.parentNode.removeChild(iframe);
    return result;
};





























