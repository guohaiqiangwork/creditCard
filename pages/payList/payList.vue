<template>
	<view>
		<view class="font_size60 text_center pay_moudel">
			￥399.00
		</view>

		<view class="payt_moudel">
			<view class="font_size30">
				选择支付方式
			</view>
			<view class="uni-flex margin_top3u">
				<view class="width15 text_center">
					<image src="../../static/image/icon/payList2.png" class="pay_img" mode=""></image>
				</view>
				<view class="font_size30 width75">
					余额支付(200,000.00)
				</view>
				<view class="">
					<radio-group @change="radioChange">
						<radio :value="'Y'" :checked="current == 'Y' " />
					</radio-group>
				</view>
			</view>
			<view class="uni-flex margin_top3u">
				<view class="width15 text_center">
					<image src="../../static/image/icon/payList1.png" class="pay_img" mode=""></image>
				</view>
				<view class="font_size30 width75">
					微信支付
				</view>
				<view class="">
					<radio-group @change="radioChange">
						<radio :value="'W'" :checked="current == 'W' " />
					</radio-group>
				</view>
			</view>
		</view>
		
		
		<view class="bottom_btn" @click="openPassword">
			确认支付
		</view>
		
		
		
		<!-- 支付密码 -->
		<template v-if="payFalg">
			<view class="moudel_content">
				<view :class="setFalg ? 'content_block' : 'content_block_pay'">
					<view class="uni-flex uni-row margin_left3 margin_top3">
						<view class="width30" @click="closeMoudel">
							<image src="../../static/image/icon/colse.png" mode="" class="moudel_img"></image>
						</view>
						<view class="font_color33 font_size34 font_weight600 margin_left3" v-if="setFalg">
							设置支付密码
						</view>
						<view class="font_color33 font_size34 font_weight600" v-if="!setFalg">
							请输入支付密码
						</view>
					</view>
					<view class="font_color33 font_size30 text_center" v-if="setFalg">
						支付密码为6位数字
					</view>
					<view class="font_color33 font_size30 text_center" v-if="!setFalg">
						需支付
					</view>
					<view class="font_color33 font_size60 text_center" v-if="!setFalg">
						￥{{money}}
					</view>
					<view class="margin_top5">
						<validcode :maxlength="6" :isPwd="true" @finish="getPwd" ref="pwd"></validcode>
					</view>
		
					<view class="moudel_btn" v-if="setFalg" @click="getSetPassword">
						确认
					</view>
				</view>
			</view>
		</template>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: '',
				setFalg: false, //密码设置框
				payFalg: false, //密码支付框
				money:'99'
			}
		},
		methods: {
			radioChange(evt) {
				this.current = evt.target.value
				console.log(evt.target.value)
			},
			
			// 去支付
			openPassword(){
				this.payFalg = true;
				uni.navigateTo({
					url:'../payResult/payResult'
				})
			},
			// 获取密码
			getPwd(val) {
				if (this.setFalg) {
					this.passwordSix = val
				} else {
					var data = {
						memberId: uni.getStorageSync('userId'),
						password: val
					};
					this.$http.post('/account/passwordCheck', data).then(res => {
						if (res.data.code == 200) {
							this.payFalg = false;
							this.getNewOrder()
						} else {
							this.$refs.pwd.clear(); //清空密码
							uni.showToast({
								title: res.data.message,
								icon: 'none',
								duration: 1500,
								position: 'top',
							});
						}
					}).catch(err => {})
			
				}
			
			},
			
		}
	}
</script>

<style lang="scss">
	.pay_moudel {
		width: 94%;
		margin-left: 3%;
		border-radius: 20upx;
		background-color: #FFFFFF;
		padding-top: 78upx;
		padding-bottom: 78upx;
		margin-top: 30upx;
	}

	.payt_moudel {
		width: 91%;
		margin-left: 3%;
		border-radius: 20upx;
		background-color: #FFFFFF;
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
		color: #FFFFFF;
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
		background-color: #FFFFFF;
		width: 90%;
		margin-left: 5%;
		border-radius: 16px;
		position: absolute;
		top: 18%;
	}
	
	.content_block_pay {
		background-color: #FFFFFF;
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
	
</style>
