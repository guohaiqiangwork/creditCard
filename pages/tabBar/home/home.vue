<template>
	<view>
		<!-- 内容块 -->
		<view class="">
			<image src="../../../static/image/ces.png" mode="" class="top_img"></image>
			<view class="uni-flex order_moudel">
				<view class="text_center width33" @click="goToPage(item.falg)" style="margin-top: 30upx;" v-for="(item,index) in orderList" :key="index">
					<view class="">
						<image :src="item.url" mode="" :class="item.tabClass"></image>
					</view>
					<view class="font_size26 font_color33">
						{{item.name}}
					</view>
				</view>
			</view>

			<!-- 内容 -->
			<view class="moudel_width">
				<!--办卡 -->
				<view class="uni-flex" style="margin-top: 150upx;">
					<view class="">
						<image src="../../../static/image/holdAll/home1.png" mode="" class="card_img1"></image>
					</view>
					<view class="" @click="goToPage('membership')">
						<image src="../../../static/image/holdAll/home2.png" mode="" class="card_img2"></image>
					</view>
				</view>

				<!-- 资金明细 -->
				<view class="uni-flex display_space" @click="goToPage('capitalRecord')">
					<view class="font_size30 font_weight600">
						资金明细
					</view>
					<view class="font_size20 font_color66 margin_right3">
						查看明细
						<image src="../../../static/image/icon/rightf.png" class="icon_right" mode=""></image>
					</view>
				</view>

				<view class="">
					<view class="moudel_bj">
						<view class="text_center ">
							<view class=" font_size24">
								资金总额（元）
							</view>
							<view class="font_size44">
								48,000.00
							</view>
						</view>
						<view class="uni-flex">
							<view class="width50 text_center">
								<view class="font_size24">
									佣金总额（元）
								</view>
								<view class="font_size34">
									40,000.00
								</view>
							</view>
							<view class="width50 text_center">
								<view class="font_size24">
									提成总额（元）
								</view>
								<view class="font_size34">
									8,000.00
								</view>
							</view>

						</view>
					</view>
				</view>

				<!-- 排行榜 -->
				<view class="uni-flex display_space" @click="goToPage('rankingList')">
					<view class="font_size30 font_weight600">
						排行榜
					</view>
					<view class="font_size20 font_color66 margin_right3">
						查看明细
						<image src="../../../static/image/icon/rightf.png" class="icon_right" mode=""></image>
					</view>
				</view>
				<!-- 排行榜列表 -->
				<view class="">
					<view class="uni-flex border_bottom padding_bottom2 padding_top2" v-for="(item,index) in listOne" :key="index">
						<view class="width10 margin_top3">
							<image :src="'../../../static/image/holdAll/vip' + item.vip + '.png'" class="list_vip" mode=""></image>
						</view>
						<view class="width15 text_center">
							<image :src="item.imgUrl" class="list_header" mode=""></image>
						</view>
						<view class="width45">
							<view class="">
								{{item.name}}
							</view>
							<view class="">
								ID:{{item.id}}
							</view>
						</view>
						<view class="margin_top3  width30 text_right">
								<image src="../../../static/image/holdAll/goMOney.png" class="list_money" mode=""></image>
								{{item.number}}
						</view>
					</view>
			
				</view>
				
				<!-- 二维码 -->
				
				<view class="">
					<image src="../../../static/image/icon/homeE.png" mode="" class="bottom_img"></image>
				</view>

			</view>


		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderList: [{
						name: '订单查询',
						url: '../../../static/image/icon/order1.png',
						tabClass: 'order1_img',
						falg:'order'
					},
					{
						name: '新闻资讯',
						url: '../../../static/image/icon/order2.png',
						tabClass: 'order2_img',
						falg:'journalism'
					},
					{
						name: '消息中心',
						url: '../../../static/image/icon/order3.png',
						tabClass: 'order3_img',
						falg:'msg'
					}
				],

				listOne: [{
						number: '1111',
						imgUrl: '../../../static/image/ces.png',
						vip: '1',
						name: '掌声',
						id: '78687567567575'
					},
					{
						number: '333333111',
						imgUrl: '../../../static/image/ces.png',
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
				]


			}
		},
		onShow() {
			
		},
		methods: {
			goToPage(falg){
				console.log(falg)
				let urlFalg = falg
				uni.navigateTo({
					url:'../../' + urlFalg + '/' + urlFalg
				})
			}
			
		}
	}
</script>

<style lang="less">
	.top_img {
		width: 100%;
		height: 336upx;
	}

	.moudel_width {
		width: 94%;
		margin-left: 3%;
		padding-bottom: 5%;
	}

	.order_moudel {
		width: 94%;
		margin-left: 3%;
		-moz-box-shadow: 0upx 4upx 16upx 0upx #dde2ef;
		-webkit-box-shadow: 0upx 4upx 16upx 0upx #dde2ef;
		box-shadow: 0upx 4upx 16upx 0upx #dde2ef;
		height: 154upx;
		background: #ffffff;
		border-radius: 30upx;
		margin-top: -30upx;
		position: absolute;
	}

	.order1_img {
		height: 52upx;
		width: 48upx;
	}

	.order2_img {
		height: 52upx;
		width: 54upx;
	}

	.order3_img {
		height: 52upx;
		width: 55upx;
	}

	.card_img1 {
		width: 330upx;
		height: 140upx;
	}

	.card_img2 {
		width: 330upx;
		height: 140upx;
		margin-left: 30upx;
	}

	.icon_right {
		width: 8upx;
		height: 14upx;
	}

	.moudel_bj {
		width: 100%;
		height: 282upx;
		background: url(../../../static/image/holdAll/home3.png) no-repeat;
		background-size: 100%;
		color: #FFFFFF;
		padding-top: 41upx;
		margin-top: 30upx;
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
	
	.bottom_img{
		height: 140upx;
		width: 100%;
		margin-top: 40upx;
	}
</style>
