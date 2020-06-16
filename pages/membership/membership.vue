<template>
	<view>
		<!-- 背景图 -->
		<view class="moudel_bj_top ">
			<view class="uni-flex top_moudel">
				<view class="font_size44 width30 text_center">
					<text class="font_size22">¥</text> 198
				</view>
				<view class="font_size22 width70 font_color99">
					付款前请仔细阅读下方《专员升级协议》
				</view>
			</view>
				
			
		</view>
		
		<!-- 某块 -->
		<view class="page_width padding_bottom3">
			<view class="center_moudel">
				<view class="font_size28 text_center">
					《专员升级协议》
				</view>
				<view class="font_size26">
					1.用户自愿缴纳费用，升级为专员，升级成功即可享收
					平台内的专员补贴等政治服务。
					2.会员也可通过发展3个新专员成为专员。
					以上满足任意一条即可成为专员。
					二.有效期：
				</view>
				<!-- <view class="uni-flex">
					<view class="">
						<image src="" mode=""></image>
					</view>
					<view class="">
						我已认真阅读并完全同意；《服务协议》和《专员
						升级协议》的所有条款
					</view>
				</view> -->
				
			</view>
			
			<view class="bottom_btn">
				确认支付
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
	.moudel_bj_top {
		width: 100%;
		height: 330upx;
		background: url(../../static/image/holdAll/huiyuan.png) no-repeat;
		background-size: 100%;
		
	}
	
	.top_moudel {
		color: #374CE5;
		height: 104upx;
		align-items:center;
		box-shadow: 0upx 4upx 14upx 0upx;
		border-radius: 20upx;
		margin-top: -5%;
		position: absolute;
		width: 94%;
		background-color: #FFFFFF;
		margin-left: 3%;
		margin-top: 290upx;
	}
	
	.center_moudel{
		box-shadow: 0upx 4upx 14upx 0upx #dde2ef;
		border-radius: 20upx;
		background-color: #FFFFFF;
		height: 830upx;
		margin-top: 100upx;
		padding: 30upx;
	}
	.bottom_btn{
		width: 100%;
		height: 88upx;
		background: #374ce5;
		border-radius: 44upx;
		text-align: center;
		line-height: 88upx;
		color: #FFFFFF;
		margin-top: 30upx;
	}
</style>
