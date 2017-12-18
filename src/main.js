// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueJsonp from 'vue-jsonp'
import App from './App'
import router from './router'
import util from './util/util'




Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$tools = util

Vue.use(VueJsonp)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
