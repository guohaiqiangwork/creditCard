<template>
	<view>
		<view v-if="getWxNumberF" class="uni-flex background_colorff padding_bottom3 padding_top3 border_bottom">
			<view class="font_size30 margin_left3  width70">
				您还没有绑定微信
				<text class="margin_left3" style="color: #374CE5;" @click="goBind">去绑定</text>
				<image src="../../static/image/icon/rightb.png" class="margin_left2" style="width: 8upx;height: 14upx;margin-top: 20upx;"
				 mode=""></image>
			</view>
			<view class="font_size30 text_center width30 " @click="open_moudel">
				提现说明
			</view>
		</view>

		<view class="page_width">
			<view class="with_moudel">
				<view class="font_size30 border_bottom padding_bottom3 padding_top3" v-if="false">
					微信账号：
					<text class="margin_left3">hkjhkhkhkjh</text>
				</view>

				<view class="border_bottom margin_top3">
					<view class="font_size30">
						提现金额
					</view>
					<view class="uni-flex font_size50">
						<view class="font_size50 width10">
							¥
						</view>
						<view class="width80 margin_left3" style="margin-top: 24upx;">
							<input type="number" @input="keyMoney" placeholder="请输入提现金额" :value="moneyValue" />
						</view>
					</view>
				</view>

				<view class="uni-flex margin_top3">
					<view class=" width70" @click="wholeMoney">
						<text class="font_size26 font_color99 margin_right3">余额￥{{yeFalg}}</text>
						全部提现
					</view>
					<view class="font_size26 font_color99">
						手续费:￥{{SxfFalg}}/%
					</view>
				</view>


				<view class="tx_btn" @click="open_password">
					提现
				</view>


				<!-- 支付密码 -->
				<template v-if="payFalg">
					<view class="moudel_content">
						<view :class="setFalg ? 'content_block' : 'content_block_pay'">
							<view class="uni-flex uni-row margin_left3 margin_top3">
								<view class="width30" @click="close_password">
									<image src="../../static/image/icon/colse.png" mode="" class="moudel_img"></image>
								</view>

								<view class="font_color33 font_size30">
									请输入提现密码
								</view>
							</view>
							<view class="font_color33 font_size30 text_center" v-if="setFalg">
								支付密码为6位数字
							</view>
							<view class="font_color33 font_size30 text_center" v-if="!setFalg">
								提现
							</view>
							<view class="font_color33 font_size60 text_center" v-if="!setFalg">
								￥{{money}}
							</view>
							<view class="font_size26 text_center" style="color: #F34342;">
								*其中扣减：手续费￥{{moneyTx}}
							</view>
							<view class="margin_top5">
								<validcode :maxlength="6" :isPwd="true" @finish="getPwd" ref="pwd"></validcode>
							</view>
						</view>
					</view>
				</template>



				<!-- 提现说明 -->
				<template v-if='explainFalg'>
					<view class="moudel_content">
						<view class="explain_moudel">
							<view class="uni-flex margin_left3 margin_top3">
								<view class="width35" @click="close_moudel">
									<image src="../../static/image/icon/colse.png" class="moudel_img_one" mode=""></image>
								</view>
								<view class="font_size34">
									提现说明
								</view>
							</view>
							<view class="font_size22 margin_left3 margin_right3 font_size28 margin_top3">
								一、提现相关操作
								1.用户在56金服平台，进入账户余额-点击提现-填写提现金额-选择是否使用提现券，进入填写存管银行提现页面，正确填写交易密码后即可提现成功

								2.用户账户有可用资金即可提现，两个小时内到账。
								A.5万（含）以下提现（24小时）两个小时内到账；
								B.5万以上提现工作日工作时间（8:00-17:00）两个小时内到账；
								C.5万以上非工作日工作时间为次工作日到账；

								3. 温馨提示
								夜间/节假日期间如有大额提现（单笔5万以上）需求，建议采用多笔小额操作
								4. 由于银行清算次日到账，当天新充值的资金可用于投资，提现需次日才可提现。
							</view>
						</view>
					</view>
				</template>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				setFalg: false, //密码设置框
				payFalg: false, //密码支付框
				money: 0,
				explainFalg: false, //说明
				moneyValue: '',

				getWxNumberF: false, //是否显示绑定微信
				SxfFalg: '', //手续费比例
				yeFalg: '', //余额
				moneyValueF: '',
				moneyFalg: '', //提现手续费
				password: '' //密码
			}
		},
		mounted() {
			this.funGetWxNumber(); //是否绑定微信
			this.funGetSxf(); //查询手续费比例
		},
		methods: {
			goBind() {
				uni.navigateTo({
					url: '../wechatBinding/wechatBinding'
				})
			},
			//获取密码
			getPwd(e) {
				console.log(e);
				this.password = e;
				this.passwordCheck(); //校验密码
			},
			// 密码校验
			passwordCheck() {
				var pData = {
					mbId: uni.getStorageSync('memberId'),
					password: this.password
				}
				this.$http.post('/acc/passwordCheck', pData, true).then(res => {
					console.log(JSON.stringify(res));
					if (res.data.code == 200) {
						this.explainFalg = false;
						this.goToR(); //去提现
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 2000,
							position: 'top',
						});
						this.$refs.pwd.clear(); //清空密码
					}
				}).catch(err => {

				})
			},
			goToR() {
				if (this.moneyValueF > this.yeFalg) {
					uni.showToast({
						title: '输入金额大于余额',
						icon: 'none',
						duration: 2000,
						position: 'top',
					});
					return
				}
				var data = {
					mbId: uni.getStorageSync('memberId'),
					balance: this.moneyValueF
				}

				this.$http.post('/acc/reflectWxblance', data,true).then(res => {
					console.log(JSON.stringify(res));
					if (res.data.code == 200) {
						this.explainFalg = false;
						uni.navigateTo({
							url: '../withdrawalResult/withdrawalResult?tixiD=' + JSON.stringify(res.data.data)
							
						})
					}else{
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 2000,
							position: 'top',
						});
					}
				}).catch(err => {

				})
		
				
			},
			// 打开提现
			open_moudel() {
				this.explainFalg = true;
			},
			close_moudel() {
				this.explainFalg = false
			},
			// 打开密码
			open_password() {
				this.payFalg = true;
				this.money = Number(this.moneyValueF) - Number(this.moneyValueF) * Number(this.moneyFalg)
				this.moneyTx = Number(this.moneyValueF) * Number(this.moneyFalg)
			},
			close_password() {
				this.payFalg = false
			},

			// 是否绑定微信
			funGetWxNumber() {
				this.$http.get('/mb/getWxNumber/' + uni.getStorageSync('memberId'), ).then(res => {
					console.log(JSON.stringify(res));
					if (res.data.code != 200) {
						this.getWxNumberF = false;
					}
				}).catch(err => {

				})
			},
			// 查询手续费比例
			funGetSxf() {
				this.$http.get('/mb/getSxf/' + uni.getStorageSync('memberId'), ).then(res => {
					console.log(JSON.stringify(res));
					if (res.data.code == 200) {
						this.moneyFalg = res.data.data.sxf;
						this.SxfFalg = res.data.data.sxf * 100
						this.yeFalg = res.data.data.ye
					}
				}).catch(err => {

				})
			},
			// 全部提现
			wholeMoney() {
				this.moneyValue = Number(this.yeFalg);
				this.moneyValueF = this.yeFalg;
			},
			// 获取输入框值
			keyMoney(event) {
				this.moneyValueF = event.target.value
				if (Number(this.moneyValueF) > Number(this.yeFalg)) {
					this.moneyValue = Number(this.yeFalg)
				}
			}
		}
	}
</script>

<style lang="scss">
	.with_moudel {

		height: 490upx;
		background: #ffffff;
		border-radius: 20upx;
		margin-top: 5%;
		padding: 30upx;
	}

	.tx_btn {
		width: 614upx;
		height: 90upx;
		color: #FFFFFF;
		text-align: center;
		font-size: 30upx;
		line-height: 90upx;
		background-color: #374CE5;
		border-radius: 50upx;
		margin-top: 70upx;
	}


	/* 密码框 */
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
		background-color: #FFFFFF;
		width: 90%;
		margin-left: 5%;
		border-radius: 16px;
		position: absolute;
		top: 18%;
	}

	.content_block_pay {
		background-color: #FFFFFF;
		width: 90%;
		margin-left: 5%;
		border-radius: 16px;
		position: fixed;
		// bottom: 3%;
		top: 20%;
		height: 438upx;
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


	.explain_moudel {
		width: 600upx;
		height: 746upx;
		margin-left: 75upx;
		background: #ffffff;
		border-radius: 30upx;
		position: absolute;
		top: 20%;
	}
</style>
