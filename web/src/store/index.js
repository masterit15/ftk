import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import claim from './claim'
import user from './user'
import timeline from './timeline'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    claim,
    timeline,
    user
  }
})