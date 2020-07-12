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
      let res = await axios.post('claims/tml', data)
      console.log(res)
      dispatch('getTimeline')
      return res
    },
    async putTimeline({dispatch}, data){
      let res = await axios.put('claims/tml', data)
      dispatch('getTimeline')
      return res
    },
    async deleteTimeline({dispatch}, data){
      let res = await axios.delete('claims/tml', data)
      dispatch('getTimeline')
      return res
    },
    async getTimeline({commit}, data){
      let res = await axios.get('claims/tml', {
        params: data
      })
      let claims = await res.data.timeline.results
      // console.log(claims)
      commit('set_timeline', claims)
      return res
    }
  },
  getters: {
    timelines: state => state.timelines
  }
})