<template>
	<view>
		<view class="page_width">
			<view class="list_moudel" v-if="list.length  > 0" v-for="(item,index) in list" :key="index">
				<view class="font_size22 font_color99 margin_left3">
					2020-03-24 13:00:00
				</view>
				<view class="uni-flex margin_left3 display_space">
					<view class="font_size26">
						佣金
					</view>
					<view class="font_size30 margin_right3">
						+10.00
					</view>
				</view>
			</view>
		</view>
		
		<!-- 缺省页面 -->
		<view class="text_center" v-if="list.length  == 0">
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
				list:[1,2,3]
			}
		},
		methods: {

		}
	}
</script>

<style lang="less">
	page {
		background-color: #EEEEEE;
	}

	.list_moudel {
		background-color: #FFFFFF;
		border-radius: 20upx;
		height: 93upx;
		padding-top: 20upx;
		padding-bottom: 20upx;
		margin-top: 20upx;
	}
	.no_img{
		width: 402upx;
		height: 422upx;
		margin-top: 30%;
	}
</style>
