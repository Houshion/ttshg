<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width,target-densitydpi=high-dpi,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="format-detection" content="telephone=no, email=no">
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta http-equiv="Cache-Control" content="no-cache" />
    <!--设置存缓-->
    <!-- css -->
    <link rel="stylesheet" href="../css/reset.css">
    <link rel="stylesheet" href="../css/swiper.min.css">
    <title>补货管理</title>
    <!-- 设置rem -->
    <script type="text/javascript" src="../js/adaptive.js"></script>
    <script>
    window['adaptive'].desinWidth = 750;
    window['adaptive'].baseFont = 28;
    window['adaptive'].init();
    </script>
    <style>
        body{overflow: hidden;}
        .space_between img{
            width: 0.8rem;height: 0.8rem;
        }
        .space_between span{
            margin-left: 0.4rem
        }
        .space_between{
            height: 1.6rem;border-radius: 0.1rem
        }
        .space_between .right{
            height: 0.26rem;width: 0.14rem
        }
    </style>
</head>

<body class="bc-gray"> 
   <div class="paddlr20">
       <div class="bc-fff space_between margin-top-20 paddlr20 equipment tap">
           <div><img src="../img/01.png"><span class="font32">设备补货</span></div>
           <div><img src="../img/right.png" class="right"></div>
       </div>
       <div class="bc-fff space_between paddlr20 margin-top-20 revenue tap">
           <div><img src="../img/02.png"><span class="font32">营收表</span></div>
           <div><img src="../img/right.png" class="right"></div>
       </div>
       <div class="bc-fff space_between paddlr20 margin-top-20 message tap">
           <div><img src="../img/03.png"><span class="font32">设备消息</span></div>
           <div><img src="../img/right.png" class="right"></div>
       </div>
   </div> 
</body>

</html>
<script src="../js/jquery-1.8.3.min.js"></script>
<script src="../js/dlc.js" type="text/javascript" charset="utf-8"></script>
<script>
    var code = 99;
    $(".revenue").click(function () {
        if(code == 1){
            window.location.href='c_revenue.html';
        }else if(code==-1){
            window.location.href='status_tip2.html';
        }
    });
    $(".message").click(function () {
        if(code == 1){
            window.location.href='c_message.html';
        }else{
            window.location.href='status_tip2.html';
        }
    });
    dlc_request('Wxsite/MylGoods/api',{api_name:'bindingFacility'},function(res){
        console.log(res);
        //alert(JSON.stringify(res));
        code = res.code;
    });
</script>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<?php
  $jssdk = new JSSDK('wxb5b9d0abe72f969c', '731debec238119d42d19f1ee7269fb16');
  $signPackage = $jssdk->GetSignPackage();
?>
	<script language="javascript">
		wx.config({
			debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: '<?php echo $signPackage["appId"];?>', // 必填，公众号的唯一标识
			timestamp: '<?php echo $signPackage["timestamp"];?>', // 必填，生成签名的时间戳
			nonceStr: '<?php echo $signPackage["nonceStr"];?>', // 必填，生成签名的随机串
			signature: '<?php echo $signPackage["signature"];?>', // 必填，签名，见附录1
			jsApiList: ['checkJsApi',
					'onMenuShareTimeline',
					'onMenuShareAppMessage',
					'onMenuShareQQ',
					'onMenuShareWeibo',
					'hideMenuItems',
					'showMenuItems',
					'hideAllNonBaseMenuItem',
					'showAllNonBaseMenuItem',
					'translateVoice',
					'startRecord',
					'stopRecord',
					'onRecordEnd',
					'playVoice',
					'pauseVoice',
					'stopVoice',
					'uploadVoice',
					'downloadVoice',
					'chooseImage',
					'previewImage',
					'uploadImage',
					'downloadImage',
					'getNetworkType',
					'openLocation',
					'getLocation',
					'hideOptionMenu',
					'showOptionMenu',
					'closeWindow',
					'scanQRCode',
					'chooseWXPay',
					'openProductSpecificView',
					'addCard',
					'chooseCard',
					'openCard',
				] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});

		wx.ready(function() {
			
			$(".equipment").click(function() {
					wx.scanQRCode({
						needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
						scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
						success: function(res) {
                            //alert(JSON.stringify(res.resultStr));
                            var macno = res.resultStr.substr(res.resultStr.indexOf('macno')+6);
							//location.href="c_equipment.html?macno="+macno;
                            dlc_request('Wxsite/Lqsdevice/api',{'api_name':'judgeCode','macno':macno},function(res){
                                  //alert(JSON.stringify(res));
                                  if(res.code == 1){
                                      location.href="c_equipment.html?macno="+macno;
                                  }else{
                                      location.href="status_tip.html";
                                  }
                            });
						},
						error:function(e){
							alert('扫码失败');
						}
					});
			});
		});

	</script>

	<?php
//微信方法
 class JSSDK {
    private $appId;
    private $appSecret;
    public function __construct($appId, $appSecret) {
      $this->appId = $appId;
      $this->appSecret = $appSecret;
    }
    public function getSignPackage() {
      $jsapiTicket = $this->getJsApiTicket();
      $url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
      $timestamp = time();
      $nonceStr = $this->createNonceStr();
      // 这里参数的顺序要按照 key 值 ASCII 码升序排序
      $string = "jsapi_ticket=$jsapiTicket&noncestr=$nonceStr&timestamp=$timestamp&url=$url";
      $signature = sha1($string);
      $signPackage = array(
        "appId"     => $this->appId,
        "nonceStr"  => $nonceStr,
        "timestamp" => $timestamp,
        "url"       => $url,
        "signature" => $signature,
        "rawString" => $string
      );
      return $signPackage; 
    }
    private function createNonceStr($length = 16) {
      $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      $str = "";
      for ($i = 0; $i < $length; $i++) {
        $str .= substr($chars, mt_rand(0, strlen($chars) - 1), 1);
      }
      return $str;
    }
    private function getJsApiTicket() {
      // jsapi_ticket 应该全局存储与更新，以下代码以写入到文件中做示例
      $data = json_decode(file_get_contents("./../temp/jsapi_ticket.json"));
      if (!$data || $data->expire_time < time()) {
        $accessToken = $this->getAccessToken();
        $url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=$accessToken";
        $res = json_decode($this->httpGet($url));
        $ticket = $res->ticket;
        if ($ticket) {
          $data->expire_time = time() + 7000;
          $data->jsapi_ticket = $ticket;
          $fp = fopen("./../temp/jsapi_ticket.json", "w");
          fwrite($fp, json_encode($data));
          fclose($fp);
		  //file_put_contents("./../temp/jsapi_ticket.json", json_encode($data));
        }
      } else {
        $ticket = $data->jsapi_ticket;
      }
      return $ticket;
    }
    private function getAccessToken() {
      // access_token 应该全局存储与更新，以下代码以写入到文件中做示例
      $data = json_decode(file_get_contents("./../temp/access_token.json"));
      if (!$data || $data->expire_time < time()) {
        $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$this->appId&secret=$this->appSecret";
        $res = json_decode($this->httpGet($url));
        $access_token = $res->access_token;
        if ($access_token) {
          $data->expire_time = time() + 7000;
          $data->access_token = $access_token;
          $fp = fopen("./../temp/access_token.json", "w");
          fwrite($fp, json_encode($data));
          fclose($fp);
		  //file_put_contents("./../temp/access_token.json", json_encode($data));
        }
      } else {
        $access_token = $data->access_token;
      }
      return $access_token;
    }
    private function httpGet($url) {
      $curl = curl_init();
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($curl, CURLOPT_TIMEOUT, 500);
      curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
      curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
      curl_setopt($curl, CURLOPT_URL, $url);
      $res = curl_exec($curl);
      curl_close($curl);
      return $res;
    }
 }
?>