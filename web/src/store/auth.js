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
    async authorization({commit, dispatch}, data){
      let res = await axios.post('/api/auth/login', data)
      localStorage.setItem('user', JSON.stringify(res.data))
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`
      if (!res.data.subscription){
        dispatch('subscribeUser')
      }
      commit('set_user', res.data)
      return res.data.success
    },
    async register({}, data){
      let res = await axios.post('/api/auth/register', data)
      return res.data
    },
    async refreshToken({}){
      let user = await JSON.parse(localStorage.getItem('user'))
      let res = await axios.post('/api/auth/token', { token: user.refreshToken})
      user.accessToken = res.data.accessToken
      user.refreshToken = res.data.refreshToken
      user.expires_in = res.data.expires_in
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`
      localStorage.setItem('user', JSON.stringify(user))
      return res.data
    },
    async logout({}){
      let user = await JSON.parse(localStorage.getItem('user'))
      let res = await axios.delete('/api/auth/logout', {params:{token: user.refreshToken}})
      if(res.data.success){
        localStorage.removeItem('user')
        delete axios.defaults.headers.common['Authorization']
      }
      return res.data.success
    },
    async subscribeUser({ dispatch }) {
      const register = await navigator.serviceWorker.register(
        "../static/service-worker.js"
      );
      const publicVapidKey = "BBcqtb8w1T4nMJOZTM6RLpPXAav11mgAW4F0T6M9TGpbS7pc_UiYgNytD18BRzmu3dhMIzQrJmtvIueQAc6exxo"
      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: await dispatch('urlBase64ToUint8Array', publicVapidKey)
      });
      const user = JSON.parse(localStorage.user)
      const body = { id: user.userId, subscription }
      let res = await fetch("http://localhost:3000/api/subscribe", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "content-type": "application/json"
        }
      })
      res.json().then(res => {
        user.subscribe = res.subscribe
        localStorage.user = JSON.stringify(user)
      }).catch(err => {
        console.log(err)
      })
    },
    urlBase64ToUint8Array({ }, base64String) {
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
    user: state => state.user
  }
})