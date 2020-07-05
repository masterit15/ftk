// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import store from './store'
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import './vee-validate'
Vue.config.productionTip = false

Vue.prototype.$http = axios
if(localStorage.tokenData){
const tokenData = JSON.parse(localStorage.tokenData)
  Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${tokenData.access_token}`
}
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

import 'materialize-css'
import './sass/main.sass'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
