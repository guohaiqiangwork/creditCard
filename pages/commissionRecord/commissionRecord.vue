<template>
	<view>
		<view class="page_width">
			<view class="list_moudel_w">
				<view class="font_size22 font_color99">
					2020-03-24  13:00:00
				</view>
				<view class="uni-flex display_space">
					<view class="">
						佣金
					</view>
					<view class="font_size30 margin_right3">
						+10.00
					</view>
				</view>
			</view>
		</view>
		
		<view class="text_center" >
			<image src="../../static/image/noContent/noCapital.png" mode="" class="no_img"></image>
			<view class="font_size28 font_colorcc">
				暂无佣金记录~
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
	.list_moudel_w{
		height: 93upx;
		background: #ffffff;
		border-radius: 20upx;
		padding-top: 30upx;
		padding-left: 30upx;
		padding-bottom: 30upx;
		margin-top:30upx
	}
	.no_img{
		width: 402upx;
		height: 422upx;
		margin-top: 30%;
	}
</style>
