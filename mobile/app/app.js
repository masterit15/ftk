import Vue from "nativescript-vue";


import routes from "./routes";
import BackendService from "./services/backend-service";
const Kinvey = require('kinvey-nativescript-sdk');
// Uncommment the following to see NativeScript-Vue output logs
// Vue.config.silent = false;

const backendService = new BackendService();
Vue.prototype.$backendService = backendService;

new Vue({
  render: h => h("frame", [h(backendService.isLoggedIn() ? routes.home : routes.login)])
}).$start();
