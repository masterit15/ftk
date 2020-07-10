import axios from "axios"

export default({
  state: { 
    user: JSON.parse(localStorage.getItem('user')) || null,
  },
  mutations: {
    set_user(state, user){
      state.user = user
    }
  },
  actions: {
    async authorization({commit}, data){
      let res = await axios.post('/auth/login', data)
      localStorage.setItem('user', JSON.stringify(res.data))
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`
      commit('set_user', res.data)
      return res.data.success
    },
    async register({dispatch}, data){
      let res = await axios.post('/auth/register', data)
      return res.data
    },
    async refreshToken({}){
      let user = await JSON.parse(localStorage.getItem('user'))
      let res = await axios.post('/auth/token', { token: user.refreshToken})
      user.accessToken = res.data.accessToken
      user.refreshToken = res.data.refreshToken
      localStorage.setItem('user', JSON.stringify(user))
    },
    async logout({commit}, data){
      let res = await axios.delete('/auth/logout', {params:{token: data}})
      if(res.data.success){
        localStorage.removeItem('user')
        delete axios.defaults.headers.common['Authorization']
      }
      return res.data.success
    },
  },
  getters: {
    user: state => state.user
  }
})