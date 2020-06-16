<template>
	<view>

		<!-- 背景图 -->
		<view class="moudel_bj_top ">
			<view class="font_size20" style="padding-top: 300upx;">
				您本月未上榜哦，多多加油吧~
			</view>
		</view>
		<!-- tab列表 -->
		<view class="uni-flex tab_list">
			<view class="width50 text_center item_list_left" @click="tabSwitch('0')" :class="tabIndex == 0 ?'tab_active' :''">
				月度收入排行
			</view>
			<view class="width50 text_center item_list_right" @click="tabSwitch('1')" :class="tabIndex == 1 ?'tab_active1' :''">
				月发展会员排行
			</view>
		</view>

		<view class="rank_moudel">
			<view class="uni-flex border_bottom padding_bottom2 padding_top2" v-for="(item,index) in listOne" :key="index">
				<view class="width10 margin_top3">
					<image :src="'../../static/image/holdAll/vip' + item.vip + '.png'" class="list_vip" mode=""></image>
				</view>
				<view class="width15 text_center">
					<image :src="item.imgUrl" class="list_header" mode=""></image>
				</view>
				<view class="width45 margin_top3">
						{{item.name}}
				</view>
				<view class="margin_top3  width30 text_right">
					<image src="../../static/image/holdAll/goMOney.png" class="list_money" mode=""></image>
					{{item.number}}
				</view>
			</view>


		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList: [{
						name: '月度收入排行'

					},
					{
						name: '月发展会员排行'
					}
				],
				listOne: [{
						number: '1111',
						imgUrl: '../../static/image/ces.png',
						vip: '1',
						name: '掌声',
						id: '78687567567575'
					},
					{
						number: '333333111',
						imgUrl: '../../static/image/ces.png',
						vip: '2',
						name: '掌用户声',
						id: '78687567567575'
					},
					{
						number: '1',
						imgUrl: '../../../static/image/ces.png',
						vip: '3',
						name: '用户1',
						id: '78687567567575'
					}
				],
				tabIndex: 0

			}
		},
		methods: {
			tabSwitch(index) {
				this.tabIndex = index
			}
		}
	}
</script>

<style lang="less">
	.moudel_bj_top {
		width: 100%;
		height: 420upx;
		background: url(../../static/image/holdAll/rank.png) no-repeat;
		background-size: 100%;
		text-align: center;
		color: #FFFFFF;
	}

	.tab_list {
		align-items: center;
		color: #374CE5;
		font-size: 28upx;
	}

	.item_list_left {
		height: 88upx;
		line-height: 88upx;
		background-color: #FFFFFF;
		margin-top: -40upx;
		border-top-left-radius: 50upx;
	}

	.item_list_right {
		height: 88upx;
		line-height: 88upx;
		background-color: #FFFFFF;
		margin-top: -40upx;
		border-top-right-radius: 50upx;
	}
	.tab_active{
		background-color: #F8F9FC !important;
		color: #999999 !important;
		border-bottom-right-radius: 50upx;
	}
	.tab_active1{
		background-color: #F8F9FC !important;
		color: #999999 !important;
		border-bottom-left-radius: 50upx;
	}
	.rank_moudel {
		background-color: #FFFFFF;
		width: 94%;
		margin-left: 3%;
	}



	.list_vip {
		width: 43upx;
		height: 32upx;
	}

	.list_header {
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
	}

	.list_money {
		width: 24upx;
		height: 24upx;
		margin-right: 3%;
	}
</style>
