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
  created() {
    // запрос-перехватчик
    axios.interceptors.request.use(
      function(response) {
        //console.log("Сделать что-то перед отправкой запроса", response);
        return response;
      },
      function(error) {
        //console.log("Сделать что-то с ошибкой запроса ", error);
        return Promise.reject(error);
      }
    );
    // ответ перехватчик
    axios.interceptors.response.use(async response =>{
        if (response.data.token === false) {
          let res = await this.refreshToken()
          if(!res){
            await this.logout()
            router.push('/login')
          }
        }
        return response;
      }, async (error) =>{
        if(error.response.status === 401) {
        //  alert("Ваша сессия закончилась, пройдите повторную авторизацию");
            await this.logout()
            this.$router.push('/login')
        }
        //console.log("Делать что-то с ответными данными ошибки", error.response.status);
        //return Promise.reject(error);
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