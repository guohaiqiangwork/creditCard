<template>
	<view>
		<u-parse :content="item.content" :loading="loading" @preview="preview" @navigate="navigate" />
	</view>
</template>

<script>
	import uParse from '../../components/gaoyia-parse/parse.vue' //富文本展示
	export default {
		components: {
			uParse
		},
		data() {
			return {
				loading: false //开启loading不显示默认值
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
