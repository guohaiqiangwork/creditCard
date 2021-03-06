// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import service from "./bin/fetch";
import remconfig from './config/rem.config'
remconfig()
Vue.config.productionTip = false
Vue.prototype.$fetch = service;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
