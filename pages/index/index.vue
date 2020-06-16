<template>
	<view class="content">
		<image class="logo" src="/static/logo.png" @click="getUserInfo"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<button open-type="getUserInfo" @click="loginMP">大家反馈啦缴费记录看</button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				appid:'wx5d7f40ad90aaa137'
			}
		},
		onLoad() {
			let code = this.getUrlCode('code')
			console.log(code)
			if (code !== null || code !== "") {
				// this.getOpenidAndUserinfo(code)
				this.getCode()
			}
		},
		methods: {
			getCode() {
				// 截取地址中的code，如果没有code就去微信授权，如果已经获取到code了就直接把code传给后台获取openId
				let code = this.getUrlCode('code')
				if (code === null || code === '') {
					window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + this.appid + '&redirect_uri=' +
						encodeURIComponent('http://192.168.1.105/pages/index/index') +
						'&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect'
					// redirect_uri是授权成功后，跳转的url地址，微信会帮我们跳转到该链接，并且通过？的形式拼接code，这里需要用encodeURIComponent对链接进行处理。
					// 如果配置参数一一对应，那么此时已经通过回调地址刷新页面后，你就会再地址栏中看到code了。
					// http://127.0.0.1/pages/views/profile/login/login?code=001BWV4J1lRzz00H4J1J1vRE4J1BWV4q&state=1
				}
			},

			getUrlCode(name) {
				return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1]
					.replace(/\+/g, '%20')) || null
			},

			isWechat() {
				return String(navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) === "micromessenger";
			},

			getOpenidAndUserinfo(code) {
				console.log(JSON.stringify(code));
				
				return;
				uni.request({
					// url: 'http://127.0.0.1/api/wxLogin?code=' + code + '&state=state&appid=' + appid,
					url:'',
					success: (res) => {
						console.log('通过code获取openid和accessToken', res)
						if (res.data.code === 200) {
							// 登录成功，可以将用户信息和token保存到缓存中
							uni.setStorageSync('userInfo', res.data.result.userInfo)
							uni.setStorageSync('token', res.data.result.token)
						}
					}
				})
			}



		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
