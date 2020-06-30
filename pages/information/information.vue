<template>
	<view>
		<view class="infor_moudel">
			<view class="">
				<image :src="infoData.headImgurl" style="width: 120upx;height: 120upx;border-radius: 50%;" mode=""></image>
			</view>
			<view class="font_size32">
				{{infoData.nickName}}
			</view>
			<view class="font_size40">
				{{infoData.name}}
			</view>
		</view>

		<view class="page_width">
			<view class="moudel_info">
				<view class="uni-flex padding_top3 padding_bottom3 border_bottom">
					<view class="font_size30 width20">
						手机号
					</view>
					<view class="uni-flex  width80" style="align-items: center;">
						<view class="width75 text_right">
							{{infoData.mobile}}
						</view>
						<view class="font_size30 width25 text_right" style="color: #374CE5;" @click="goPhone">
							去修改
							<image src="../../static/image/icon/rightb.png" class="margin_left2" style="width: 8upx;height: 14upx;" mode=""></image>
						</view>

					</view>
				</view>

				<view class="uni-flex padding_top3 padding_bottom3 border_bottom">
					<view class="font_size30 width20">
						微信号
					</view>
					<view class="uni-flex  width80" style="align-items: center;">
						<view class="width75 text_right">
							{{infoData.wxNumber}}
						</view>
						<view class="font_size30 width25 text_right" style="color: #374CE5;" v-if="true" @click="goToBinding">
							去修改
							<image src="../../static/image/icon/rightb.png" class="margin_left2" style="width: 8upx;height: 14upx;" mode=""></image>
						</view>

						<view class="font_size30 width25 text_right" style="color: #374CE5;" v-else>
							去绑定
							<image src="../../static/image/icon/rightb.png" class="margin_left2" style="width: 8upx;height: 14upx;" mode=""></image>
						</view>
					</view>
				</view>

				<view class="uni-flex padding_top3  ">
					<view class="font_size30 width20">
						身份证
					</view>
					<view class="width80 font_color66 font_size30 text_right" style="align-items: center;">
						{{infoData.idCard}}
					</view>
				</view>

			</view>
		</view>

		<!-- 手机号 -->
		<template v-if="noPhone">
			<view class="moudel_content_my">
				<view class="phone_moudel_my">
					<view class="uni-flex">
						<view class="width35 text_left" @click="colsePhone">
							<image src="../../static/image/icon/colse.png" style="width: 26upx;height: 26upx;" mode=""></image>
						</view>
						<view class="font_size34" style="margin-top: -2%;">
							{{title}}
						</view>
					</view>
					<template>
						<view class="font_size30 border_bottom margin_top5 padding_top3 padding_bottom3">
							<input type="text" class="margin_left2" maxlength="11" value="" @input="keyPhone" placeholder="请输入您的手机号" />
						</view>
						<view class="uni-flex border_bottom padding_top3 padding_bottom3">
							<view class="width60 margin_left2">
								<input type="number" maxlength="6" @input="keyCode" placeholder="请输入验证码" placeholder-style='color:#cccccc' />
							</view>
							<view @click="yzm_function" class="font_size30 width40 text_center">
								{{countdown}}<text v-show="timestatus" class="forgetpwd2">秒重获</text>
							</view>
						</view>
						<view class="phone_btn" @click="funChangeMobile">
							确定
						</view>
					</template>
				</view>
			</view>
		</template>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				noPhone: false,
				title: '绑定手机号',
				countdown: '获取验证码',
				timestatus: false,
				infoData: ''
			}
		},
		mounted() {
			this.funGetInfo()
		},
		methods: {

			// 获取个人信息
			funGetInfo: function() {
				var data = {
					memberId: uni.getStorageSync('memberId')
				}
				this.$http.get('/mb/info', data).then(res => {
					console.log(JSON.stringify(res))
					if (res.data.code == 200) {
						this.infoData = res.data.data;
						this.infoData.idCard = this.infoData.idCard.substr(0, 6) + '******' + this.infoData.idCard.substr(14, 18)
						this.infoData.mobile = this.infoData.mobile.substr(0, 3) + '****' + this.infoData.mobile.substr(7, 10)
					}
				})
			},

			// 手机号
			keyPhone: function(event) {
				this.userPhone = event.target.value
			},
			// 验证码
			keyCode: function(e) {
				this.phoneCode = e.target.value
			},
			// 打开手机号
			goPhone(e) {
				this.noPhone = true;
				this.title = '修改手机号'
			},
			colsePhone() {
				this.noPhone = false;
			},
			// 微信绑定
			goToBinding() {
				uni.navigateTo({
					url: '../wechatBinding/wechatBinding'
				})
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
			
			
			
			// 跟换手机号
			funChangeMobile:function(){
				var data={
					mobile: this.userPhone,
					memberId:uni.getStorageSync('memberId'),
					code:this.phoneCode
				}
				this.$http.post('/mb/changeMobile', data,true).then(res => {
					console.log(JSON.stringify(data))
					if(res.data.code == 200){
						uni.showToast({
							title: '更换成功',
							icon: 'none',
							duration: 2000,
							position: 'top',
						});
					}
				});
			
			}
			
		}
	}
</script>

<style lang="scss">
	.infor_moudel {
		width: 100%;
		height: 416upx;
		background: url(../../static/image/holdAll/information.png) no-repeat;
		background-size: 100%;
		color: #FFFFFF;
		padding-top: 70upx;
		text-align: center;
	}

	.moudel_info {
		background: #ffffff;
		border-radius: 30upx;
		box-shadow: 0upx 2upx 14upx 0upx #dde2ef;
		padding: 30upx;
		margin-top: -100upx;
	}


	.moudel_content_my {
		height: 100%;
		width: 100%;
		position: fixed;
		background-color: $uni-bg-color-mask;
		z-index: 99;
		top: 0;
		left: 0;
	}

	.phone_moudel_my {
		background-color: #FFFFFF;
		border-radius: 30upx;
		position: absolute;
		top: 30%;
		width: 520upx;
		margin-left: 75upx;
		height: 362upx;
		padding: 40upx;
	}

	.phone_btn {
		width: 220upx;
		height: 78upx;
		line-height: 78upx;
		text-align: center;
		background-color: #374CE5;
		color: #FFFFFF;
		border-radius: 50upx;
		margin-top: 30upx;
		margin-left: 160upx;
	}
</style>
