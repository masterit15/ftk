import axios from "axios"

export default ({
  state: {
    departaments: null,
  },
  mutations: {
    set_departaments(state, departaments) {
      state.departaments = departaments
    }
  },
  actions: {
    async addDepartament({ dispatch }, data) {
      let res = await axios.post('/api/departament/add', data)
      dispatch('getDepartaments')
      return res
    },
    async putDepartament({ dispatch }, data) {
      let res = await axios.put('/api/departament/', data)
      dispatch('getDepartaments')
      return res
    },
    async deleteDepartament({ dispatch }, data) {
      let res = await axios.delete('/api/departament/', data)
      dispatch('getDepartaments')
      return res
    },
    async getDepartaments({ commit }) {
      let res = await axios.get('/api/departament/')
      console.log(res.data)
      commit('set_departaments', res.data.departament.results)
      return res
    },

  },
  getters: {
    departaments: state => state.departaments
  }
})