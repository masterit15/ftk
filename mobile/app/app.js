import Vue from "nativescript-vue";


import routes from "./routes";
import BackendService from "./services/backend-service";
<<<<<<< HEAD
require ("nativescript-local-notifications");

=======
const Kinvey = require('kinvey-nativescript-sdk');
>>>>>>> c86b8918d292f5994e7e620b21d7a26437f00da2
// Uncommment the following to see NativeScript-Vue output logs
// Vue.config.silent = false;
const backendService = new BackendService();
Vue.prototype.$backendService = backendService;

new Vue({
  render: h => h("frame", [h(backendService.isLoggedIn() ? routes.home : routes.login)])
}).$start();
