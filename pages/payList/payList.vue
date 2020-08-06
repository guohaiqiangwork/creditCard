<template>
	<view>
		<view class="font_size60 text_center pay_moudel">￥{{ payOrderD.price }}</view>

		<view class="payt_moudel">
			<view class="font_size30">选择支付方式</view>
			<view class="uni-flex margin_top3u">
				<view class="width15 text_center"><image src="../../static/image/icon/payList2.png" class="pay_img" mode=""></image></view>
				<view class="font_size30 width75">余额支付({{ yeFalg }})</view>
				<view class="">
					<radio-group @change="radioChange"><radio :value="'Y'" :checked="current == 'Y'" /></radio-group>
				</view>
			</view>
			<view class="uni-flex margin_top3u">
				<view class="width15 text_center"><image src="../../static/image/icon/payList1.png" class="pay_img" mode=""></image></view>
				<view class="font_size30 width75">微信支付</view>
				<view class="">
					<radio-group @change="radioChange"><radio :value="'W'" :checked="current == 'W'" /></radio-group>
				</view>
			</view>
		</view>

		<view class="bottom_btn" @click="openPassword">确认支付</view>

		<!-- 支付密码 -->
		<template v-if="payFalg">
			<view class="moudel_content">
				<view :class="setFalg ? 'content_block' : 'content_block_pay'">
					<view class="uni-flex uni-row margin_left3 margin_top3">
						<view class="width30" @click="closeMoudel"><image src="../../static/image/icon/colse.png" mode="" class="moudel_img"></image></view>
						<view class="font_color33 font_size34 font_weight600 margin_left3" v-if="setFalg">设置支付密码</view>
						<view class="font_color33 font_size34 font_weight600" v-if="!setFalg">请输入支付密码</view>
					</view>
					<view class="font_color33 font_size30 text_center" v-if="setFalg">支付密码为6位数字</view>
					<view class="font_color33 font_size30 text_center" v-if="!setFalg">需支付</view>
					<view class="font_color33 font_size60 text_center" v-if="!setFalg">￥{{ payOrderD.price }}</view>
					<view class="margin_top5"><validcode :maxlength="6" :isPwd="true" @finish="getPwd" ref="pwd"></validcode></view>

					<view class="moudel_btn" v-if="setFalg" @click="funSetPassword">确认</view>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
var jweixin = require('jweixin-module');
export default {
	data() {
		return {
			current: '',
			setFalg: false, //密码设置框
			payFalg: false, //密码支付框
			money: '99',
			payOrderD: '',
			yeFalg: '',
			passwordNum: '' //密码
		};
	},
	onLoad(e) {
		console.log(JSON.parse(e.payOrder));
		this.payOrderD = JSON.parse(e.payOrder);
	},
	mounted() {
		this.funGetSxf(); //获取余额
	},
	methods: {
		// 选择支付方式
		radioChange(evt) {
			this.current = evt.target.value;
			console.log(evt.target.value);
		},
		closeMoudel: function() {
			this.payFalg = false;
		},

		// 获取余额
		funGetSxf() {
			this.$http
				.get('/mb/getSxf/' + uni.getStorageSync('memberId'))
				.then(res => {
					console.log(JSON.stringify(res));
					if (res.data.code == 200) {
						this.yeFalg = res.data.data.ye;
					}
				})
				.catch(err => {});
		},

		// 微信支付
		funWxpay: function() {
			var data = {
				id: uni.getStorageSync('memberId'),
				balance: this.payOrderD.price,
				levelId: this.payOrderD.id
			};
			this.$http
				.post('/acc/wxPay', data, true)
				.then(res => {
					console.log(JSON.stringify(res));
					if (res.data.code == 200) {
						this.payRequest(res.data.data);
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 2000,
							position: 'top'
						});
					}
				})
				.catch(err => {});
		},

		payRequest: function(item) {
			var self = this;
			console.log(item);
			jweixin.config({
				debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: item.appId, // 必填，公众号的唯一标识
				timestamp: item.timeStamp, // 必填，生成签名的时间戳
				nonceStr: item.nonceStr, // 必填，生成签名的随机串
				signature: item.signType, // 必填，签名，见附录1
				jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
			jweixin.ready(function() {
				jweixin.checkJsApi({
					jsApiList: ['chooseWXPay'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
					success: function(res) {
						console.log('checkjsapi Success');
						console.log(res);
					},
					fail: function(res) {
						console.log('res');
						console.log(res);
					}
				});
				jweixin.chooseWXPay({
					timestamp: item.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
					nonceStr: item.nonceStr, // 支付签名随机串，不长于 32 位
					package: item.packageValue, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
					signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
					paySign: item.paySign, // 支付签名
					success: function(res) {
						// 支付成功后的回调函数

						console.log('paysuccess');
						console.log(res);
						// var route =  'payResult' + '?type=1'
						uni.navigateTo({
							url: '../payResult/payResult?payFlag=' + JSON.stringify(res.data.data)
						});
					},
					cancel: function(r) {
						// var route =  'payResult' + '?type=2'
						uni.navigateTo({
							url: '../payResult/payResult?payFlag=' + JSON.stringify(res.data.data)
						});
					},
					fail: function(res) {
						console.log('payfail');
						console.log(res);
						// var route =  'payResult' + '?type=0'
						uni.navigateTo({
							url: '../payResult/payResult?payFlag=' + JSON.stringify(res.data.data)
						});
					}
				});
			});

			jweixin.error(function(res) {
				console.log('error');
				console.log(res);
				uni.showToast({
					icon: 'none',
					title: '支付失败了',
					duration: 4000
				});
				// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
				/*alert("config信息验证失败");*/
			});
		},

		// 去支付
		openPassword() {
			if (this.current == 'W') {
				this.funWxpay();
			} else {
				this.$http.get('/acc/isSetPassword/' + uni.getStorageSync('memberId')).then(res => {
					console.log(JSON.stringify(res));
					if (res.data.code == 500) {
						this.setFalg = true; //未设置密码
						this.payFalg = true;
					} else {
						this.payFalg = true;
					}
				});
			}

			//
			// uni.navigateTo({
			// 	url: '../payResult/payResult'
			// })
		},
		// 获取密码
		getPwd: function(val) {
			console.log(val);
			if (this.setFalg) {
				this.passwordNum = val; //获取支付密码
			} else {
				var data = {
					mbId: uni.getStorageSync('memberId'),
					password: val,
				};
				this.$http
					.post('/acc/passwordCheck', data, true)
					.then(res => {
						if (res.data.code == 200) {
							this.payFalg = false;
							this.goBuy();//去购买
						} else {
							this.$refs.pwd.clear(); //清空密码
							uni.showToast({
								title: res.data.message,
								icon: 'none',
								duration: 1500,
								position: 'top'
							});
						}
					})
					.catch(err => {});
			}
		
		
		},
		
		// 进行购买
		goBuy:function(){
			var data = {
				id: uni.getStorageSync('memberId'),
				balance: this.payOrderD.price,
				levelId: this.payOrderD.id
			};
			this.$http
				.post('/acc/banncePay', data, true)
				.then(res => {
					if (res.data.code == 200) {
						this.payFalg = false;
						uni.navigateTo({
							url: '../payResult/payResult?payFlag=' + JSON.stringify(res.data.data)
						});
					} else {
						this.$refs.pwd.clear(); //清空密码
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 1500,
							position: 'top'
						});
					}
				})
				.catch(err => {});
		},
		
		// 设置支付密码
		funSetPassword: function() {
			var data = {
				mbId: uni.getStorageSync('memberId'),
				password: this.passwordNum
			};
			this.$http.post('/acc/setPassword', data, true).then(res => {
				console.log(JSON.stringify(res));
				if (res.data.code == 200) {
					uni.showToast({
						title: '设置成功',
						icon: 'none',
						duration: 2000,
						position: 'top'
					});
					this.setFalg = false; //未设置密码
				} else {
					uni.showToast({
						title: res.data.message,
						icon: 'none',
						duration: 2000,
						position: 'top'
					});
				}
			});
		}
	}
};
</script>

<style lang="scss">
.pay_moudel {
	width: 94%;
	margin-left: 3%;
	border-radius: 20upx;
	background-color: #ffffff;
	padding-top: 78upx;
	padding-bottom: 78upx;
	margin-top: 30upx;
}

.payt_moudel {
	width: 91%;
	margin-left: 3%;
	border-radius: 20upx;
	background-color: #ffffff;
	margin-top: 30upx;
	padding-top: 30upx;
	padding-bottom: 30upx;
	padding-left: 3%;
}

.pay_img {
	width: 42upx;
	height: 42upx;
}

.bottom_btn {
	width: 94%;
	margin-left: 3%;
	height: 88upx;
	background: #374ce5;
	border-radius: 44upx;
	text-align: center;
	line-height: 88upx;
	color: #ffffff;
	position: fixed;
	bottom: 3%;
}

/* 密码框 */
.moudel_content {
	height: 100%;
	width: 100%;
	position: fixed;
	background-color: $uni-bg-color-mask;
	z-index: 99;
	top: 0;
	left: 0;
}

.content_block {
	background-color: #ffffff;
	width: 90%;
	margin-left: 5%;
	border-radius: 16px;
	position: absolute;
	top: 18%;
	padding-bottom: 30upx;
}

.content_block_pay {
	background-color: #ffffff;
	width: 90%;
	margin-left: 5%;
	border-radius: 16px;
	position: fixed;
	// bottom: 3%;
	top: 20%;
	height: 438upx;
}

.moudel_img {
	width: 30upx;
	height: 30upx;
	margin-top: 8%;
	margin-left: 3%;
}

.moudel_btn {
	height: 70upx;
	width: 222upx;
	background-color: #374ce5;
	color: #ffffff;
	font-size: 30upx;
	text-align: center;
	border-radius: 50upx;
	align-items: center;
	line-height: 70upx;
	margin-top: 30upx;
	margin-left: 32%;
}
</style>
