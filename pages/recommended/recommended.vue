<template>
	<view>
		<view class="recomment_moudel">
			<view class="recomment_moudel1">
				<view class="font_size22 font_color99 text_right margin_right3 margin_top3">
					2020-06-12 10:30:28
				</view>
				<view class="uni-flex">
					<view class="margin_left3">
						<image src="../../static/image/ces.png" style="width: 100upx;height: 100upx;border-radius: 50%;" mode=""></image>
					</view>
					<view class="margin_left3">
						<view class="uni-flex">
							<view class="">
								王中王
							</view>
							<view class="my_vipbj">
								普通会员
							</view>
						</view>
						<view class="font_size24">
							手机号：186****7799
						</view>
					</view>
				</view>
				<view class="uni-flex">
					<view class="list_btn1" @click="getMyQcode" >
						<image src="../../static/image/icon/wxb.png" style="width: 32upx;height: 26upx;" mode=""></image>
						<text class="margin_left2">微信聊</text>
					</view>
					<view class="list_btn2" @click="getPhone">
						<image src="../../static/image/icon/phone.png" style="width: 30upx;height: 26upx;" mode=""></image>
						<text class="margin_left2">电话聊</text>
					</view>
				</view>
				
				<view class="">
					<image src="" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	.recomment_moudel {
		background: url(../../static/image/holdAll/recommend.png) no-repeat;
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: -1;
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
