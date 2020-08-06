<template>
	<view>
		<!-- 背景图 -->
		<view :class="'moudel_bj_top' + vipF ">

			<view class="uni-flex moudel_margin">
				<view class="wi">
					<image :src="infoData.headImgurl" class="top_img" mode=""></image>
				</view>
				<view class="font_size40 margin_top3 margin_left3 font_weight600" :style="vipF == 3 ? 'color:#ffffff' :'color:#333333'">
					{{infoData.nickName}}
				</view>
			</view>

			<view class="uni-flex margin_top8">
				<view @click="funVip(index)"  :class="index +1 == vipF ? 'moudel_hui' :'moudel_huin' " v-for="(item,index) in vipList" :key="index">
					<view class="">
						¥<text class="font_size60 font_weight600">{{item.price}}</text>
					</view>
					<view class="font_size22" >
						{{item.level_name}}
					</view>
				</view>

			</view>
			
			
			<view class="font_colorf0 uni-flex margin_top3" style="width: 94%;margin-left: 3%;">
				<view  @click="tabFalg" style="margin-right: 2%;margin-top: .3%;">
					<image src="../../static/image/icon/check.png" v-if="usefalg" class="img_1"></image>
					<image src="../../static/image/icon/check1.png" v-if="!usefalg" class="img_1"></image>
				</view>
				<view class="">
					我已认真阅读并完全同意；<text class="font_colorff" @click="goAgreement">《服务协议》</text>和 <text class="font_colorff">
					《专员升级权益》</text>的所有条款
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
					平台内的专员补贴等增值服务。
					2.会员也可通过发展3个新专员成为专员。
					以上满足任意一条即可成为专员。
					二.有效期：永久有效
					三.增值服务：
					付费会员可获得增值服务奖励。
					四.付费说明：
					1.信用卡申请无需缴纳198元同样可以办理
					这两项业务；
					2.用户（普通会员）不升级为专员将享收不到专员补贴
					等增值服务；
					3.会员升级费用与信用卡申请额度无关；
					4.会员升级费用不可退还；
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

			<view :class="payFalg == 0 ? 'bottom_btn' :'bottom_btn_no' " @click="goPayList" >
				确认支付 
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				vipF:1,
				usefalg:true,
				vipList:[],
				payFalg:'',
				infoData:{
					headImgurl:'',
					nickName:''
				}
			}
		},
		mounted() {
			this.funGetMemberLevel();//获取当前人元等级
				this.funGetLevelNum();//获取会员等级
				this.funGetInfo()
		},
		methods: {
			funVip:function(index){
				console.log(index)
				console.log(this.vipList[index])
				this.vipF = index +1;
				this.payFalg = this.vipList[index].isLevel
			},
			// 获取个人信息
			funGetInfo: function() {
				var data = {
					memberId: uni.getStorageSync('memberId')
				}
				this.$http.get('/mb/info', data).then(res => {
					console.log(JSON.stringify(res))
					if (res.data.code == 200) {
						this.infoData = res.data.data
					}
				})
			},
			
			// 协议
			tabFalg:function(){
				this.usefalg = !this.usefalg
			},
			// 去服务协议
			goAgreement:function(){
				uni.navigateTo({
					url:'../serviceAgreement/serviceAgreement'
				})
			},
			// 去支付yem
			goPayList:function(){
				if(this.payFalg == 1){
					return;
				}
				// console.log(this.vipF);
				// console.log(this.vipList[this.vipF - 1])
				if(!this.usefalg){
					uni.navigateTo({
						url:'../payList/payList?payOrder=' + JSON.stringify(this.vipList[this.vipF - 1])
					})
				}else{
					uni.showToast({
						title: '请勾选协议',
						icon: 'none',
						duration: 2000,
						position: 'top',
					});
				}
				
			},
			
			
			// 获取当前人等级   
			funGetMemberLevel(){
				this.$http.get('/mb/getMemberLevel/' + uni.getStorageSync('memberId')).then(res => {
					console.log(JSON.stringify(res))
					if (res.data.code == 200) {
						this.berLevel =  res.data.data
					}
				})
			},
			// 获取会员等级
			funGetLevelNum (){
				this.$http.get('/levelApi/getLevelNum/'+ uni.getStorageSync('memberId')).then(res => {
					console.log(JSON.stringify(res))
					if (res.data.code == 200) {
						this.vipList =  res.data.data;
						this.payFalg = this.vipList[0].isLevel
					}
				})
			}
			
		}
	}
</script>

<style lang="less">
	.moudel_bj_top1 {
		width: 100%;
		height: 664upx;
		background: url(../../static/image/holdAll/membership1.png) no-repeat;
		background-size: 100%;
	}
	.moudel_bj_top2 {
		width: 100%;
		height: 664upx;
		background: url(../../static/image/holdAll/membership2.png) no-repeat;
		background-size: 100%;
	}
	.moudel_bj_top3 {
		width: 100%;
		height: 664upx;
		background: url(../../static/image/holdAll/membership3.png) no-repeat;
		background-size: 100%;
	}

	.top_moudel {
		color: #374CE5;
		height: 104upx;
		align-items: center;
		box-shadow: 0upx 4upx 14upx 0upx;
		border-radius: 20upx;
		margin-top: -5%;
		position: absolute;
		width: 94%;
		background-color: #FFFFFF;
		margin-left: 3%;
		margin-top: 290upx;
	}

	.center_moudel {
		box-shadow: 0upx 4upx 14upx 0upx #dde2ef;
		border-radius: 20upx;
		background-color: #FFFFFF;
		// height: 830upx;
		margin-top: 20upx;
		padding: 30upx;
	}

	.bottom_btn {
		width: 100%;
		height: 88upx;
		background: #374ce5;
		border-radius: 44upx;
		text-align: center;
		line-height: 88upx;
		color: #FFFFFF;
		margin-top: 30upx;
	}
	.bottom_btn_no {
		width: 100%;
		height: 88upx;
		background: #999999;
		border-radius: 44upx;
		text-align: center;
		line-height: 88upx;
		color: #FFFFFF;
		margin-top: 30upx;
	}

	.top_img {
		width: 120upx;
		height: 120upx;
		border-radius: 50%;
	}

	.moudel_margin {
		margin-left: 15%;
		padding-top: 15%;
	}

	.moudel_hui {
		width: 210upx;
		height: 160upx;
		border: 1pt solid #f0c880;
		border-radius: 30upx;
		align-items: center;
		padding-top: 20upx;
		padding-bottom: 30upx;
		font-size: 26upx;
		text-align: center;
		color: #F0C880;
		margin-left: 30upx;
	}
	.moudel_huin{
		width: 210upx;
		height: 160upx;
		border: 1pt dashed #f0c880;
		border-radius: 30upx;
		align-items: center;
		padding-top: 20upx;
		padding-bottom: 30upx;
		font-size: 26upx;
		text-align: center;
		color: #F0C880;
		margin-left: 30upx;
		opacity: 0.61;
	}
	
	.img_1{
		width: 30upx;
		height: 30upx;
	}
</style>
