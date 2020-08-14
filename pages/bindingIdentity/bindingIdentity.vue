<template>
	<view>
		<view class="page_width">
			<view class="moudel_one">
				<view class="uni-flex border_bottom padding_bottom3 " style="padding-top: 1%;">
					<view class="width10"><image src="../../static/image/icon/phoneN.png" class="one_img" mode=""></image></view>
					<view class="margin_left3 font_size30 ">
						<input type="number" maxlength="11" @input="keyPhone" placeholder="请输入您的联系电话" placeholder-style="color:#cccccc" />
					</view>
				</view>
				<view class="uni-flex border_bottom padding_bottom3 " style="padding-top: 5%;">
					<view class="width10"><image src="../../static/image/icon/yzm.png" class="one_img" style="height: 32upx;" mode=""></image></view>
					<view class="uni-flex width90">
						<view class="font_size28 width70  margin_left3">
							<input type="number" maxlength="6" @input="keyCode" placeholder="请输入验证码" placeholder-style="color:#cccccc" />
						</view>
						<view class="width30 text_center font_size30" style="border-left: 1px solid #CCCCCC;" @click="yzm_function">
							{{ countdown }}
							<text v-show="timestatus" class="forgetpwd2">秒重获</text>
						</view>
					</view>
				</view>

				<view class="uni-flex border_bottom padding_bottom3 " style="padding-top: 5%;">
					<view class="width10"><image src="../../static/image/icon/card.png" class="two_img" mode=""></image></view>
					<view class="margin_left3 font_size30 "><input type="text" @input="keyCard" placeholder="请输入您的身份证号码" placeholder-style="color:#cccccc" /></view>
				</view>

				<view class="uni-flex border_bottom padding_bottom3 " style="padding-top: 5%;">
					<view class="width10"><image src="../../static/image/icon/name.png" class="three_img" mode=""></image></view>
					<view class="margin_left3 font_size30 "><input type="text" @input="keyName" placeholder="请输入您的真实姓名" placeholder-style="color:#cccccc" /></view>
				</view>
			</view>

			<view class="font_size28 font_color99 margin_top3">
				申请信用卡时的登记信息请使用同一个手机号码（当前绑定的号码）进行申请，否则将造成信息不匹配，由此造成的影响将由用户负责。
			</view>

			<view class="btn_bd" @click="funBindMobileAndIdCard">确认绑定</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			countdown: '获取验证码',
			timestatus: false,
			bankUrl: ''
		};
	},
	onLoad(option) {
		this.bankUrl = option.urlFalg;
	},
	methods: {
		// 获取手机号
		keyPhone: function(e) {
			console.log(e);
			this.userPhone = e.target.value;
		},
		// 验证码
		keyCode: function(e) {
			this.phoneCode = e.target.value;
		},
		// 获取证件号码
		keyCard: function(e) {
			console.log(e);
			this.userCardtarget = e.target.value;
		},
		// 获取姓名
		keyName: function(e) {
			this.userNam = e.target.value;
		},
		// 获取验证码
		yzm_function: function() {
			var that = this;
			if (!/^1[3456789]\d{9}$/.test(this.userPhone)) {
				uni.showToast({
					title: '请输入正确的11位手机号码',
					icon: 'none',
					duration: 1500,
					position: 'top'
				});
				return false;
			} else if (this.timestatus == true) {
				uni.showToast({
					title: '请勿重复点击',
					icon: 'none',
					duration: 1500,
					position: 'top'
				});
				return false;
			}
			that.disabled = true; //禁用点击
			var phoneData = {
				mobile: that.userPhone
			};
			this.$http
				.post('/send/code', phoneData)
				.then(res => {
					if (res.data.code == 200) {
						that.countdown = 60;
						that.timestatus = true;
						that.clear = setInterval(that.countDown, 1000);
						console.log(JSON.stringify(data));
					} else {
						that.disabled = false; //获取失败开启点击
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 1500,
							position: 'top'
						});
					}
				})
				.catch(err => {
					that.disabled = false; //获取失败开启点击
				});
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

		funBindMobileAndIdCard: function() {
			if (!this.userPhone) {
				uni.showToast({
					title: '请填写手机号',
					icon: 'none',
					duration: 2000,
					position: 'top'
				});
				return;
			} else if (!this.phoneCode) {
				uni.showToast({
					title: '请填写验证码',
					icon: 'none',
					duration: 2000,
					position: 'top'
				});
				return;
			} else if (!this.userCardtarget) {
				uni.showToast({
					title: '请填写证件号码',
					icon: 'none',
					duration: 2000,
					position: 'top'
				});
				return;
			} else if (!this.userNam) {
				uni.showToast({
					title: '请填写姓名',
					icon: 'none',
					duration: 2000,
					position: 'top'
				});
				return;
			} 
			var data = {
				memberId: uni.getStorageSync('memberId'),
				code: this.phoneCode,
				idCard: this.userCardtarget,
				mobile: this.userPhone,
				name: this.userNam
			};
			this.$http.post('/mb/bindMobileAndIdCard', data).then(res => {
				if (res.data.code == 200) {
					uni.showToast({
						title: '绑定成功',
						icon: 'none',
						duration: 2000,
						position: 'top'
					});
					if (this.bankUrl) {
						uni.navigateTo({
							url: '../' + this.bankUrl + '/' + this.bankUrl
						});
					} else {
						uni.switchTab({
							url: '../tabBar/home/home'
						});
					}
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

<style lang="less">
.moudel_one {
	background-color: #ffffff;
	padding: 30upx;
	background: #ffffff;
	border-radius: 30upx;
	box-shadow: 0upx 2upx 14upx 0upx #dde2ef;
	margin-top: 30upx;
	padding-bottom: 0;
}

.one_img {
	width: 28upx;
	height: 38upx;
}

.two_img {
	width: 32upx;
	height: 24upx;
}

.three_img {
	width: 30upx;
	height: 30upx;
}

.btn_bd {
	height: 90upx;
	background: #374ce5;
	border-radius: 45upx;
	text-align: center;
	align-items: center;
	color: #ffffff;
	font-size: 30upx;
	line-height: 90upx;
	position: absolute;
	bottom: 5%;
	width: 94%;
}
</style>
