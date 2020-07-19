import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import claim from './claim'
import user from './user'
import timeline from './timeline'
import upload from './upload'
import departament from './departament'



Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    claim,
    upload,
    departament,
    timeline,
    user
  }
})