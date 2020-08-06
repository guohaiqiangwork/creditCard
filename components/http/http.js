import Request from './request'
const http = new Request();
var noLoginFalg = true;
var noWifiFalg = true
let token = uni.getStorageSync('token');

http.setConfig((config) => { /* 设置全局配置 */
	if (process.env.VUE_APP_PLATFORM === 'h5') {
		// config.baseUrl = '/dep';　
		config.baseUrl = 'http://manage.zhichengdapay.com';
		// console.log('开发环境H5')　
	} else {
		//config.baseUrl = 'http://47.105.108.144:8080/primary';　
		config.baseUrl = 'http://xypay.expresslines.cn';
	}
	// config.header = {
	// 	//token: token,
	// 	// 'client': 'APP',
	// }

	return config
})

http.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
	config.header = {
		'Authorization': "Bearer " + uni.getStorageSync('token'),
		'client': 'APP',
		...config.header
	}
	uni.showLoading({
		title: '加载中'
	});

	return config;
})
http.interceptor.response((response) => { /* 请求之后拦截器 */
	uni.hideLoading();
	if (response.data) {
		if (response.data.code == 200) {
			return response;
		} else if (response.data.code == 401) {
			if (noLoginFalg) {
				noLoginFalg = false;
				uni.setStorageSync('token', '');
				uni.reLaunch({
					url: '/pages/login/login'
				});

			}
		} else {
			uni.showToast({
				title: response.data.message,
				icon: 'none',
				duration: 1500,
				position: 'top',
			});
			uni.stopPullDownRefresh(); //停止下拉刷新动画
			return response;
		}
	} else {
		if (response.errMsg) {
			if (noWifiFalg) {
				noWifiFalg = false;
				uni.navigateTo({
					url: '../../pages/noWifi/noWifi'
				})
			}
		}
	}

})
export {
	http
};
