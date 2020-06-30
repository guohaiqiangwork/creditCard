<template>
	<view>
		<view class="page_width">
			<view class="wech_moudel uni-flex">
				<view class="width15 text_center margin_top2">
					<image src="../../static/image/icon/weix.png" style="width: 37upx;height: 30upx;" mode=""></image>
				</view>
				<view class="font_size30 font_colorff width20">
					微信账号
				</view>
				<view class="margin_left3  font_colorcc">
					<input type="text" value="" @input="keywx" placeholder="请输入您的微信号" placeholder-style="color:#cccccc" />
				</view>
			</view>


			<view class="wech_moudel_two">
				<view class="uni-flex">
					<view class="font_colorff font_size30">
						微信二维码
					</view>
					<view class="margin_left5">
						<image @click="chooseTheImg" :src="wxImg" style="width: 327upx;height: 424upx;" mode=""></image>
					</view>
				</view>
			</view>

			<view class="text_center font_size28 margin_top3" style="color: #CFDBFF; width: 70%;margin-left: 15%;">
				温馨提示:请输入正确的微信账号，方便推荐
				人与团队的联系！
			</view>

			<view class="bottom_btn_wech" @click="funBindWxNumber">
				确定
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wxImg: '../../static/image/holdAll/up.png',
				wxImgBase: '',
				wxNumber: ''
			}
		},
		methods: {
			// 手机号
			keywx: function(event) {
				this.wxNumber = event.target.value
			},
			//选择图片
			chooseTheImg() {
				uni.chooseImage({
					count: 1, //图片可选择数量
					sizeType: ['original', 'compressed'], //original 原图，compressed 压缩图，默认二者都有
					sourceType: ['album'], //album 从相册选图，camera 使用相机，默认二者都有。
					success: res => {
						let imgFiles = res.tempFilePaths //图片的本地文件路径列表
						this.wxImg = imgFiles[0]
						this.urlTobase64(imgFiles[0])
					}
				})
			},
			//图片转base64
			urlTobase64(url) {
				// #ifdef MP-WEIXIN
				uni.getFileSystemManager().readFile({
					filePath: url, //选择图片返回的相对路径
					encoding: 'base64', //编码格式
					success: res => { //成功的回调
						console.log(res);
						let base64 = 'data:image/jpeg;base64,' + res.data //不加上这串字符，在页面无法显示的哦
						this.wxImgBase = base64;
					},
					fail: (e) => {
						console.log("图片转换失败");
					}
				})
				// #endif

				// #ifndef MP-WEIXIN
				uni.request({
					url: url,
					method: 'GET',
					responseType: 'arraybuffer',
					success: ress => {
						let base64 = wx.arrayBufferToBase64(ress.data); //把arraybuffer转成base64 
						base64 = 'data:image/jpeg;base64,' + base64 //不加上这串字符，在页面无法显示的哦
						this.wxImgBase = base64;
					},
					fail: (e) => {
						console.log("图片转换失败");
					}
				})
				// #endif

			},

			//绑定微信
			funBindWxNumber :function() {
				var data = {
					wxNumber: this.wxNumber,
					memberId: uni.getStorageSync('memberId'),
					wxQr: this.wxImgBase
				}
				this.$http.post('/mb/bindWxNumber', data, true).then(res => {
					console.log(JSON.stringify(data))
					if (res.data.code == 200) {
						this.wxImg= '../../static/image/holdAll/up.png',
						uni.showToast({
							title: '更换成功',
							icon: 'none',
							duration: 2000,
							position: 'top',
						});
					}
				});

			}

		}
	}
</script>

<style lang="less">
	page {
		background: #292E3E;
	}

	.wech_moudel {
		background: #3f4760;
		border-radius: 20upx;
		padding: 30upx;
		align-items: center;
		margin-top: 30upx;
	}

	.wech_moudel_two {
		padding: 30upx;
		background: #3f4760;
		border-radius: 20upx;
		margin-top: 30upx;
	}

	.bottom_btn_wech {
		height: 90upx;
		line-height: 90upx;
		text-align: center;
		font-size: 30upx;
		color: #FFFFFF;
		border-radius: 50upx;
		background: #374ce5;
		border-radius: 45upx;
		position: absolute;
		width: 94%;
		bottom: 5%;
	}
</style>
