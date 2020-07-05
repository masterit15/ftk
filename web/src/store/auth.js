import axios from "axios"

export default({
  state: { 
    user: localStorage.getItem('user') || null,
  },
  mutations: {
    set_user(state, user){
      state.user = user
    }
  },
  actions: {
    async authorization({commit}, data){
      let res = await axios.post('/api/auth/login', data)
      localStorage.setItem('user', res.data.user)
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.user.access_token}`
      commit('set_user', res.data.user)
      return res
    },
    async register({dispatch}, data){
      let res = await axios.post('/api/auth/register', data)
      dispatch('login', res.data)
      return res
    },
    async logout({commit}, data){
      let res = await axios.delete('/api/auth/login', data)
      if(res.data.success){
        localStorage.removeItem('user')
        delete axios.defaults.headers.common['Authorization']
      }
      return res
    },
  },
  getters: {
    user: state => state.user
  }
})