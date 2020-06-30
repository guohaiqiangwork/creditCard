<template>
	<view>

		<view class="page_width">
			<view class="" v-for="(item,index) in listTab" :key="index">
				<view class="uni-flex display_space background_colorff list_one" @click="tabSwicth(item.id)" :class="item.tabIndex  ? 'list_one_active' : ''">
					<view class="font_size30 margin_left3">
						{{item.title}}{{item.tabIndex}}
					</view>
					<view class="margin_right3" v-if="tabIndex == item.id">
						<image src="../../static/image/icon/down.png" class="right_img" mode=""></image>
					</view>
					<view class="margin_right3" v-else>
						<image src="../../static/image/icon/up.png" class="right_img" mode=""></image>
					</view>
				</view>
				<view v-if="tabIndex == item.id" class="background_colorff font_size26 list_one_conter" style="padding: 3%;">
					<u-parse :content="item.content" :loading="loading" @preview="preview" @navigate="navigate" />
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	import uParse from '../../components/gaoyia-parse/parse.vue'//富文本展示
	export default {
		components: {
			uParse
		},
		data() {
			return {
				tabIndex: '',
				listTab: [],
				loading: false //开启loading不显示默认值
			}
		},
		mounted() {
			this.funCardList();
		},
		methods: {
			preview(src, e) {
				// do something
			},
			navigate(href, e) {
				// do something
			},


			// 切换
			tabSwicth(index) {
				console.log(index)
				this.tabIndex = index
				// this.listTab[index].tabIndex = !this.listTab[index].tabIndex
			},
			// 获取指南列表
			funCardList() {
				this.$http.get('/news/info/2').then(res => {
					if (res.data.code == 200) {
						this.listTab = res.data.data

					}
				})
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #f8f9fc;
	}

	.list_one {
		height: 100upx;
		line-height: 100upx;
		align-items: center;
		border-radius: 20upx;
		margin-top: 30upx;
	}

	.list_one_active {
		border-bottom-left-radius: 0 !important;
		border-bottom-right-radius: 0 !important;
	}

	.list_one_conter {}

	.right_img {
		width: 28upx;
		height: 16upx;
	}
</style>
