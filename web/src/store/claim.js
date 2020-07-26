import axios from "axios"

export default({
  state: {
    blocks: [],
  },
  mutations: {
    set_claims(state, claims){
      state.blocks = claims
    }
  },
  actions: {
    async addClaims({dispatch}, data = {}){
      let res = await axios.post('/api/claims/', data)
      dispatch('getClaims')
      return res.data
    },
    async putClaims({dispatch}, data){
      let res = await axios.put(`/api/claims/${data.id}`, data)
      dispatch('getClaims')
      return res.data
    },
    async deleteClaims({dispatch}, data){
      let res = await axios.delete('/api/claims/', data)
      dispatch('getClaims')
      return res.data
    },
    async getClaims({commit}, data){
      let res = await axios.get('/api/claims/', {
        params: data
      })
      let claims = await res.data.claims.results
      // console.log(claims)
      commit('set_claims', claims)
      return res
    }
  },
  getters: {
    blocks: state => state.blocks
  }
})