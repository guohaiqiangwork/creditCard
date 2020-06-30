<template>
	<view>
		<view class="moudel_result">
			<view class="text_center">
				<image src="../../static/image/holdAll/suree.png" class="img_top" mode=""></image>
			</view>
			<view class="font_size32 text_center">
				提现受理中
			</view>
			<view class="uni-flex font_size30 margin_left3 margin_top5 padding_top2 padding_bottom2">
				<view class="font_color66 width30">
					提现金额
				</view>
				<view class="">
					￥{{dataMoudel.amount}}
				</view>
			</view>
			<view class="uni-flex font_size30 margin_left3 padding_top2 padding_bottom2 ">
				<view class="font_color66 width30">
					实际到账金额
				</view>
				<view class="">
					￥{{dataMoudel.actualAmount}}
				</view>
			</view>
			<view class="uni-flex font_size30 margin_left3 padding_top2 padding_bottom2">
				<view class="font_color66 width30">
					到账微信号
				</view>
				<view class="">
					￥{{dataMoudel.wxNumber}}
				</view>
			</view>
			<view class="uni-flex font_size30 margin_left3 padding_top2 padding_bottom2">
				<view class="font_color66 width30">
					提现时间
				</view>
				<view class="">
					￥{{dataMoudel.createTime}}
				</view>
			</view>
		</view>
	
		<view class="bottom_btn" @click="gomy">
			完成
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataMoudel:''
			}
		},
		onLoad(e) {
			console.log()
			this.dataMoudel = JSON.parse( e.tixiD);
		},
		methods: {
			gomy(){
				uni.switchTab({
					url: '/pages/tabBar/my/my'
				});
			}
		}
	}
</script>

<style>
	.moudel_result{
		width: 690upx;
		height: 600upx;
		background: #ffffff;
		border-radius: 20upx;
		margin-left: 30upx;
		margin-top: 30upx;
		padding-top: 30upx;
	}
	.img_top{
		width: 138upx;
		height: 138upx;
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
</style>
