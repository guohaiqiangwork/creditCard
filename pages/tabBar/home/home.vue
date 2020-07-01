<template>
	<view>
		<!-- 内容块 -->
		<view class="">
			<!-- 绑定 跳转-->
			<!-- <image src="../../../static/image/ces.png" mode="" class="top_img"  @click="goToPage('bindingIdentity')"></image> -->
			<view class="">
				<swiper class="imageContainer" @change="handleChange" circular autoplay>
					<block v-for="(item,index) in imgList" :key="index">
						<swiper-item @click="swiperClick(item.id)">
							<image class="itemImg" :src="item.banner" lazy-load mode="scaleToFill"></image>
						</swiper-item>
					</block>
				</swiper>
			</view>

			<!-- 操作栏 -->
			<view class="uni-flex order_moudel">
				<view class="text_center width33" @click="goToPage(item.falg)" style="margin-top: 30upx;" v-for="(item,index) in orderList"
				 :key="index">
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
				<view class="uni-flex">
					<view class=""  @click="goToUrl">
						<image src="../../../static/image/holdAll/home1.png" mode="" class="card_img1"></image>
					</view>
					<view class="" @click="goToPage('membership')">
						<image src="../../../static/image/holdAll/home2.png" mode="" class="card_img2"></image>
					</view>
				</view>

				<!-- 会员升级 -->
				<view class="memberMoudel">
					<!-- 公告栏 -->
					<view class="uni-flex gong_g_m">
						<view class="img_cnter">
							<image src="../../../static/image/icon/notice.png" style="width: 42upx;height: 33upx;" mode=""></image>
						</view>
						<!-- 公告内容 -->
						<view class="uni-swiper-msg margin_left2">
							<swiper class="swiper" vertical="true" autoplay="false" duration="500" interval="4000">
								<swiper-item v-for="(item, index) in msg" :key="index" class="swiper_item_font">
									<view>{{item.content}}</view>
								</swiper-item>
							</swiper>
						</view>
					</view>
					<!-- 公告栏end -->

					<view class="uni-flex text_center margin_top3 ">
						<view class="width33 border_right">
							<view class="font_size26 font_color33">
								初级会员
							</view>
							<view class="margin_top3u">
								<image src="../../../static/image/icon/homev1.png" class="vip_img" mode=""></image>
							</view>
							<view class="font_size26 font_color37">
								<text class="font_size50">{{LevelNum.two}}</text>
								人
							</view>
						</view>
						<view class="width33 border_right">
							<view class="font_size26 font_color33">
								中级会员
							</view>
							<view class="margin_top3u">
								<image src="../../../static/image/icon/homev2.png" class="vip_img" mode=""></image>
							</view>
							<view class="font_size26 font_color37">
								<text class="font_size50">{{LevelNum.three}}</text>
								人
							</view>
						</view>
						<view class="width33 border_right">
							<view class="font_size26 font_color33">
								高级会员
							</view>
							<view class="margin_top3u">
								<image src="../../../static/image/icon/homev3.png" class="vip_img" mode=""></image>
							</view>
							<view class="font_size26 font_color37">
								<text class="font_size50">{{LevelNum.four}}</text>
								人
							</view>
						</view>
					</view>
				</view>

				<!-- 资金明细 -->
				<view class="uni-flex display_space margin_top3" @click="goToPage('capitalRecord')">
					<view class="font_size30 font_weight600">
						资金明细
					</view>
					<view class="font_size20 font_color66 margin_right3">
						查看明细
						<image src="../../../static/image/icon/rightf.png" class="icon_right" mode=""></image>
					</view>
				</view>
				<view class="">
					<view class="moudel_bj" @click="goToPage('capitalRecord')">
						<view class="text_center ">
							<view class=" font_size24">
								累计收益（元）
							</view>
							<view class="font_size44">
								{{funds.totalIncomeAmount}}
							</view>
						</view>
						<view class="uni-flex">
							<view class="width50 text_center" @click="goToPage('commissionRecord')">
								<view class="font_size24">
									佣金总额（元）
								</view>
								<view class="font_size34">
									{{funds.commissionAmount}}
								</view>
							</view>
							<view class="width50 text_center" @click="goToPage('tcRecord')">
								<view class="font_size24">
									提成总额（元）
								</view>
								<view class="font_size34">
									{{funds.deductAmount}}
								</view>
							</view>

						</view>
					</view>
				</view>



				<!-- 二维码 -->

				<view class="" @click="onClick">
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
				LevelNum: '', //会员人数
				imgList: [],
				orderList: [
					
					{
						name: '申请进度查询',
						url: '../../../static/image/icon/order1.png',
						tabClass: 'order1_img',
						falg: 'order'
					},
					{
						name: '办卡指南',
						url: '../../../static/image/icon/new.png',
						tabClass: 'order1_img',
						falg: 'cardGuide'
					},

					{
						name: '消息中心',
						url: '../../../static/image/icon/order2.png',
						tabClass: 'order3_img',
						falg: 'msg'
					}
				],

				msg: '', //滚动消息
				funds: '' //资金明细

			}
		},
		onShow() {
			uni.setStorageSync('memberId', '1');
			this.init()
		},
		methods: {
			// 轮播滑动操作
			handleChange(e) {
				this.currentIndex = e.detail.current;
			},
			// 点击轮播操做
			swiperClick(e) {
				console.log(e);

				// uni.navigateTo({
				// 	url: '../../bindingIdentity/bindingIdentity'
				// })
				uni.navigateTo({
					url: '../../lunBDetails/lunBDetails?id= ' + e
				})
			},
			init() {
				// 获取首页轮播
				this.$http.get('/bannerApi/banner').then(res => {
					console.log('7')
					if (res.data.code == 200) {
						this.imgList = res.data.data
					}
				})
				//获取滚动公告
				this.$http.get('/buyLevelApi/getLevelNum').then(res => {
					if (res.data.code == 200) {
						this.msg = res.data.data
					}
				})
				//获取会员人数
				this.$http.get('/mb/getLevelNum').then(res => {
					if (res.data.code == 200) {
						this.LevelNum = res.data.data[0]
					}
				})
				// 获取查询首页用资金明细
				var data = {
					memberId: uni.getStorageSync('memberId')
				}
				this.$http.get('/acc/funds/' + data.memberId, ).then(res => {
					console.log(JSON.stringify(res));
					if (res.data.code == 200) {
						this.funds = res.data.data
					}
				}).catch(err => {

				});
				// 申请信用卡地址
				var dataone = {
					memberId: uni.getStorageSync('memberId')
				}
				this.$http.get('/apply/applyCreditCardView',dataone ).then(res => {
					console.log(JSON.stringify(res));
					if (res.data.code == 200) {
						this.xinCardUrl = res.data.data;
						console.log(this.xinCardUrl)
					}
				}).catch(err => {
				
				});
				
				// 订单
				this.$http.get('/apply/queryOrder',dataone ).then(res => {
					console.log(JSON.stringify(res));
					if (res.data.code == 200) {
						this.orderUrl = res.data.data;
						console.log(this.orderUrl)
					}
				}).catch(err => {
				
				});
			},


			// 去申请信息卡
			goToUrl(){
				window.open(this.xinCardUrl)
			},
			goToPage(falg) {
				console.log(falg)
				let urlFalg = falg
				if(urlFalg == 'order'){
					window.open(this.orderUrl)
				}else{
					uni.navigateTo({
						url: '../../' + urlFalg + '/' + urlFalg
					})
				}
				
			},
			// 复制
			onClick() {
				uni.setClipboardData({
					data: '文的发生字',
					success: function(data) {},
					fail: function(err) {},
					complete: function(res) {}
				})
			}



		}
	}
</script>

<style lang="less">
	.moudel_width {
		width: 94%;
		margin-left: 3%;
		padding-bottom: 5%;
	}

	.memberMoudel {
		width: 94%;
		margin-left: 3%;
		padding-top: 30upx;
		height: 344upx;
		background: #ffffff;
		border-radius: 30upx;
		box-shadow: 0upx 4upx 16upx 0upx #dde2ef;
		margin-top: 20upx;
	}

	.order_moudel {
		width: 100%;
		padding-top: 20upx;
		padding-bottom: 20upx;
		background: #ffffff;
		// border-radius: 30upx;
		// margin-top: -30upx;
		// position: absolute;
		// margin-left: 3%;
		// -moz-box-shadow: 0upx 4upx 16upx 0upx #dde2ef;
		// -webkit-box-shadow: 0upx 4upx 16upx 0upx #dde2ef;
		// box-shadow: 0upx 4upx 16upx 0upx #dde2ef;
		// height: 154upx;
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

	.bottom_img {
		height: 140upx;
		width: 100%;
		margin-top: 40upx;
	}

	.my_vipbj {
		width: 130upx;
		height: 30upx;
		background: url(../../../static/image/icon/vipb.png) no-repeat;
		font-size: 22upx;
		background-size: 100%;
		color: #FFE600;
		text-align: right;
		line-height: 30upx;
		margin-top: 10upx;
		margin-left: 10upx;
		padding-right: 1%;
	}




	// 轮播
	.imageContainer {
		width: 100%;
		height: 300upx;
	}

	.itemImg {
		width: 100%;
		height: 300upx;
	}

	// 公告
	.gong_g_m {
		background: #FFFFFF;
		height: 70upx !important;
		margin-left: 20upx;
		border-bottom: 1px solid #EEEEEE;
		width: 94%;
	}

	.img_cnter {
		text-align: center;
		height: 40upx;
		width: 20%;
		margin-top: 2%;
		border-right: 1px solid #EBEBEB;
	}

	.swiper_item_font {
		color: #333333;
		font-size: 26upx;
		margin-left: 2%;
	}

	.vip_img {
		width: 48upx;
		height: 44upx;
	}
</style>
