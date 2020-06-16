<template>
	<view>
		<view class="page_width">
			<view class="with_moudel">
				<view class="font_size30 border_bottom padding_bottom3 padding_top3">
					您还没有绑定微信
					<text class="margin_left3" style="color: #374CE5;">去绑定</text>
					<image src="../../static/image/icon/rightb.png" class="margin_left2" style="width: 8upx;height: 14upx;margin-top: 20upx;" mode=""></image>
				</view>
				
				<view class="font_size30 border_bottom padding_bottom3 padding_top3" v-if="false">
					微信账号：
					<text class="margin_left3">hkjhkhkhkjh</text>
				</view>
				
				<view class="border_bottom margin_top3">
					<view class="font_size30">
						提现金额
					</view>
					<view class="uni-flex font_size50">
						<view class="font_size50 width10">
							¥
						</view>
						<view class="width80 margin_left3" style="margin-top: 24upx;">
							<input type="text" placeholder="请输入提现金额" value="0" />
						</view>
					</view>
				</view>
				
				<view class="margin_top3">
					<text class="font_size26 font_color99 margin_right3">余额￥4,000.00</text>
					 全部提现
				</view>
				
				<view class="tx_btn">
					提现
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

<style lang="less">
	.with_moudel {
		
		height: 490upx;
		background: #ffffff;
		border-radius: 20upx;
		margin-top: 5%;
		padding: 30upx;
	}
	.tx_btn{
		width: 614upx;
		height: 90upx;
		color: #FFFFFF;
		text-align: center;
		font-size: 30upx;
		line-height: 90upx;
		background-color: #374CE5;
		border-radius: 50upx;
		margin-top: 70upx;
	}
</style>
