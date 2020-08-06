<template>
	<view>

		<view class="background_colorff">
			<view class="uni-flex font_size30">
				<view class="width50 text_right uni-flex ">
					<view class="width60">
						<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
							<view class="uni-input">{{array[index].name}}</view>
						</picker>
					</view>
					<view class="padding_top2">
						<image src="../../static/image/icon/downs.png" class="selsect_img" mode=""></image>
					</view>
				</view>
				<view class="width50   uni-flex padding_top2" @click="funTime">
					<view class="width60 text_center">
						日期选择器
					</view>
					<view class="">
						<image src="../../static/image/icon/downs.png" class="selsect_img" style="margin-top: -1%;" mode=""></image>
					</view>
				</view>
			</view>

			<view class="uni-flex padding_top2 padding_bottom2" v-if="timeFalg">
				<view class="text_center width50 border_right">
					<view class="font_size22 font_color66">
						起始日期
					</view>
					<view class="font_size26">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{startDateOne}}</view>
						</picker>
					</view>
				</view>
				<view class="text_center width50">
					<view class="font_size22 font_color66">
						截至日期
					</view>
					<view class="font_size26">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChangeEnd">
							<view class="uni-input">{{endDateOne}}</view>
						</picker>
					</view>
				</view>
			</view>

		</view>
		<view class="page_width">
			<view class="list_moudel" v-if="list.length  > 0" v-for="(item,index) in list" :key="index">
				<view class="font_size22 font_color99 margin_left3">
					{{item.createTime}}
				</view>
				<view class="uni-flex margin_left3 display_space">
					<view class="font_size26">
						{{item.status == 1 ? '佣金' : item.status == 2 ? '提成' : item.status == 3 ? '提现' :''}}
					</view>
					<view class="font_size30 margin_right3">
						<text v-if="item.type == 1">+</text>
						<text v-else>-</text>
						{{item.amount}}
					</view>
				</view>
			</view>
		</view>

		<!-- 缺省页面 -->
		<view class="text_center" v-if="list.length == 0">
			<image src="../../static/image/noContent/noCapital.png" mode="" class="no_img"></image>
			<view class="font_size28 font_colorcc">
				{{tipsTitle}}
			</view>

		</view>
	</view>
</template>

<script>
	function getDate(type) {
		const date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();

		if (type === 'start') {
			year = year - 60;
		} else if (type === 'end') {
			year = year + 2;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;

		return `${year}-${month}-${day}`;
	}
	export default {
		data() {
			return {
				list: [],
				tipsTitle: '暂无记录~',
				startDateOne: '请选择',
				endDateOne: '请选择',
				startDate: getDate('start'),
				endDate: getDate('end'),
				date: getDate({
					format: true
				}),
				timeFalg: false,
				array: [{
					name: '全部',
					id: ''
				}, {
					name: '佣金',
					id: '1'
				}, {
					name: '提成',
					id: '2'
				}],
				index: 0,
				dataEndDate: '',
				dataStartDate: ''
			}
		},

		mounted() {
			this.funFlowList(); //初始化加载页面
		},
		onLoad(option) {
			console.log(option)
			this.index = option.type
		},
		methods: {
			// 时间格式话
			formatDate: function(value) {
				var date = new Date(value); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var Y = date.getFullYear();
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
				var D = date.getDate();
				var h = date.getHours() + ':';
				var m = date.getMinutes() + ':';
				var s = date.getSeconds();
				return Y + '年' + M + '月' + D + '日';
			},
			
			// 分类
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.detail.value)
				this.index = e.detail.value;
				if (e.detail.value == 1) {
					this.tipsTitle = '暂无佣金记录~'
				} else if (e.detail.value == 2) {
					this.tipsTitle = '暂无提成记录~'
				}
				this.funFlowList();
			},
			
			funTime: function() {
				this.timeFalg = !this.timeFalg
			},
			// 时间开始
			bindDateChange: function(e) {
				this.startDateOne = e.detail.value;
				console.log(this.startDateOne)
				this.dataStartDate = this.formatDate(this.startDateOne);
				console.log(this.dataStartDate)
				this.funFlowList();
			},
			// 时间结束
			bindDateChangeEnd: function(e) {
				this.endDateOne = e.detail.value;
				console.log(this.endDateOne)
				this.dataEndDate = this.formatDate(this.endDateOne);
				this.funFlowList();
				console.log(this.dataEndDate)
			},

			// 获取资金列表
			funFlowList : function() {
				var d1 = new Date(this.startDateOne.replace(/\-/g, "\/"));
				var d2 = new Date(this.endDateOne.replace(/\-/g, "\/"));
				console.log(d1)
				console.log(d2)
				if (!d1) {
					uni.showToast({
						title: '请选择开始日期',
						icon: 'none',
						duration: 2000,
						position: 'top',
					});
				} else if (!d2) {
					uni.showToast({
						title: '请选择结束日期',
						icon: 'none',
						duration: 2000,
						position: 'top',
					});
				} else if (d1 > d2) {
					uni.showToast({
						title: '结束时间小于开始日期',
						icon: 'none',
						duration: 2000,
						position: 'top',
					});
					return;
				}
				var data = {
					endTime: this.dataEndDate,
					mbId: uni.getStorageSync('memberId'),
					startTime: this.dataStartDate,
					status: this.index,
					type: 1
				}
				this.$http.post('/acc/flow', data, true).then(res => {
					if (res.data.code == 200) {
						this.list = res.data.data
					}
				})
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #EEEEEE;
	}

	.list_moudel {
		background-color: #FFFFFF;
		border-radius: 20upx;
		height: 93upx;
		padding-top: 20upx;
		padding-bottom: 20upx;
		margin-top: 20upx;
	}

	.no_img {
		width: 402upx;
		height: 422upx;
		margin-top: 30%;
	}

	.selsect_img {
		width: 18upx;
		height: 10upx;
		margin-top: 1%;
	}
</style>
