import axios from "axios"

export default ({
  state: {
    notifications: null,
  },
  mutations: {
    set_notifications(state, notifications) {
      state.notifications = notifications
    },
  },
  actions: {
    SOCKET_notifications({commit}, notifications){
      console.log(notifications)
      commit('set_notifications', notifications)
    }
  },
  getters: {
    notifications: state => state.notifications
  }
})