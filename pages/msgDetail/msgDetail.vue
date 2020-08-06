<template>
	<view>
		<view class="page_width margin_top5">
			<view class=" font_size30 font_weight600">
				{{msgContent.title}}
			</view>
			<view class="font_size28 font_color66 margin_top3">
				{{msgContent.content}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msgId: '',
				msgContent: ''
			}
		},
		onLoad(option) {
			console.log(option.msgId);
			this.msgId = option.msgId
		},
		mounted() {
			this.funMsgC();
		},
		methods: {
			funMsgC() {
				this.$http.get('/msg/find/' + this.msgId).then(res => {
					if (res.data.code == 200) {
						this.msgContent = res.data.data
					}
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #FFFFFF;
	}

</style>
