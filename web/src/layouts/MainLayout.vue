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
import {mapActions} from 'vuex'
export default {
  components: {
    AppHeader,
    AppSidebar,
    AppFooter
  },
  created() {
    this.subscribeUser()
  },
  methods: {
    ...mapActions(['refreshToken', 'subscribeUser'])
  },
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