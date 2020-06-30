import Vue from 'vue'
import App from './App'
import {
	http
} from './components/http/http.js'
Vue.prototype.$http = http;
import 'js_sdk/ican-H5Api/ican-H5Api.js'
import validCode from './components/validCode.vue'
Vue.component('validcode', validCode)


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
