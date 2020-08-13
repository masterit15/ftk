<template>
  <div id="wrapper">
    <app-header />
    <app-sidebar />
    <main class="main-content" id="main-content">
      <transition name="slide-fade">
        <router-view />
      </transition>
    </main>
    <app-footer />
  </div>
</template>
<script>
import AppHeader from "../components/Header";
import AppSidebar from "../components/Sidebar";
import AppFooter from "../components/Footer";
import { mapActions, getters, mapGetters } from "vuex";
import axios from 'axios'
export default {
  components: {
    AppHeader,
    AppSidebar,
    AppFooter
  },
  sockets: {
    connect: function () {
            console.log('socket connected')
        },
  },
  created() {
    this.$socket.emit("userJoined", this.user)
    axios.interceptors.response.use(async response =>{
        return response;
      }, async (error) =>{
      let timeDiff = Math.abs(new Date().getTime() - this.user.expires_in);
      let diffTime = Math.round(((timeDiff % 86400000) % 3600000) / 60000);//Math.round(timeDiff / 1000); 
        if (error.response.status === 401 && diffTime >= 1) {
          let res = await this.refreshToken()
        }else if (!error.response.data.success){
            await this.logout()
            this.$socket.emit("userLeft", this.user)
            router.push('/login')
        }else{
            await this.logout()
            this.$socket.emit("userLeft", this.user)
            router.push('/login')
        }
        return Promise.reject(error);
      }
    );
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions(['refreshToken', 'logout'])
  }
};
</script>
<style lang="sass">
.slide-fade-enter-active
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1)
.slide-fade-enter,
.slide-fade-leave-to
  transform: translateX(50px)
  opacity: 0
</style>