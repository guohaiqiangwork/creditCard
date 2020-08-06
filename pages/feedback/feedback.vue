<template>
	<view>
		<view class="page_width">
			<view class="list_one uni-flex" style="padding: 0;">
				<view class="font_size28 margin_left3 margin_top2">常见问题：</view>
				<view class=" font_size28 font_color99">
					<picker @change="bindPickerChange" :value="index" :range="array" range-key="text">
						<view class="uni-input">{{ array[index].text }}</view>
					</picker>
				</view>
				<view class="">
					<image src="../../static/image/icon/down.png" style="width: 21upx;height: 12upx;position: absolute; right: 6%;margin-top: 4.5%;" mode=""></image>
				</view>
			</view>

			<view class="list_one">
				<view class="font_size28">详细问题及意见</view>
				<view class="margin_top3"><textarea value="" @input="textareaCode" placeholder-style="color:#cccccc" placeholder="请输入您的建议及意见" class="list_two_t" /></view>
			</view>

			<view class="list_one ">
				<view class="font_size28">请提供相关问题的图片（可选）</view>

				<view class="margin_top5">
					<image
						class="delectImg"
						@click="delectImgf"
						v-if="imagesU != '../../static/image/holdAll/feedImg.png'"
						src="../../static/image/icon/delect.png"
						mode=""
					></image>
					<image :src="imagesU" @click="chooseTheImg" style="width: 162upx;height: 162upx;border-radius: 10upx;" mode=""></image>
				</view>
			</view>

			<view class="bottom_btn_wech" @click="funSaveFeed">提交</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			array: [{ text: '', value: '' }],
			index: 0,
			images: '',
			imagesU: '../../static/image/holdAll/feedImg.png',
			content: ''
		};
	},
	mounted() {
		this.funFindAllType();
	},
	methods: {
		textareaCode(e) {
			console.log(e.detail.value);
			this.content = e.detail.value;
		},
		// 获取下来数据
		funFindAllType: function() {
			this.$http.get('/feedBack/findAllType').then(res => {
				console.log(JSON.stringify(res));
				if (res.data.code == 200) {
					this.array = res.data.data;
				}
			});
		},
		// 下拉值
		bindPickerChange: function(e) {
			console.log('picker发送选择改变，携带值为：' + e.detail.value);
			this.index = e.detail.value;
		},
		delectImgf: function() {
			this.imagesU = '../../static/image/holdAll/feedImg.png';
			this.images = '';
		},
		//选择图片
		chooseTheImg: function() {
			uni.chooseImage({
				count: 1, //图片可选择数量
				sizeType: ['original', 'compressed'], //original 原图，compressed 压缩图，默认二者都有
				sourceType: ['album'], //album 从相册选图，camera 使用相机，默认二者都有。
				success: res => {
					let imgFiles = res.tempFilePaths; //图片的本地文件路径列表
					this.imagesU = imgFiles[0];
					this.urlTobase64(imgFiles[0]);
				}
			});
		},
		//图片转base64
		urlTobase64: function(url) {
			// #ifdef MP-WEIXIN
			uni.getFileSystemManager().readFile({
				filePath: url, //选择图片返回的相对路径
				encoding: 'base64', //编码格式
				success: res => {
					//成功的回调
					console.log(res);
					let base64 = 'data:image/jpeg;base64,' + res.data; //不加上这串字符，在页面无法显示的哦
					this.images = base64;
				},
				fail: e => {
					console.log('图片转换失败');
				}
			});
			// #endif

			// #ifndef MP-WEIXIN
			uni.request({
				url: url,
				method: 'GET',
				responseType: 'arraybuffer',
				success: ress => {
					let base64 = wx.arrayBufferToBase64(ress.data); //把arraybuffer转成base64
					base64 = 'data:image/jpeg;base64,' + base64; //不加上这串字符，在页面无法显示的哦
					this.images = base64;
				},
				fail: e => {
					console.log('图片转换失败');
				}
			});
			// #endif
		},

		// 提交
		funSaveFeed: function() {
			if (!this.content) {
				uni.showToast({
					title: '请填写建议',
					icon: 'none',
					duration: 2000,
					position: 'top'
				});
				return;
			}
			var data = {
				mbId: uni.getStorageSync('memberId'),
				content: this.content,
				images: this.images,
				typeId: this.index + 1
			};
			this.$http
				.post('/feedBack/saveFeed', data, true)
				.then(res => {
					console.log(JSON.stringify(res));
					if (res.data.code == 200) {
						uni.showToast({
							title: '提交成功',
							icon: 'none',
							duration: 2000,
							position: 'top'
						});
						uni.switchTab({
							url: '/pages/tabBar/my/my'
						});
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 2000,
							position: 'top'
						});
					}
				})
				.catch(err => {});
		}
	}
};
</script>

<style lang="less">
.list_one {
	padding: 20upx;
	background: #ffffff;
	border-radius: 20upx;
	margin-top: 30upx;
}

.list_two_t {
	height: 200upx;
	border: 1px solid #eeeeee;
	border-radius: 20upx;
	font-size: 26upx;
	color: #333333;
	padding-top: 20upx;
	padding-left: 20upx;
}
.bottom_btn_wech {
	height: 90upx;
	line-height: 90upx;
	text-align: center;
	font-size: 30upx;
	color: #ffffff;
	border-radius: 50upx;
	background: #374ce5;
	border-radius: 45upx;
	position: absolute;
	width: 94%;
	bottom: 5%;
}
.delectImg {
	width: 30upx;
	height: 30upx;
	position: absolute;
	margin-top: -4%;
	margin-left: 20%;
}
</style>
