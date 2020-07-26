import axios from "axios"

export default({
  state: {
    timelines: [],
  },
  mutations: {
    set_timeline(state, timelines){
      state.timelines = timelines
    }
  },
  actions: {
    async addTimeline({dispatch}, data){
      let res = await axios.post('/api/tml', data)
      dispatch('getTimeline', data.claimId)
      return res
    },
    async putTimeline({dispatch}, data){
      let res = await axios.put('/api/tml', data)
      dispatch('getTimeline')
      return res
    },
    async deleteTimeline({dispatch}, data){
      let res = await axios.delete(`/api/tml/${data.id}`)

      dispatch('getTimeline', data.claimId)
      return res
    },
    async getTimeline({commit}, id){
      let res = await axios.get('/api/tml/', {
        params: {id}
      })
      let tml = await res.data.timelines
      commit('set_timeline', tml)
      return res
    }
  },
  getters: {
    timelines: state => state.timelines
  }
})