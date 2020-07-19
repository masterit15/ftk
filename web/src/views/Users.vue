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
    getParams: {
      page: 1,
      limit: 6,
    }
  }
},
created() {
  this.getUsers(this.getParams)
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