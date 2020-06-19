<template>
	<view class="header">
		<view class="h_top"></view>
		<view class="h_main display_space">
			<!-- log -->
			<view class="margin_left3" v-if="leftFalg">
				<image src="http://xypay.expresslines.cn/images/sysImage/logo.jpg" mode="" style="width: 56upx;height: 56upx;"></image>
			</view>
			<view class="margin_left3" v-if="!leftFalg" @click="goBack">
				<image src="../../static/image/icon/left.png" mode="" style="width: 16upx;height: 28upx;"></image>
			</view>
			<!-- 标题 -->
			<view class="" v-if="titleFalg">
				<text>{{title}}</text>
			</view>
			<!-- 右边消息 -->
			<view class="margin_right3" v-if="rightFalg">
				<view class="msg" @click="msg">
					<image src="../static/image/icon/msg.png" mode="" style="height:45upx;width:45upx"></image>
				</view>
				<!--  -->
				<view class="dian" v-if="orangeD!=0">●</text>
				</view>
			</view>
			<view class="margin_right3" v-if="!rightFalg">
			
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text: ''
			}
		},
		computed: {
			orangeD: function() { //状态管理中state数据实时展示在本页面
				return this.$store.state.orangeD;
			},
			titleFalg: function() {
				return this.$store.state.titleFalg;
			},
			title: function() { //状态管理中state数据实时展示在本页面
				return this.$store.state.title;
			},
			rightFalg:function(){
				return this.$store.state.rightFalg;
			},
			leftFalg:function(){
				return this.$store.state.leftFalg;
			}
		},
		// onShow() {
		// 	uni.showToast({
		// 		title: '消息通知',
		// 		icon:'none', 
		// 		duration: 1500,
		// 		position:'top'
		// 	});
		// },
		methods: {
			msg(e) {
				uni.navigateTo({
					url: "../../pages/msg/msg"
				})

			},
			
			// 返回上一个页面
			goBack(){
				uni.navigateBack();
			}
		}
	}
</script>

<style>
	/* 自定义头部标题 */
	.header {
		position: fixed;
		width: 100%;
		top: 0;
		/* left: 3%; */
		z-index: 999;
	}

	.h_top {
		height: 60upx;
		width: 100%;
		background: #FFFFFF;
	}

	.h_main {
		height: 60upx;
		line-height: 60upx;
		width: 100%;
		background: #FFFFFF;
		text-align: center;
		color: #3A3B41;
		font-size: 34upx;
		position: relative;
		display: flex;
		border-bottom: 1px solid #CCCCCC;

	}

	.msg {
		/* position: absolute; */
		/* left: 28upx; */
		/* top: 7%; */
	}

	.dian {
		position: absolute;
		/* left: 64upx; */
		top: -20%;
		right: 8%;
		color: #00A398;
		font-size: 20upx;

	}
</style>
