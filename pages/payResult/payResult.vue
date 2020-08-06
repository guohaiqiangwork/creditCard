<template>
	<view>
		<view class="payR_moudel">
			<block v-if="payMoudelF.isYes == 1">
				<view class="text_center"><image src="../../static/image/icon/payR.png" class="payR_img" mode=""></image></view>
				<view class="text_center font_size32">支付成功</view>
			</block>
			<block v-if="payMoudelF.isYes == 0">
				<view class="text_center"><image src="../../static/image/icon/payR1.png" class="payR_img" mode=""></image></view>
				<view class="text_center font_size32">支付失败</view>
			</block>

			<view class="uni-flex margin_left3 margin_top8">
				<view class="font_size30 font_color66">支付金额</view>
				<view class="font_size30 font_color33 margin_left3">￥{{ payMoudelF.je }}</view>
			</view>
			<view class="uni-flex margin_left3 margin_top3">
				<view class="font_size30 font_color66">支付方式</view>
				<view class="font_size30 font_color33 margin_left3">余额</view>
			</view>
			<view class="uni-flex margin_left3 margin_top3">
				<view class="font_size30 font_color66">订单编号</view>
				<view class="font_size30 font_color33 margin_left3">{{ payMoudelF.orderId }}</view>
			</view>
		</view>
		
		<view class="bottom_btn" @click="goHome" v-if="payMoudelF.isYes == 1">完成</view>
		<view class="bottom_btn" @click="goBack" v-if="payMoudelF.isYes == 0">重新支付</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad(e) {
		console.log(JSON.parse(e.payFlag));
		this.payMoudelF = JSON.parse(e.payFlag);
	},
	methods: {
		goHome: function() {
			uni.switchTab({
				url: '../tabBar/home/home'
			});
		},
		goBack:function(){
			uni.navigateBack()
		}
	}
};
</script>

<style>
.payR_moudel {
	width: 690upx;
	height: 500upx;
	background: #ffffff;
	border-radius: 20upx;
	margin-left: 30upx;
	padding-top: 60upx;
	margin-top: 30upx;
}

.payR_img {
	width: 160upx;
	height: 146upx;
}

.bottom_btn {
	width: 94%;
	margin-left: 3%;
	height: 88upx;
	background: #374ce5;
	border-radius: 44upx;
	text-align: center;
	line-height: 88upx;
	color: #ffffff;
	position: fixed;
	bottom: 3%;
}
</style>
