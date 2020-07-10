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
      let res = await axios.post('claims/', data)
      dispatch('getClaims')
      return res
    },
    async putClaims({dispatch}, data){
      let res = await axios.put('claims/', data)
      dispatch('getClaims')
      return res
    },
    async deleteClaims({dispatch}, data){
      let res = await axios.delete('claims/', data)
      dispatch('getClaims')
      return res
    },
    async getClaims({commit}, data){
      console.log(data)
      let res = await axios.get('claims/', {
        params: data
      })
      commit('set_claims', res.data.result)
      return res
    }
  },
  getters: {
    claims: state => state.claims
  }
})