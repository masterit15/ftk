import axios from "axios"

export default({
  state: {
    claims: null,
  },
  mutations: {
    set_claims(state, claims){
      state.claims = claims
    }
  },
  actions: {
    async addClaims({dispatch}, data){
      let res = await axios.post('/api/claims/', data)
      dispatch('getClaims')
      return res
    },
    async putClaims({dispatch}, data){
      let res = await axios.put('/api/claims/', data)
      dispatch('getClaims')
      return res
    },
    async deleteClaims({dispatch}, data){
      let res = await axios.delete('/api/claims/', data)
      dispatch('getClaims')
      return res
    },
    async getClaims({commit}, data){
      let res = await axios.get('/api/claims/', data)
      commit('set_claims', res.data)
      return res
    }
  },
  getters: {
    claims: state => state.claims
  }
})