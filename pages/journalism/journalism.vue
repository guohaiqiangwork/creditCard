<template>
	<view>
		<view class="moudel_width">
			<view class="uni-flex  background_colorff border_bottom padding_top3 margin_left3" style="width: 94%;" v-for="(item,index) in [1,2,3]" :key="index">
				<view class="width75 font_size30 margin_top5">
					中疾控7万多新冠病例分析：八成轻中症，死亡率男比女高
				</view>
				<view class="width25 text_right">
					<image src="../../static/image/ces.png" mode="" class="img_width"></image>
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
	page{
		background-color: #f8f9fc;
	}
	.moudel_width {
		width: 100%;
		background-color: #FFFFFF;
	}

	.img_width {
		width: 160upx;
		height: 160upx;
		border-radius: 10upx;
	}
</style>
