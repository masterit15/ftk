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
export default {
  components: {
    AppHeader,
    AppSidebar,
    AppFooter
  }
};
</script>
