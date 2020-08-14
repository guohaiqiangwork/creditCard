<template>
	<view>
		<view class="my_moudel_bj">
			<view class="page_width">
				<view class="uni-flex  margin_left1" style="margin-top: 4%;">
					<view class="width20"><image :src="infoData.headImgurl" class="my_img" mode=""></image></view>
					<view class="margin_left2 width50">
						<view class="font_size40 font_weight600">Hi~ {{ infoData.nickName }}</view>
						<view class="my_vipbj" v-if="infoData.levelName == '普通会员'">{{ infoData.levelName }}</view>
						<view class="my_vipbjC" v-if="infoData.levelName == '初级会员'">{{ infoData.levelName }}</view>
						<view class="my_vipbjZ" v-if="infoData.levelName == '中级会员'">{{ infoData.levelName }}</view>
						<view class="my_vipbjG" v-if="infoData.levelName == '高级会员'">{{ infoData.levelName }}</view>
					
					</view>
				</view>

				<view class="money_moudel">		
					<view class="uni-flex">
						<view class="width45 margin_top3 " style="margin-left: 4%;">
							<view class="font_size24">我的余额</view>
							<view class="font_size50 font_weight600">{{ infoData.balance }}</view>
						</view>
						<view class="width45 margin_top3u  text_right" style="margin-left: 7%;">
							<view class="font_size26 text_center btn_right" @click="goToPage('Withdrawal')">立即提现</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="margin_left3" @click="goExclusivePosters"><image src="../../../static/image/holdAll/yq.png" class="yq_img" mode=""></image></view>

		<!-- 功能列表 -->
		<view class="page_width">
			<view class="moudel_list_tab">
				<view class="font_size28 font_weight600" style="margin-top: -2%;">我的服务</view>
				<view class="uni-flex padding_top3 padding_bottom3 border_bottom" v-for="(item, index) in tabList" :key="index" @click="goToPage(item.urlFalg)">
					<view class="" style="width: 7%;"><image :src="item.url" :class="item.img_class" style="margin-top: 1%;" mode=""></image></view>
					<view class="width70 margin_left2" style="margin-top: 0;" v-if="item.name == '我的推荐人' ">{{ item.name }}</view>
					<view class="width70 margin_left2" style="margin-top: -1%;" v-else>{{ item.name }}</view>
					<view class="width20 text_right"><image src="../../../static/image/icon/rightc.png" style="width: 16upx;height: 26upx;" mode=""></image></view>
				</view>

				<view class="uni-flex padding_top3 padding_bottom3 border_bottom">
					<view  style="width: 7%;"><image src="../../../static/image/icon/my7.png" style="margin-top: 1%;width: 33upx;height: 31upx;" mode=""></image></view>
					<view class="width30 margin_left2" style="margin-top: -1%;">客服电话</view>
					<view class="width60 text_right " @click="gotoTele">
						0472-4854-3939
						<image src="../../../static/image/icon/rightc.png" style="width: 16upx;height: 26upx;margin-left: 2%;" mode=""></image>
					</view>
				</view>
				<!-- <view class="uni-flex padding_top3 padding_bottom3 border_bottom" @click="returnFun">
					<view class="width10"><image src="../../../static/image/icon/my7.png" style="margin-top: 1%;width: 33upx;height: 31upx;" mode=""></image></view>
					<view class="width30 margin_left2" style="margin-top: -1%;">退出登录</view>
					<view class="width60 text_right ">
						0472-4854-3939
						<image src="../../../static/image/icon/rightc.png" style="width: 16upx;height: 26upx;margin-left: 2%;" mode=""></image>
					</view>
				</view> -->
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
						<view class="font_size34" style="margin-top: -2%;">{{ title }}</view>
					</view>
					<template v-if="false">
						<view class="font_size30 border_bottom margin_top5 padding_top3 padding_bottom3">
							<input type="text" class="margin_left2" value="" placeholder="请输入您的手机号" />
						</view>
						<view class="uni-flex border_bottom padding_top3 padding_bottom3">
							<view class="width60"><input type="text" class="margin_left2" value="" placeholder="请输入验证码" /></view>
							<view class="font_size30 width40 text_center" style="border-left: 1px solid #EEEEEE;">获取验证码</view>
						</view>
						<view class="phone_btn">确定</view>
					</template>
				</view>
			</view>
		</template>

		<!-- 支付密码 -->
		<template v-if="payFalg">
			<view class="moudel_content">
				<view class="content_block">
					<view class="uni-flex uni-row margin_left3 margin_top3">
						<view class="width30" @click="closeMoudel"><image src="../../../static/image/icon/colse.png" mode="" class="moudel_img"></image></view>
						<view class="font_color33 font_size34 font_weight600 margin_left3">设置支付密码</view>
					</view>
					<view class="font_color66 font_size30 text_center margin_top3u">支付密码为6位数字</view>

					<view class="margin_top5"><validcode :maxlength="6" :isPwd="true" @finish="getPwd" ref="pwd"></validcode></view>

					<view class="moudel_btn" @click="funSetPassword">确认</view>
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
			payFalg: false, //密码支付框
			title: '绑定手机号',
			passwordNum: '', //密码
			infoData: '', //个人信息

			orderList: [
				{
					name: '订单查询',
					url: '../../../static/image/icon/order1.png',
					tabClass: 'order1_img',
					falg: 'order'
				},
				{
					name: '新闻资讯',
					url: '../../../static/image/icon/order3.png',
					tabClass: 'order2_img',
					falg: 'journalism'
				},
				{
					name: '消息中心',
					url: '../../../static/image/icon/order2.png',
					tabClass: 'order3_img',
					falg: 'msg'
				}
			],

			tabList: [
				{
					name: '个人信息',
					url: '../../../static/image/icon/my6.png',
					img_class: 'tabList_img2',
					urlFalg: 'information'
				},
				{
					name: '提现记录',
					url: '../../../static/image/icon/my2.png',
					urlFalg: 'withdrawalList',
					img_class: 'tabList_img2'
				},
				{
					name: '支付密码',
					url: '../../../static/image/icon/nop.png',
					urlFalg: 'passwordSet',
					img_class: 'tabList_img2'
				},
				{
					name: '我的推荐人',
					url: '../../../static/image/icon/my4.png',
					urlFalg: 'recommended',
					img_class: 'tabList_img3'
				},
				{
					name: '意见反馈',
					url: '../../../static/image/icon/my8.png',
					urlFalg: 'feedback',
					img_class: 'tabList_img4'
				}
			]
		};
	},
	// mounted() {
	// 	this.funGetInfo(); //获取个人信息
	// },
	onShow() {
		this.infoData = '';
		this.funGetInfo(); //获取个人信息
	},
	methods: {
		
		returnFun: function() {
			uni.removeStorageSync('userId');
			uni.removeStorageSync('token');
		},
		closeMoudel:function(){
			this.payFalg = false
		},
		// 获取个人信息
		funGetInfo: function() {
			var data = {
				memberId: uni.getStorageSync('memberId')
			};
			this.$http.get('/mb/info', data).then(res => {
				console.log(JSON.stringify(res));
				if (res.data.code == 200) {
					this.infoData = res.data.data;
				}
			});
		},

		// 新闻等
		goToPage: function(falg) {
			console.log(falg);
			let urlFalg = falg;
			if (urlFalg == 'passwordSet') {
				var data = {
					memberId: uni.getStorageSync('memberId')
				};
				this.$http.get('/mb/isBindIdCard', data).then(res => {
					console.log(JSON.stringify(res));
					if (res.data.code == 500) {
						uni.navigateTo({
							url: '../../bindingIdentity/bindingIdentity?urlFalg=passwordSet'
						});
					} else {
						this.$http.get('/acc/isSetPassword/' + uni.getStorageSync('memberId')).then(res => {
							console.log(JSON.stringify(res));
							if (res.data.code == 500) {
								uni.hideTabBar(); //隐藏tab
								this.payFalg = true; //未设置密码
							} else {
								uni.navigateTo({
									url: '../../' + urlFalg + '/' + urlFalg
								});
							}
						});
					}
				});
		
			} else if(urlFalg == 'recommended'){
					this.$http.get('/mb/referrer/' + uni.getStorageSync('memberId')).then(res => {
						if (res.data.code == 200) {
							uni.navigateTo({
								url: '../../' + urlFalg + '/' + urlFalg
							});
						
						}else{
							uni.showToast({
								title: '您还没有推荐人~!',
								icon: 'none',
								duration: 2000,
								position: 'top',
							});
							return
						}
					})
			} else {
				uni.navigateTo({
					url: '../../' + urlFalg + '/' + urlFalg
				});
			}
		},

		//获取密码
		getPwd(e) {
			console.log(e);
			this.passwordNum = e;
		},
		funSetPassword: function() {
			var data = {
				mbId: uni.getStorageSync('memberId'),
				password: this.passwordNum
			};
			this.$http.post('/acc/setPassword', data, true).then(res => {
				console.log(JSON.stringify(res));
				uni.showTabBar(); //隐藏tab
				if (res.data.code == 200) {
					uni.showToast({
						title: '设置成功',
						icon: 'none',
						duration: 2000,
						position: 'top'
					});
					this.payFalg = false; //未设置密码
				} else {
					uni.showToast({
						title: res.data.message,
						icon: 'none',
						duration: 2000,
						position: 'top'
					});
				}
			});
		},

		// 去邀请页面
		goExclusivePosters() {
			uni.navigateTo({
				url: '../../exclusivePosters/exclusivePosters'
			});
		},

		// 去申请提现页面
		goToWithdrawal() {
			uni.navigateTo({
				url: '../../Withdrawal/Withdrawal'
			});
		},
		// 去提现记录
		goToWithdrawalList() {
			uni.navigateTo({
				url: '../../withdrawalList/withdrawalList'
			});
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
			});
		},
		
		/* 联系客服 */
		gotoTele(){
			 uni.makePhoneCall({
			 // 手机号
			phoneNumber: '0472-4854-3939', 
			// 成功回调
			success: (res) => {
					console.log('调用成功!')        
			},
			// 失败回调
			fail: (res) => {
					console.log('调用失败!')
			}
		  });
		},
	}
};
</script>

<style lang="scss">
.my_moudel_bj {
	width: 100%;
	height: 370upx;
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
	color: #ffe600;
	text-align: right;
	line-height: 30upx;
	padding-right: 2%;
}
.my_vipbjC {
	width: 130upx;
	height: 30upx;
	background: url(../../../static/image/icon/cjh.png) no-repeat;
	font-size: 22upx;
	background-size: 100%;
	color: #333333;
	text-align: right;
	line-height: 30upx;
	padding-right: 2%;
}
.my_vipbjZ {
	width: 130upx;
	height: 30upx;
	background: url(../../../static/image/icon/zjh.png) no-repeat;
	font-size: 22upx;
	background-size: 100%;
	color: #333333;
	text-align: right;
	line-height: 30upx;
	padding-right: 2%;
}
.my_vipbjG {
	width: 130upx;
	height: 30upx;
	background: url(../../../static/image/icon/gjh.png) no-repeat;
	font-size: 22upx;
	background-size: 100%;
	color: #ffe600;
	text-align: right;
	line-height: 30upx;
	padding-right: 2%;
}
.money_moudel {
	// width: 690upx;
	height: 170upx;
	background: linear-gradient(#374ce5, #0dadfd);
	border-radius: 30upx;
	box-shadow: 0upx 6upx 20upx 0upx rgba(128, 177, 255, 0.81);
	color: #ffffff;
	margin-top: 30upx;
}

.btn_right {
	width: 182upx;
	height: 66upx;
	background: #ffffff;
	border-radius: 33upx;
	color: #227cf1;
	line-height: 66upx;
	margin-top: 20upx;
	margin-left: 30%;
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
	background-color: #374ce5;
	color: #ffffff;
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
	background-color: #ffffff;
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
	background-color: #374ce5;
	color: #ffffff;
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

.moudel_list_tab {
	background: #ffffff;
	border-radius: 30upx;
	box-shadow: 0pt 2upx 14upx 0upx #dde2ef;
	padding: 30upx;
	padding-bottom: 0;
}

.tabList_img1 {
	width: 34upx;
	height: 29upx;
}

.tabList_img2 {
	width: 34upx;
	height: 34upx;
}

.tabList_img3 {
	width: 33upx;
	height: 38upx;
}

.tabList_img4 {
	width: 33upx;
	height: 32upx;
}

.yq_img {
	width: 690upx;
	height: 248upx;
	margin-top: 30upx;
}

//密码
.moudel_content {
	height: 100%;
	width: 100%;
	position: fixed;
	background-color: $uni-bg-color-mask;
	z-index: 99;
	top: 0;
	left: 0;
}

.content_block {
	background-color: #ffffff;
	width: 90%;
	margin-left: 5%;
	border-radius: 16px;
	position: absolute;
	top: 18%;
	padding-bottom: 30upx;
}

.moudel_img {
	width: 30upx;
	height: 30upx;
	margin-top: 8%;
	margin-left: 3%;
}

.moudel_img_one {
	width: 26upx;
	height: 26upx;
}

.moudel_btn {
	height: 70upx;
	width: 222upx;
	background-color: #374ce5;
	color: #ffffff;
	font-size: 30upx;
	text-align: center;
	border-radius: 50upx;
	align-items: center;
	line-height: 70upx;
	margin-top: 30upx;
	margin-left: 32%;
}
</style>
