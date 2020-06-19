<template>
	<view>
		<view class="my_moudel_bj">
			<view class="page_width">
				<view class="uni-flex margin_left1">
					<view class="uni-flex width70">
						<view class="font_size40">
							Hi~ 王大锤
						</view>
						<view class="my_vipbj">
							普通会员
						</view>
					</view>

					<view class="text_right width25">
						<image src="../../../static/image/holdAll/myQcode.png" style="width: 40upx;height: 40upx;" mode=""></image>
					</view>
				</view>

				<view class="uni-flex margin_top2 margin_left1">
					<view class="width20">
						<image src="../../../static/image/ces.png" class="my_img" mode=""></image>
					</view>
					<view class="margin_left2 width50">
						<view class="font_size20">
							累计收益
						</view>
						<view class="font_size50">
							80,000.00
						</view>
					</view>
				</view>


				<view class="margin_left3 margin_top3">
					<view class="uni-flex">
						<view class="width50 text_center" style="border-right: 1px solid #EEEEEE;">
							<view class="font_size24">
								佣金总额（元）
							</view>
							<view class="font_size36">
								3,000.00
							</view>
						</view>
						<view class="width50 text_center">
							<view class="font_size24">
								提成总额（元）
							</view>
							<view class="font_size36">
								3,000.00
							</view>
						</view>
					</view>
					<view class="uni-flex margin_top2 font_colorff">
						<view class="uni-flex width55 margin_left5">
							<view class="font_size24" style="margin-top: 20upx;">
								我的余额
							</view>
							<view class="font_size50 margin_left2">
								80,000.00
							</view>
						</view>
						<view class="my_btn">
							立即提现
						</view>
					</view>
					
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
					
				</view>

			</view>
		</view>
		
		
		<!-- 功能列表 -->
		<view class="page_width">
			<view class="moudel_list_tab">
				<view class="font_size28">
					我的服务
				</view>
				<view class="uni-flex padding_top3 padding_bottom3 border_bottom" v-for="(item,index) in tabList" :key="index" @click="goToPage(item.urlFalg)">
					<view class="width10">
						<image :src="item.url" :class="item.img_class" style="margin-top: 1%;" mode=""></image>
					</view>
					<view class="width70 margin_left2" style="margin-top: -1%;">
						{{item.name}}
					</view>
					<view class="width20 text_right">
						<image src="../../../static/image/icon/rightc.png" style="width: 16upx;height: 26upx;" mode=""></image>
					</view>
				</view>
				
				<view class="uni-flex padding_top3 padding_bottom3 border_bottom">
					<view class="width10">
						<image src="../../../static/image/icon/my7.png"  style="margin-top: 1%;width: 33upx;height: 31upx;" mode=""></image>
					</view>
					<view class="width30 margin_left2" style="margin-top: -1%;">
						客服电话
					</view>
					<view class="width60 text_right ">
						0472-4854-3939
						<image src="../../../static/image/icon/rightc.png" style="width: 16upx;height: 26upx;margin-left: 2%;" mode=""></image>
					</view>
				</view>
			</view>
			
		</view>
		
		
		

		<!-- 手机号 -->
		<template v-if="noPhone">
			<view class="moudel_content_my">
				<view class="phone_moudel_my">
					<view class="uni-flex">
						<view class="width35 text_left" @click="colsePhone">
							<image src="../../../static/image/icon/colse.png" style="width: 26upx;height: 26upx;" mode=""></image>
						</view>
						<view class="font_size34" style="margin-top: -2%;">
							{{title}}
						</view>
					</view>
					<template v-if="false">
						<view class="font_size30 border_bottom margin_top5 padding_top3 padding_bottom3">
							<input type="text" class="margin_left2" value="" placeholder="请输入您的手机号" />
						</view>
						<view class="uni-flex border_bottom padding_top3 padding_bottom3">
							<view class="width60">
								<input type="text" class="margin_left2" value="" placeholder="请输入验证码" />
							</view>
							<view class="font_size30 width40 text_center" style="border-left: 1px solid #EEEEEE;">
								获取验证码
							</view>
						</view>
						<view class="phone_btn">
							确定
						</view>
					</template>
				</view>
			</view>
		</template>

	</view>
</template>




<script>
	export default {
		data() {
			return {
				noPhone: false,
				title: '绑定手机号',
				
				orderList: [{
						name: '订单查询',
						url: '../../../static/image/icon/order1.png',
						tabClass: 'order1_img',
						falg:'order'
					},
					{
						name: '新闻资讯',
						url: '../../../static/image/icon/order3.png',
						tabClass: 'order2_img',
						falg:'journalism'
					},
					{
						name: '消息中心',
						url: '../../../static/image/icon/order2.png',
						tabClass: 'order3_img',
						falg:'msg'
					}
				],
				
				tabList:[
					{
						name:'申请提现',
						url:'../../../static/image/icon/my1.png',
						urlFalg:'Withdrawal',
						img_class:'tabList_img1'
					},
					{
						name:'提现记录',
						url:'../../../static/image/icon/my2.png',
						urlFalg:'withdrawalList',
						img_class:'tabList_img2'
					},
					{
						name:'个人信息',
						url:'../../../static/image/icon/my6.png',
						img_class:'tabList_img2',
						urlFalg:'information'
					},
					{
						name:'我的推荐人',
						url:'../../../static/image/icon/my4.png',
						urlFalg:'recommended',
						img_class:'tabList_img3'
					},
					{
						name:'意见反馈',
						url:'../../../static/image/icon/my8.png',
						urlFalg:'feedback',
						img_class:'tabList_img4'
					}
				]
			}
		},
		methods: {
			// 新闻等
			goToPage(falg){
				console.log(falg)
				let urlFalg = falg
				uni.navigateTo({
					url:'../../' + urlFalg + '/' + urlFalg
				})
			},
			
			
			// 去申请提现页面
			goToWithdrawal() {
				uni.navigateTo({
					url: '../../Withdrawal/Withdrawal'
				})
			},
			// 去提现记录
			goToWithdrawalList() {
				uni.navigateTo({
					url: '../../withdrawalList/withdrawalList'
				})
			},
			// 打开手机弹窗
			getPhone() {
				this.noPhone = true;
				uni.hideTabBar(); //隐藏tab
			},
			colsePhone() {
				this.noPhone = false;
				uni.showTabBar(); //显示tab
			},
			// 去我的推荐人
			goToRecommended() {
				uni.navigateTo({
					url: '../../recommended/recommended'
				})
			}
		}
	}
</script>


<style lang="scss">
	.my_moudel_bj {
		width: 100%;
		height: 622upx;
		background: url(../../../static/image/holdAll/myTop1.png) no-repeat;
		background-size: 100%;
		color: #333333;
		padding-top: 10upx;
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
		margin-top: 20upx;
		margin-left: 30upx;
		padding-right: 1%;
	}

	.my_img {
		width: 120upx;
		height: 120upx;
		border-radius: 50%;
	}

	.my_btn {
		width: 159upx;
		height: 54upx;
		text-align: center;
		background-color: #374CE5;
		color: #FFFFFF;
		font-size: 24upx;
		border-radius: 30upx;
		line-height: 54upx;
		margin-left: 10%;
		margin-top: 20upx;
	}

	

	.moudel_content_my {
		height: 100%;
		width: 100%;
		position: fixed;
		background-color: $uni-bg-color-mask;
		z-index: 99;
		top: 0;
		left: 0;
	}

	.phone_moudel_my {
		background-color: #FFFFFF;
		border-radius: 30upx;
		position: absolute;
		top: 30%;
		width: 520upx;
		margin-left: 75upx;
		height: 362upx;
		padding: 40upx;
	}

	.phone_btn {
		width: 220upx;
		height: 78upx;
		line-height: 78upx;
		text-align: center;
		background-color: #374CE5;
		color: #FFFFFF;
		border-radius: 50upx;
		margin-top: 30upx;
		margin-left: 160upx;
	}
	
	
	

	
	.order1_img {
		height: 52upx;
		width: 44upx;
	}
	
	.order2_img {
		height: 52upx;
		width: 54upx;
	}
	
	.order3_img {
		height: 54upx;
		width: 54upx;
	}
	
	
	.moudel_list_tab{
		background: #ffffff;
		border-radius: 30upx;
		box-shadow: 0pt 2upx 14upx 0upx #dde2ef; 
		padding: 30upx;
	}
	
	
	.tabList_img1{
		width:34upx ;
		height: 29upx;
	}
	.tabList_img2{
		width:34upx ;
		height: 34upx;
	}
	.tabList_img3{
		width:33upx ;
		height: 38upx;
	}
	.tabList_img4{
		width:33upx ;
		height: 32upx;
	}
</style>
