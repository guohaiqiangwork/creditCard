<template>
	<view>
		<view class="">
			<swiper class="imageContainer" @change="handleChange" circular autoplay>
				<block v-for="(item,index) in imgList" :key="index">
					<swiper-item >
						<image class="itemImg" :src="item" lazy-load mode="scaleToFill"></image>
					</swiper-item>
				</block>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList:[]
			}
		},
		mounted() {
			this.funLun()
		},
		methods: {
			funLun(){
				this.$http.get('/posterApi/getPictures/' + uni.getStorageSync('memberId'), ).then(res => {
					console.log(JSON.stringify(res));
					if (res.data.code == 200) {
						this.imgList = res.data.data
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
			// 轮播滑动操作
			handleChange(e) {
				this.currentIndex = e.detail.current;
			},
		}
	}
</script>

<style>
// 轮播
	.imageContainer {
		position: fixed;
		width: 100%;
		height: 100%;
	}

	.itemImg {
		position: fixed;
		width: 100%;
		height: 100%;
	}
</style>
