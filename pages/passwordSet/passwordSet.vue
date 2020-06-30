<template>
	<view class="page_width">
		<view class="set_moudel">

			<view class="uni-flex padding_top4 padding_bottom4 border_bottom margin_left3 margin_right3">
				<view class="font_size30 width15">
					手机号
				</view>
				<view class="margin_top1">
					<input type="text" class="margin_left2" maxlength="11" value="" @input="keyPhone" placeholder="请输入您的手机号"
					 placeholder-style='color:#cccccc' />
				</view>
			</view>
			<view class="uni-flex padding_top4 padding_bottom4 border_bottom margin_left3 margin_right3">
				<view class="font_size30 width15">
					验证码
				</view>
				<view class="margin_top1 width55">
					<input type="number" class="margin_left2" maxlength="6" @input="keyCode" placeholder="请输入验证码" placeholder-style='color:#cccccc' />
				</view>
				<view @click="yzm_function" class="font_size30 width35 text_center" style="border-left:1px solid  #CCCCCC;">
					{{countdown}}<text v-show="timestatus">秒重获</text>
				</view>
			</view>

			<view class="uni-flex padding_top4 padding_bottom4  margin_left3 margin_right3">
				<view class="font_size30 width15">
					新密码
				</view>
				<view class="margin_top1 ">
					<input type="number" class="margin_left2" maxlength="6" @input="keyPassword" placeholder="请输入要修改的密码"
					 placeholder-style='color:#cccccc' />
				</view>
			</view>

			<view class="btn_q" @click="funUpdatePassword">
				确认修改
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				countdown: '获取验证码',
				timestatus: false,
				userPhone: '', //手机好
				phoneCode: '', //验证码
				passwordCode: '' //密码
			}
		},
		methods: {
			// 手机号
			keyPhone: function(event) {
				this.userPhone = event.target.value
			},
			// 验证码
			keyCode: function(e) {
				this.phoneCode = e.target.value
			},
			// 密码
			keyPassword: function(e) {
				this.passwordCode = e.target.value
			},
			// 获取验证码
			yzm_function: function() {
				var that = this;
				if (!(/^1[3456789]\d{9}$/.test(this.userPhone))) {
					uni.showToast({
						title: '请输入正确的11位手机号码',
						icon: 'none',
						duration: 1500,
						position: 'top',
					});
					return false;
				} else if (this.timestatus == true) {
					uni.showToast({
						title: '请勿重复点击',
						icon: 'none',
						duration: 1500,
						position: 'top',
					});
					return false;
				}
				that.disabled = true; //禁用点击
				var phoneData = {
					mobile: that.userPhone
				}
				that.$http.post('/send/code', phoneData).then(res => {
					if (res.data.code == 200) {
						that.countdown = 60;
						that.timestatus = true;
						that.clear = setInterval(that.countDown, 1000);
						console.log(JSON.stringify(data))
					} else {
						that.disabled = false; //获取失败开启点击
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 1500,
							position: 'top',
						});

					}
				}).catch(err => {
					that.disabled = false; //获取失败开启点击
				})
			},
			// 倒计时
			countDown() {
				var that = this;
				if (!that.countdown) {
					that.disabled = false;
					that.timestatus = false;
					that.countdown = '获取验证码';
					clearInterval(that.clear);
				} else {
					--that.countdown;
				}
			},
			
			// 修改密码
			funUpdatePassword :function(){
				var data = {
					mbId: uni.getStorageSync('memberId'),
					code:this.phoneCode,
					mobile:this.userPhone,
					password:this.passwordCode,
				}
				this.$http.post('/acc/updatePassword',data,true).then(res => {
					console.log(JSON.stringify(res));
					if (res.data.code == 200) {
						uni.showToast({
							title: '更换成功',
							icon: 'none',
							duration: 2000,
							position: 'top',
						});
					uni.switchTab({
						url: '/pages/tabBar/my/my'
					});
					}
				}).catch(err => {
				
				})
			}


		}
	}
</script>

<style>
	.set_moudel {
		height: 354upx;
		background: #ffffff;
		border-radius: 30upx;
		box-shadow: 0pt 2upx 14upx 0pt #dde2ef;
		margin-top: 30upx;
	}

	.margin_top1 {
		margin-top: 1%;
	}

	.padding_bottom4 {
		padding-bottom: 32upx;
	}

	.padding_top4 {
		padding-top: 32upx;
	}

	.btn_q {
		height: 90upx;
		background: #374ce5;
		border-radius: 45upx;
		text-align: center;
		line-height: 90upx;
		color: #FFFFFF;
		font-size: 30upx;
		position: absolute;
		bottom: 5%;
		width: 94%;
	}
</style>
