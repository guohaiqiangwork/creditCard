<template>
	<view class="">

		<view class="background_colorff">


			<!-- 搜索框 -->
			<view class="uni-flex background_colorff padding_top3">
				<view class="margin_left3">
					团队(99)
				</view>
				<view class="uni-flex searce_moudel">
					<view class="searce_left">
						<image src="../../../static/image/icon/searce.png" class="searce_width" mode=""></image>
					</view>
					<view class="searce_right">
						<input class="width90" maxlength="10" placeholder="输入需要查找的名称或手机号" confirm-type='搜索' type="text" @confirm='Search'
						 placeholder-style='color:#cccccc' />
					</view>
				</view>
			</view>

			<!-- tab -->
			<view class="background_colorff border_bottom">
				<view class="item_tab" v-for="(item,index) in tabList" :key="index" @click="tabSwitch(index)" :style="tabIndex == index ?'color:#374CE5' :'' ">
					{{item.name}}
				</view>
			</view>

			<view class="font_size28 margin_left3 padding_top3 padding_bottom2">
				团队人数：2人
			</view>
		</view>
		<!-- list -->
		<view class="page_width">
			<view class="list_moudel">
				<view class="text_right font_size22 font_colorcc margin_right3 padding_top2">
					2020-06-12 10:30:28
				</view>
				<view class="uni-flex margin_left3 margin_top3">
					<view class="width20 margin_top3">
						<image src="../../../static/image/ces.png" class="img_heard" mode=""></image>
					</view>
					<view class="width60">
						<view class="uni-flex">
							<view class="font_size30">
								打投
							</view>
							<view class="">
								<view class="my_vipbj">
									普通会员
								</view>
							</view>
						</view>
						<view class="uni-flex">
							<view class="font_size24">
								微信号：gudh448890
							</view>
							<view class="font_size22 margin_left3" style="color: #374CE5;">
								<image src="../../../static/image/icon/copy.png" mode="" class="list_img2"></image>
								复制
							</view>
						</view>
						<view class="uni-flex" @click="getPhone">
							<view class="font_size24">
								手机号：15578980909
							</view>
							<view class="font_size22 margin_left3" style="color: #374CE5;">
								<image src="../../../static/image/icon/dianhua.png" mode="" class="list_img2"></image>
								立即拨打
							</view>
						</view>
					</view>
		
					<view class="width20 text_center"  @click="getMyQcode">
						<image src="../../../static/image/icon/erCode.png" style="width: 34upx;height: 34upx;" mode=""></image>
					</view>
				
				</view>
				<!-- <view class="uni-flex">
					<view class="list_btn1" @click="getMyQcode">
						<image src="../../../static/image/icon/qcode.png" style="width: 25upx;height: 25upx;" mode=""></image>
						<text class="margin_left2">二维码</text>

					</view>
					<view class="list_btn2" @click="getPhone">
						<image src="../../../static/image/icon/phone.png" style="width: 30upx;height: 26upx;" mode=""></image>
						<text class="margin_left2">电话</text>
					</view>
				</view> -->
			</view>

		</view>

		<!-- 我的二维码 -->
		<template v-if="myQF">
			<view class="moudel_content">
				<view class="pay_result_moudel">
					<view class="text_center">
						<template>
							<image src="../../../static/image/ces.png" style="width: 305upx;height: 644upx;margin-top: 30upx;" mode=""></image>
							<view class="font_size30 font_color99">
								长按识别二维码添加好友
							</view>
						</template>

						<template>
							<image src="../../../static/image/noContent/noQcode.png" style="width: 402upx;height: 422upx;" mode=""></image>
							<view class="font_size30 font_color99">暂未上传二维码</view>
						</template>

					</view>
					<view class="page_width moudel_btn" @click="colseMyQcode">
						保存图片
					</view>
				</view>
			</view>
		</template>


		<!-- 没有电话提示 -->
		<template v-if="noPhone">
			<view class="moudel_content">
				<view class="phone_moudel">
					<view class="font_size34">
						提示
					</view>
					<view class="font_size30">
						推荐人暂未绑定手机号码！
					</view>
					<view class="phone_btn">
						确定
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
				tabList: [{
						name: '直推'
					},
					{
						name: '非直推'
					}

				],
				tabIndex: 0,
				myQF: false,
				noPhone: false
			}
		},
		onLoad() {

		},
		methods: {
			tabSwitch(index) {
				this.tabIndex = index
			},
			// 我的二维码
			getMyQcode() {
				this.myQF = true;
				uni.hideTabBar(); //隐藏tab
			},
			colseMyQcode() {
				this.myQF = false;
				uni.showTabBar(); //显示tab
			},

			// 没有电话提示
			getPhone() {
				this.noPhone = true;
				uni.hideTabBar(); //隐藏tab
			},
			closePhone() {
				this.noPhone = false;
				uni.showTabBar(); //显示tab
			}
		}
	}
</script>

<style lang="scss">
	// 搜索框
	.searce_moudel {
		width: 75%;
		margin-left: 3%;
		// margin-top: 3%;
		-moz-box-shadow: 0px 5px 5px #CCCCCC;
		-webkit-box-shadow: 0px 0px 5px #CCCCCC;
		box-shadow: 0px 0px 5px #CCCCCC;
		height: 66upx;
		border-radius: 40upx;
		line-height: 66upx;
	}

	.searce_left {
		width: 5%;
		margin-left: 2%;
		margin-top: 1%;

	}

	.searce_right {
		margin-top: 1%;
		margin-left: 2%;
		width: 90%;
	}

	.searce_width {
		width: 29upx;
		height: 27upx;
		margin-top: 1%;
	}


	.item_tab {
		display: inline-block;
		width: 50%;
		text-align: center;
		color: #999999;
		font-size: 28upx;
		height: 88upx;
		line-height: 88upx;
	}


	.list_moudel {
		width: 94%;
		margin-top: 30upx;
		margin-left: 3%;
		border-radius: 30upx;
		box-shadow: 0pt 4upx 16upx 0upx #dde2ef;
		// padding: 3%;
		height: 246upx;
	}

	.img_heard {
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
	}

	.list_img1 {
		width: 140upx;
		height: 30upx;
	}

	.list_img2 {
		width: 21upx;
		height: 21upx;
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


	.moudel_content {
		height: 100%;
		width: 100%;
		position: fixed;
		background-color: $uni-bg-color-mask;
		z-index: 99;
		top: 0;
		left: 0;
	}

	.pay_result_moudel {
		background-color: #FFFFFF;
		border-top-left-radius: 68upx;
		border-top-right-radius: 68upx;
		position: absolute;
		bottom: 0%;
		width: 100%;
		height: 900upx;
	}

	.moudel_btn {
		background-color: #374CE5;
		height: 90upx;
		line-height: 90upx;
		text-align: center;
		border-radius: 50upx;
		color: #FFFFFF;
		font-size: 30upx;
		margin-top: 20upx;
	}

	.phone_moudel {
		background-color: #FFFFFF;
		border-radius: 30upx;
		position: absolute;
		top: 30%;
		width: 600upx;
		margin-left: 75upx;
		text-align: center;
		height: 350upx;
	}

	.phone_btn {
		width: 220upx;
		height: 78upx;
		line-height: 78upx;
		text-align: center;
		background-color: #374CE5;
		color: #FFFFFF;
		border-radius: 50upx;
	}
	
	
	.my_vipbj {
		width: 130upx;
		height: 30upx;
		background: url(../../../static/image/icon/vipb.png) no-repeat;
		font-size: 22upx;
		background-size: 100%;
		color: #FFE600;
		text-align: right;
		line-height: 30upx;
		margin-top: 10upx;
		margin-left: 10upx;
		padding-right: 1%;
	}
</style>
