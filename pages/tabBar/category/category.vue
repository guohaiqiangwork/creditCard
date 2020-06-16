<template>
	<view>

		<view class="page_width">
			<view class="" v-for="(item,index) in listTab" :key="index">
				<view class="uni-flex display_space background_colorff list_one" @click="tabSwicth(index)" :class="item.tabIndex  ? 'list_one_active' : ''">
					<view class="font_size30 margin_left3">
						直推信用卡注意事项{{item.tabIndex}}
					</view>
					<view class="margin_right3" v-if="item.tabIndex">
						<image src="../../../static/image/icon/down.png" class="right_img" mode=""></image>
					</view>
					<view class="margin_right3" v-else>
						<image src="../../../static/image/icon/up.png" class="right_img" mode=""></image>
					</view>
				</view>
				<view v-if="item.tabIndex" class="background_colorff font_size26 list_one_conter" style="padding: 3%;">
					1.付费升级为专员，将享受到专员权限，如分佣与提成，直推信用卡、贷款和发展专员都会获得丰厚的回报。
					2.在卡通网单纯的办理信用卡的行为不需要升级为专员也是可以办理的。
					3.198元付费升级的退款是有退款规则的，满足条件才能触发退款的操作。
				</view>
			</view>




		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				// tabIndex: 0,
				listTab: [
					{
					 name:'1',
					 tabIndex:true
					},
					{
					name:'1',
					 tabIndex:false
					},
					{
					name:'1',
					tabIndex:false
					}, {
					name:'1',
					tabIndex:false
					}
				]
			}
		},
		methods: {
			tabSwicth(index) {
				console.log(index)
				// for(let item of this.listTab){
				// 	item.tabIndex = false
				// }
				this.listTab[index].tabIndex = !this.listTab[index].tabIndex
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #f8f9fc;
	}

	.list_one {
		height: 100upx;
		line-height: 100upx;
		align-items: center;
		border-radius: 20upx;
		margin-top: 30upx;
	}

	.list_one_active {
		border-bottom-left-radius: 0 !important;
		border-bottom-right-radius: 0 !important;
	}

	.list_one_conter {}

	.right_img {
		width: 28upx;
		height: 16upx;
	}
</style>
