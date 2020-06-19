<template>
	<view>
		<view class="page_width">
			<view class="wech_moudel uni-flex">
				<view class="width15 text_center margin_top2">
					<image src="../../static/image/icon/weix.png" style="width: 37upx;height: 30upx;" mode=""></image>
				</view>
				<view class="font_size30 font_colorff width20">
					微信账号
				</view>
				<view class="margin_left3  font_colorcc">
					<input type="text" value="" placeholder="请输入您的微信号" placeholder-style="color:#cccccc" />
				</view>
			</view>
			
			
			<view class="wech_moudel_two">
				<view class="uni-flex">
					<view class="font_colorff font_size30">
						微信二维码
					</view>
					<view class="margin_left5">
						<image src="../../static/image/holdAll/up.png" style="width: 327upx;height: 424upx;" mode=""></image>
					</view>
				</view>
			</view>
			
			<view class="text_center font_size28 margin_top3" style="color: #CFDBFF; width: 70%;margin-left: 15%;">
				温馨提示:请输入正确的微信账号，方便推荐
				人与团队的联系！
			</view>
			
			<view class="bottom_btn_wech">
				确定
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

<style lang="less">
	page{
		background: #292E3E;
	}
	.wech_moudel{
		background: #3f4760;
		border-radius: 20upx;
		padding: 30upx;
		align-items: center;
		margin-top: 30upx;
	}
	.wech_moudel_two{
		padding: 30upx;
		background: #3f4760;
		border-radius: 20upx;
		margin-top: 30upx;
	}
	.bottom_btn_wech{
		height: 90upx;
		line-height: 90upx;
		text-align: center;
		font-size: 30upx;
		color: #FFFFFF;
		border-radius: 50upx;
		background: #374ce5;
		border-radius: 45upx;
		position: absolute;
		width: 94%;
		bottom: 5%;
	}
</style>

