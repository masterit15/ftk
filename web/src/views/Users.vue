<template>
  <div id="users">
    <pre>{{users}}</pre>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
name: 'users',
data(){
  return {

  }
},
created() {
  this.getUsers()
},
computed: {
  ...mapGetters(['users'])
},
methods: {
  ...mapActions(['getUsers'])
},
}
</script>

<style>

</style>