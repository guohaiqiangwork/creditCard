import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'
import VueClipboard from './components/vue-clipboard2'
 
Vue.use(VueClipboard)

import {
	http
} from './components/http/http.js'
Vue.prototype.$http = http;

const app = new Vue({
    ...App
})
app.$mount()
