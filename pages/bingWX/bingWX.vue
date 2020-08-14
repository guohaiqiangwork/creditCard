<template>
	<view></view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onShow() {
		// let code = uni.getStorageSync('weiXinCode');
		// let weiXinCode = this.getUrlCode('code');
		// // console.log(weiXinCode + '数据');
		// uni.setStorageSync('weiXinCode', weiXinCode);
		// // console.log(uni.getStorageSync('weiXinCode') + '获取看看');
		// if (code) {
		// 	this.getOpenidAndUserinfo();
		// } else {
		// 	this.getCode();
		// }
	},
	onLoad(option) {
		console.log(option);
		uni.setStorageSync('bingDId', option.bingDId);
		uni.switchTab({
			url:'../tabBar/home/home'
		})
	},
	methods: {
		getOpenidAndUserinfo: function(code) {
			// var code = '011J2eXm0ck7en1t8pYm0kdilZ2J2eXy';
			// console.log(JSON.stringify(code) + '数据乐乐');
			uni.request({
				// url: 'http://127.0.0.1/api/wxLogin?code=' + code + '&state=state&appid=' + appid,
				url: 'http://manage.zhichengdapay.com/wx/oauth2getAccessToken?code=' + uni.getStorageSync('weiXinCode'),
				method: 'GET',
				success: res => {
					// console.log('通过code获取openid和accessToken', res);
					if (res.data.code === 200) {
						// console.log('通过code 换取存心' + res);
						// 登录成功，可以将用户信息和token保存到缓存中
						// uni.setStorageSync('weiXinCode',res.data.data.openId);
						uni.setStorageSync('weiXinopenId', res.data.data.openId);
						uni.setStorageSync('memberId', res.data.data.mbId);
						this.init();
					}
				}
			});
		},
		getCode: function() {
			// console.log('234920-492- ');
			// 截取地址中的code，如果没有code就去微信授权，如果已经获取到code了就直接把code传给后台获取openId
			let code = this.getUrlCode('code');
			// console.log('进来了 ' + code);
			if (code === null || code === '') {
				window.location.href =
					'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
					this.appid +
					'&redirect_uri=' +
					this.redirect_url +
					'&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';
			} else {
				this.getOpenidAndUserinfo(code);
			}
		},
		
		getUrlCode: function(name) {
			return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1].replace(/\+/g, '%20')) || null;
		},
		
	}
};
</script>

<style></style>
