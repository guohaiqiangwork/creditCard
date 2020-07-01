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
				loading: false ,//开启loading不显示默认值
				id:'',
				item:''
			}
		},
		onLoad(e){
			console.log(e)
			this.id = e.id
		},
		mounted() {
			this.getLunb();
		},
		methods: {
			getLunb(){
				this.$http.get('/bannerApi/getBanner/'+this.id, ).then(res => {
					console.log(JSON.stringify(res));
					if (res.data.code == 200) {
						this.item = res.data.data
					}
				}).catch(err => {
				
				})
			}
		}
	}
</script>

<style>

</style>
