<template>
  <div id="app">
    <component :is="layout">
      <router-view></router-view>
    </component>
  </div>
</template>

<script>
import EmptyLayout from "./layouts/Emptylayout.vue";
import MainLayout from "./layouts/Mainlayout.vue";
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import { respond } from "xstate/lib/actions";
export default {
  name: "App",
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(['user']),
    layout() {
      return (this.$route.meta.layout || "empty") + "-layout";
    }
  },
  async created() {
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
        //console.log("Делать что-то с ответными данными", response);
        return response;
      }, async (error) =>{
        //console.log("Делать что-то с ответными данными ошибки", error);
            await this.logout()
            this.$router.push('/login')
        return Promise.reject(error);
      }
    );
      
  },
  methods: {
    ...mapActions(['refreshToken', 'logout']),
  },
  components: {
    EmptyLayout,
    MainLayout
  }
};
</script>