<template>
  <div>
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
import {mapActions} from 'vuex'
export default {
  components: {
    AppHeader,
    AppSidebar,
    AppFooter
  },
  created() {
    setInterval(() => {
      this.refreshToken()
    }, 840000);
  },
  methods: {
    ...mapActions(['refreshToken'])
  },
};
</script>
