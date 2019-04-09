  //手机适配
  (function (doc, win) {
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                if(clientWidth>=750){
                    docEl.style.fontSize = '100px';
                }else{
                    docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
                }
            };

        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
// 全局变量
var urlAjax='http://pudishj.app.xiaozhuschool.com';
//TAB 公用选项卡 插件
function setTab(name, cursel, n) { //参数为 id  当前选项  控制数量总计
    for (i = 1; i <= n; i++) {
        var zx = document.getElementById(name + i);
        var con = document.getElementById("con_" + name + "_" + i);
        zx.className = i == cursel ? "active" : "";
        con.style.display = i == cursel ? "block" : "none";
    }

}
/* 显示遮罩层 */
function showOverlay()  {
    $(".zhezhaobox").height($(document).height());
    $(".zhezhaobox").width($(document).width());
    $(".zhezhaobox").show();
}
/* 隐藏遮罩 */
function hideOverlay(){
    $(".zhezhaobox").hide();
}

$(".zhezhaobox").click(function(e){
    var target = $(e.target); 

    if($(target).parents(".zhezhaobox").length == 0)
        {
            $(".zhezhaobox").hide();
        }
})
// $(".zhezhaobox").click(function(event) {
//     event.stopPropagation();
//     return false;
// });

function getLocalTime(nS) {     
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
}
function add0(m){return m<10?'0'+m:m };  
function getDate(shijianchuo) {  
  //shijianchuo是整数，否则要parseInt转换  
  var time = new Date(shijianchuo);  
  // var y = time.getFullYear();  
  // var m = time.getMonth()+1;  
  // var d = time.getDate();  
  // var h = time.getHours();  
  // var mm = time.getMinutes();  
  // var s = time.getSeconds();  
  if(shijianchuo<0){
     return "时间已结束"
  }else{
    var h=parseInt(shijianchuo/1000/3600) ;
    var mm=parseInt(shijianchuo/1000%3600/60);
    var s=parseInt(shijianchuo/1000%3600%60);
    return add0(h)+':'+add0(mm)+':'+add0(s); 
  }
}; 
//图片上传
function getLocalTime(nS) {     
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
}
function upLoadImg(file,picbox,size=1){
    if($('.shade').length == 0){
        $('body').append($('<div class="shade" onclick="javascript:closeShade()" style="position: absolute;width: 100%;height: 100%;top: 0;left: 0;background: rgba(0, 0, 0, 0.2);z-index: 1000;display: none;"><div class="" style="width: 300px;height: 200px;line-height: 200px;position: absolute;top: 50%;left: 50%;margin-top: -100px;margin-left: -150px;background: white;border-radius: 5px;text-align: center;"><span class="text_span"></span></div></div>'));
    }
    if($('.shadeImg').length == 0) {
        $('body').append($('<div class="shadeImg" onclick="javascript:closeShadeImg()" style="position: absolute;display: none;width: 100%;height: 100%;top: 0;left: 0;z-index: 15;text-align: center;background: rgba(0, 0, 0, 0.2);"><div><img class="showImg" src="" style="width: 60%;"></div></div>'));
    }
    var objUrl;
    var img_html;
    var template = $(file).parent().html();
   
    var picbox = document.getElementById(picbox);
    var filepath = $(file).val();
    if($(picbox).children('label').length > size){
        $(".shade").fadeIn(500);
        $(".text_span").text("最多只能上传"+size + '张图片！');
        return false;
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
            img_html = "<div class='isImg'><img src='" + objUrl + "' onclick='javascript:lookBigImg(this)' style='height: 100%; width: 100%;' /><button class='removeBtn' onclick='javascript:removeImg(this)'>&times;</button></div>";
            $(file).parent().append(img_html);
            var obj = $('<label>'+template+'</label>');
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
    $(".shadeImg").fadeIn(500).css({
                'display': 'flex',
                'justify-content': 'center',
                'align-items': 'center'
            });
    $("body,html").css('overflow','hidden');
    $(".showImg").attr("src",$(b).attr("src"));
    event.stopPropagation();
    event.preventDefault();
    return false;
}
function closeShade(){
    $(".shade").fadeOut(500);
    $("body,html").css('overflow','visible');
}
function closeShadeImg(){
    $(".shadeImg").fadeOut(500);
    $("body,html").css('overflow','visible');
};