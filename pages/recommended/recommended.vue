<template>
	<view>
		<view class="recomment_moudel">
			
		</view>
		<view class="recomment_moudel1">
			<view class="font_size22 font_color99 text_right margin_right3 margin_top3">
				{{recommendData.createTime}}
			</view>
			<view class="uni-flex">
				<view class="margin_left3">
					<image :src="recommendData.headImgurl" style="width: 100upx;height: 100upx;border-radius: 50%;" mode=""></image>
				</view>
				<view class="margin_left3">
					<view class="uni-flex">
						<view class="width50 text_hidden">
							{{recommendData.nickName}}
						</view>
						<view class="my_vipbj">
							{{recommendData.levelName}}
						</view>
					</view>
					<view class="font_size24">
						手机号：
						<text v-if="recommendData.mobile">{{recommendData.mobile}}</text>
						<text v-else>--</text>
					</view>
				</view>
			</view>
			<view class="uni-flex">
				<view class="list_btn1" @click="copyClick">
					<image src="../../static/image/icon/wxb.png" style="width: 32upx;height: 26upx;" mode=""></image>
					<text class="margin_left2">微信聊</text>
				</view>
				<view class="list_btn2" @click="gotoTele">
					<image src="../../static/image/icon/phone.png" style="width: 30upx;height: 26upx;" mode=""></image>
					<text class="margin_left2">电话聊</text>
				</view>
			</view>
		
			<view class="">
				<image src="" mode=""></image>
			</view>
		</view>
				
				
	</view>
</template>

<script>
	export default {
		data() {
			return {
				recommendData: '',
				phone:''
			}
		},
		mounted() {
			this.funReferrer(); //获取数据
		},
		methods: {
			funReferrer: function() {
				this.$http.get('/mb/referrer/' + uni.getStorageSync('memberId')).then(res => {
					if (res.data.code == 200) {
						this.recommendData = res.data.data;
						this.phone = res.data.data.mobile
						this.recommendData.mobile = this.recommendData.mobile.substr(0, 3) + '****' + this.recommendData.mobile.substr(
							7, 10)
					}
				})
			},
			// 复制
			copyClick: function() {
				console.log(0)
				if(!this.recommendData.wxNumber){
					uni.showToast({
						title: '用户未绑定微信',
						icon: 'none',
						duration: 2000,
						position: 'top',
					});
					return;
				}else{
					uni.setClipboardData({
						data: this.recommendData.wxNumber,
						success: function(data) {
							uni.showToast({
								title: '复制成功',
								icon: 'none',
								duration: 2000,
								position: 'top',
							});
						},
						fail: function(err) {},
						complete: function(res) {}
					})
								
				}
			
			
			},
			/* 联系客服 */
			gotoTele(){
				 uni.makePhoneCall({
				 // 手机号
				phoneNumber: this.phone, 
				// 成功回调
				success: (res) => {
						console.log('调用成功!')        
				},
				// 失败回调
				fail: (res) => {
						console.log('调用失败!')
				}
			  });
			},

		}
	}
</script>

<style>
	.recomment_moudel {
		background: url(../../static/image/holdAll/recommend.png) no-repeat;
		width: 100%;
		height: 100%;
		position:absolute;
		z-index: -999;
		background-position: 0px 0px;
		background-size: 100% 100%;
	}

	.recomment_moudel1 {
		background-color: #FFFFFF;
		width: 94%;
		position: absolute;
		bottom: 10%;
		border-radius: 20upx;
		margin-left: 3%;
		height: 260upx;
		z-index: 999;
	}

	.my_vipbj {
		width: 130upx;
		height: 30upx;
		background: url(../../static/image/icon/vipb.png) no-repeat;
		font-size: 22upx;
		background-size: 100%;
		color: #FFE600;
		text-align: right;
		line-height: 30upx;
		margin-top: 10upx;
		margin-left: 10upx;
		padding-right: 1%;
	}

	.list_btn1 {
		width: 172upx;
		height: 60upx;
		border-radius: 40upx;
		text-align: center;
		background: linear-gradient(to right, #1BC77C, #4DE218);
		color: #FFFFFF;
		font-size: 24upx;
		align-items: center;
		line-height: 60upx;
		margin-left: 20%;
	}

	.list_btn2 {
		width: 172upx;
		height: 60upx;
		border-radius: 40upx;
		text-align: center;
		background: linear-gradient(to right, #374CE5, #377DE5);
		color: #FFFFFF;
		font-size: 24upx;
		align-items: center;
		line-height: 60upx;
		margin-left: 10%;
	}
</style>
