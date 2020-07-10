<template>
  <div id="app">
    <component :is="layout">
        <router-view></router-view>
    </component>
  </div>
</template>

<script>
import EmptyLayout from './layouts/Emptylayout.vue'
import MainLayout from './layouts/Mainlayout.vue'
import {mapActions} from 'vuex'
export default {
  name: 'App',
  computed: {
    layout(){
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  },
  components: {
    EmptyLayout, MainLayout
  }
}
</script>

<style>

</style>
