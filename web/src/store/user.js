import axios from "axios"

export default ({
  state: {
    users: null,
  },
  mutations: {
    set_users(state, users) {
      state.users = users
    }
  },
  actions: {
    async addUser({ dispatch }, data) {
      let res = await axios.post('/api/users/add', data)
      dispatch('getUsers')
      return res
    },
    async putUser({ dispatch }, data) {
      let res = await axios.put('/api/users/', data)
      dispatch('getUsers')
      return res
    },
    async deleteUser({ dispatch }, data) {
      let res = await axios.delete('/api/users/', data)
      dispatch('getUsers')
      return res
    },
    async getUsers({ commit }, data) {
      let res = await axios.get('/api/users/', {
        params: data
      })
      commit('set_users', res.data.user.results)
      return res
    }
  },
  getters: {
    users: state => state.users
  }
})