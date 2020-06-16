<template>
	<view>
		<view class="my_moudel_bj">
			<view class="page_width">
				<view class="uni-flex margin_left1">
					<view class="font_size40 font_colorff">
						Hi~ 王大锤
					</view>
					<view class="my_vipbj">
						普通会员
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
					<view class="text_right width30">
						<image src="../../../static/image/holdAll/myQcode.png" style="width: 146upx;height: 48upx;position: absolute;right: 0;"
						 mode=""></image>
					</view>
				</view>


				<view class="margin_left3 margin_top3">
					<view class="uni-flex">
						<view class="font_size40 width60" style="margin-top: 10upx;">
							<text class="font_size26">余额</text> ：80,000.00
						</view>
						<view class="my_btn">
							立即提现
						</view>
					</view>

					<view class="uni-flex " style="margin-top: 20upx;">
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

				</view>

			</view>
		</view>
		<!-- 功能快 -->
		<view class="page_width">
			<view class="moudel_my_list">
				<view class="font_size28">
					我的服务
				</view>

				<view class="item_tab_list " @click="goToWithdrawal">
					<view class="">
						<image src="../../../static/image/icon/my1.png" style="width: 52upx;height: 44upx;" mode=""></image>
					</view>
					<view class="font_size26">
						申请提现
					</view>
				</view>
				<view class="item_tab_list " @click="goToWithdrawalList">
					<view class="">
						<image src="../../../static/image/icon/my2.png" style="width: 49upx;height: 49upx;" mode=""></image>
					</view>
					<view class="font_size26">
						提现记录
					</view>
				</view>
				<view class="item_tab_list " @click="getPhone">
					<view class="">
						<image src="../../../static/image/icon/my3.png" style="width: 32upx;height: 44upx;" mode=""></image>
					</view>
					<view class="font_size26">
						手机号
					</view>
				</view>
				<view class="item_tab_list ">
					<view class="">
						<image src="../../../static/image/icon/my4.png" style="width: 38upx;height: 44upx;" mode=""></image>
					</view>
					<view class="font_size26">
						我的推荐人
					</view>
				</view>
				<view class="item_tab_list ">
					<view class="">
						<image src="../../../static/image/icon/my5.png" style="width: 50upx;height: 42upx;" mode=""></image>
					</view>
					<view class="font_size26">
						绑定微信
					</view>
				</view>
				<view class="item_tab_list ">
					<view class="">
						<image src="../../../static/image/icon/my6.png" style="width: 45upx;height: 45upx;" mode=""></image>
					</view>
					<view class="font_size26">
						个人信息
					</view>
				</view>
				<view class="item_tab_list ">
					<view class="">
						<image src="../../../static/image/icon/my7.png" style="width: 46upx;height: 43upx;" mode=""></image>
					</view>
					<view class="font_size26">
						客服电话
					</view>
				</view>
				<view class="item_tab_list ">
					<view class="">
						<image src="../../../static/image/icon/my8.png" style="width: 43upx;height: 42upx;" mode=""></image>
					</view>
					<view class="font_size26">
						意见反馈
					</view>
				</view>

			</view>
		</view>

		<!-- 手机号 -->
		<template v-if="noPhone">
			<view class="moudel_content_my">
				<view class="phone_moudel_my">
					<view class="uni-flex">
						<view class="width35 text_left">
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
				
				<template>
					<view class="text_center font_size44 margin_top5">
						18401320024
					</view>
					<view class="font_size26 font_color99 text_center">
						您已成功绑定手机号码
					</view>
					<view class="phone_btn" style="width: 240upx;margin-left: 130upx;">
						换绑手机号
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
				noPhone: true,
				title:'绑定手机号',
			}
		},
		methods: {
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
			}
		}
	}
</script>


<style lang="scss">
	.my_moudel_bj {
		width: 100%;
		height: 510upx;
		background: url(../../../static/image/holdAll/myTop.png) no-repeat;
		background-size: 100%;
		color: #FFFFFF;
		padding-top: 41upx;
	}

	.my_vipbj {
		width: 130upx;
		height: 30upx;
		background: url(../../../static/image/icon/myvip.png) no-repeat;
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

	.moudel_my_list {
		background-color: #FFFFFF;
		height: 304upx;
		border-radius: 20upx;
		box-shadow: 0upx 2upx 14upx 0upx #dde2ef;
		padding: 30upx;
	}

	.item_tab_list {
		width: 25%;
		text-align: center;
		display: inline-block;
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
	
	.phone_btn{
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
</style>
