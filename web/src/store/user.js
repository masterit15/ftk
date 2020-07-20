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
    },
    async subscribeUser({dispatch}) {
      const register = await navigator.serviceWorker.register(
        "../static/service-worker.js"
      );
      const publicVapidKey = "BBcqtb8w1T4nMJOZTM6RLpPXAav11mgAW4F0T6M9TGpbS7pc_UiYgNytD18BRzmu3dhMIzQrJmtvIueQAc6exxo"
      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: await dispatch('urlBase64ToUint8Array', publicVapidKey)
      });
      const user = JSON.parse(localStorage.user)
      const body = {id: user.userId, subscription}
      let res = await fetch("http://localhost:3000/api/subscribe", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "content-type": "application/json"
        }
      })
      res.json().then(res =>{
        user.subscribe = res.subscribe
        localStorage.user = JSON.stringify(user)
      }).catch(err => {
        console.log(err)
      })
    },
    urlBase64ToUint8Array({}, base64String) {
      const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
      const base64 = (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");

      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    }
  },
  getters: {
    users: state => state.users
  }
})