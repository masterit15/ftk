import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import './vee-validate'
import Viewer from 'v-viewer'
Vue.use(Viewer) 
import messages from './plugins/messages'
Vue.use(messages)

import dateFilter from './plugins/data.filter'
Vue.filter('date', dateFilter)

Vue.config.productionTip = false

// import vueKanban from 'vue-kanban'
import vueKanban from './components/kanban/Kanban.vue'
// Vue.use(vueKanban)
Vue.component('Kanban', vueKanban);

import Vue2Editor from "vue2-editor";
Vue.use(Vue2Editor);

import Vuebar from 'vuebar';
Vue.use(Vuebar);

Vue.prototype.$http = axios

if (localStorage.user) {
  const tokenData = JSON.parse(localStorage.user)
  Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${tokenData.accessToken}`
}


Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);


import './sass/main.sass'


Vue.use(new VueSocketIO({
  debug: false,
  connection: 'http://localhost:3000',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}))
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
