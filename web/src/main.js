// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import './vee-validate'
import messages from './plugins/messages'
Vue.config.productionTip = false
Vue.use(messages)
Vue.prototype.$http = axios
if(localStorage.user){
const tokenData = JSON.parse(localStorage.user)
  Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${tokenData.accessToken}`
}
import vueKanban from 'vue-kanban'

Vue.use(vueKanban)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);


import './sass/main.sass'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
