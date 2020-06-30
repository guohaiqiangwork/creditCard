<template>
	<view>
		<view class="page_width">
			<view class="list_moudel_w"  v-for="(item,index) in list" :key="index">
				<view class="font_size22 font_color99">
					{{item.createTime}}
				</view>
				<view class="uni-flex display_space">
					<view class="">
						提现
					</view>
					<view class="font_size30 margin_right3">
						-{{item.amount}}
					</view>
				</view>
			</view>
		</view>
		
		<view class="text_center" v-if="list.length == 0" >
			<image src="../../static/image/noContent/noCapital.png" mode="" class="no_img"></image>
			<view class="font_size28 font_colorcc">
				暂无佣金记录~
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:''
			}
		},
		mounted() {
			this.funReflect();//处理提现记录
		},
		methods: {
			// 获取提现记录
			funReflect :function(){
				this.$http.get('/acc/reflect/' + uni.getStorageSync('memberId'),).then(res => {
					console.log(JSON.stringify(res));
					if (res.data.code == 200) {
						this.list = res.data.data
					}
				}).catch(err => {
				
				})
			}
		}
	}
</script>

<style lang="less">
	.list_moudel_w{
		height: 93upx;
		background: #ffffff;
		border-radius: 20upx;
		padding-top: 30upx;
		padding-left: 30upx;
		padding-bottom: 30upx;
		margin-top:30upx
	}
	.no_img{
		width: 402upx;
		height: 422upx;
		margin-top: 30%;
	}
</style>
