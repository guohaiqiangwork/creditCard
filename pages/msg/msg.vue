<template>
	<view>
		<!-- tab -->
		<view class="background_colorff">
			<view class="item_tab" v-for="(item,index) in tabList" :key="index" @click="tabSwitch(index + 1)" :style="tabIndex == index + 1 ?'color:#374CE5' :'' ">
				{{item.name}}
			</view>
		</view>

		<!-- 列表 -->
		<view class="list_width padding_bottom3 padding_top2">
			<view v-if="msglist.length > 0" class="moudel_list" v-for="(item,index) in msglist" :key="index" @click="goToDetail(item.id)">
				<view class="" style="height: 13upx;">
					<view class="top_border" v-if="item.isRead == 2"></view>
				</view>
				<view class="uni-flex display_space">
					<view class="font_size30 width50 text_hidden ">
						{{item.title}}
					</view>
					<view class="font_size22 font_colorcc ">
						{{item.createTime}}
					</view>
				</view>
				<view class="font_size26 lsit_hidden">
					{{item.content}}
				</view>
			</view>
		</view>

		<view class="text_center" v-if="msglist.length == 0">
			<image src="../../static/image/noContent/noMsg.png" mode="" style="width: 392upx;height: 410upx;"></image>
			<view class="font_size28 font_colorcc">
				暂无提成记录~
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList: [{
						name: '系统通知'
					},
					{
						name: '服务通知'
					},
					{
						name: '最新活动'
					}
				],
				tabIndex: 1,
				msglist: ''
			}
		},
		onShow() {
			this.funMsgList(); //获取消息列表
		},
		methods: {
			tabSwitch(index) {
				this.tabIndex = index;
				this.funMsgList(); //处理数据
				// console.log(this.tabIndex)
			},
			goToDetail(id) {
				uni.navigateTo({
					url: '../msgDetail/msgDetail?msgId=' + id
				})
			},
			// 获取消息
			funMsgList() {
				this.$http.get('/msg/' + this.tabIndex).then(res => {
					if (res.data.code == 200) {
						this.msglist = res.data.data
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

	.item_tab {
		display: inline-block;
		width: 33%;
		text-align: center;
		color: #999999;
		font-size: 28upx;
		height: 88upx;
		line-height: 88upx;
	}

	.list_width {
		width: 94%;
		margin-left: 3%;
	}

	.moudel_list {
		height: 176upx;
		background-color: #FFFFFF;
		border-radius: 20upx;
		padding: 3%;
		box-shadow: 0pt 2upx 20upx 0pt #dde2ef;
		margin-top: 30upx;
	}

	.top_border {
		width: 13upx;
		height: 13upx;
		border-radius: 50%;
		background-color: #374CE5;
		margin-left: 99%;
	}

	.lsit_hidden {
		overflow: hidden;
		word-break: break-all;
		/* break-all(允许在单词内换行。) */
		text-overflow: ellipsis;
		/* 超出部分省略号 */
		display: -webkit-box;
		/** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical;
		/** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 2;
		/** 显示的行数 **/
	}
</style>
