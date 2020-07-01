export default {  
        //判断是否在微信中  
    isWechat:function(){  
        var ua = window.navigator.userAgent.toLowerCase();  
        if(ua.match(/micromessenger/i) == 'micromessenger'){  
            return true;  
        }else{  
            return false;  
        }  
    },
	pay:function(data,cb){
	   function onBridgeReady() {
	       WeixinJSBridge.invoke('getBrandWCPayRequest',data,
	       function(res) {
			   // alert(JSON.stringify(res))
			   cb(res)
	       })
	   }
	   if  (typeof WeixinJSBridge == "undefined") {
	       if ( document.addEventListener ) {
	           document.addEventListener('WeixinJSBridgeReady',  onBridgeReady,  false)
	       } else  if  (document.attachEvent) {
	           document.attachEvent('WeixinJSBridgeReady',  onBridgeReady);
	           document.attachEvent('onWeixinJSBridgeReady',  onBridgeReady)
	       }
	   } else {
	       onBridgeReady()
	   }
	},
}