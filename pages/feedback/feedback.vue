<template>
	<view>
		<view class="page_width">

			<view class="list_one uni-flex">
				<view class="font_size28">
					常见问题：
				</view>
				<view class="">

				</view>
			</view>

			<view class="list_one">
				<view class="font_size28">
					详细问题及意见
				</view>
				<view class="margin_top3">
					<textarea value="" placeholder="请输入您的建议及意见" class="list_two_t" />
					</view>
			</view>
			
			<view class="list_one ">
				<view class="font_size28">
					请提供相关问题的图片（可选）
				</view>
				
				<view class="margin_top3">
					<image src="../../static/image/holdAll/feedImg.png" style="width: 162upx;height: 162upx;" mode=""></image>
				</view>
			</view>
			
			<view class="bottom_btn_wech">
				提交
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
	.list_one{
		padding: 20upx;
		background: #ffffff;
		border-radius: 20upx;
		margin-top: 30upx;
	}

	.list_two_t{
		height: 200upx;
		border: 1px solid #EEEEEE;
		border-radius: 20upx;
		font-size: 26upx;
		color: #CCCCCC;
		padding-top: 20upx;
		padding-left: 20upx;
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
