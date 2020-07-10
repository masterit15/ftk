import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import claim from './claim'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    claim
  }
})