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
						<!-- <view class="my_vipbj">
							{{recommendData.levelName}}
						</view> -->
						<view class="my_vipbj" v-if="recommendData.levelName == '普通会员'">{{ recommendData.levelName }}</view>
						<view class="my_vipbjC" v-if="recommendData.levelName == '初级会员'">{{ recommendData.levelName }}</view>
						<view class="my_vipbjZ" v-if="recommendData.levelName == '中级会员'">{{ recommendData.levelName }}</view>
						<view class="my_vipbjG" v-if="recommendData.levelName == '高级会员'">{{ recommendData.levelName }}</view>
											
					</view>
					<view class="font_size24">
						手机号：
						<text v-if="recommendData.mobile">{{recommendData.mobile}}</text>
						<text v-else>--</text>
					</view>
				</view>
			</view>
			<view class="uni-flex">
				<view class="list_btn1" @click="openMoudel">
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
		
		<template v-if="moudelFalg">
			<view class="moudel_content">
				<view class="product_content_block">
					<view class="uni-flex" style="margin-top: 35upx;">
						<view class="width33 " style="margin-left: 30upx;" @click="closeMoudel" >
							<image src="../../static/image/icon/colse.png" style="width: 26upx;height: 26upx;" mode=""></image>
						</view>
						<view class="width33 font_size34 margin_left3">
							微信号
						</view>
					</view>
					<view class="font_size44 text_center" style="margin-top: 50upx;">
						{{recommendData.wxNumber}}
					</view>
					<view class="moudel_btns" @click="copyClick">
						复制微信
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
				recommendData: '',
				phone:'',
				moudelFalg:false
			}
		},
		mounted() {
			this.funReferrer(); //获取数据
		},
		methods: {
			closeMoudel:function(){
				this.moudelFalg = false
			},
			openMoudel:function(){
				if(!this.recommendData.wxNumber){
					uni.showToast({
						title: '用户未绑定微信',
						icon: 'none',
						duration: 2000,
						position: 'top',
					});
					return;
				}
				this.moudelFalg = true
			},
			funReferrer: function() {
				this.$http.get('/mb/referrer/' + uni.getStorageSync('memberId')).then(res => {
					if (res.data.code == 200) {
						this.recommendData = res.data.data;
						this.phone = res.data.data.mobile
						if(this.recommendData.mobile){
							this.recommendData.mobile = this.recommendData.mobile.substr(0, 3) + '****' + this.recommendData.mobile.substr(
								7, 10)
						}
					
					}
				})
			},
			// 复制
			copyClick: function() {
				var _this = this;
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
							_this.moudelFalg = false
						},
						fail: function(err) {},
						complete: function(res) {}
					})
								
				}
			
			
			},
			/* 联系客服 */
			gotoTele(){
				if(!this.phone){
					uni.showToast({
						title: '用户未绑定手机号',
						icon: 'none',
						duration: 2000,
						position: 'center',
					});
					return
				}
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
	.my_vipbjC {
		width: 130upx;
		height: 30upx;
		background: url(../../static/image/icon/cjh.png) no-repeat;
		font-size: 22upx;
		background-size: 100%;
		color: #333333;
		text-align: right;
		line-height: 30upx;
		padding-right: 2%;
	}
	.my_vipbjZ {
		width: 130upx;
		height: 30upx;
		background: url(../../static/image/icon/zjh.png) no-repeat;
		font-size: 22upx;
		background-size: 100%;
		color: #333333;
		text-align: right;
		line-height: 30upx;
		padding-right: 2%;
	}
	.my_vipbjG {
		width: 130upx;
		height: 30upx;
		background: url(../../static/image/icon/gjh.png) no-repeat;
		font-size: 22upx;
		background-size: 100%;
		color: #ffe600;
		text-align: right;
		line-height: 30upx;
		padding-right: 2%;
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
	
	.product_content_block {
		background-color: #FFFFFF;
		border-radius: 20upx;
		position: absolute;
		top: 20%;
		height: 362upx;
		width: 600upx;
		margin-left: 75upx;
	}
	.moudel_content {
		height: 100%;
		width: 100%;
		position: fixed;
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 99;
		top: 0;
		left: 0;
	}
	.moudel_btns{
		width: 240upx;
		height: 78upx;
		background: #374ce5;
		border-radius: 39upx;
		line-height: 78upx;
		text-align: center;
		color: #FFFFFF;
		margin-left: 30%;
		margin-top: 30upx;
	}
</style>
