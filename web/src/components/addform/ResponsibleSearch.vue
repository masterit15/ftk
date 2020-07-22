<template>
    <div id="responsible_search">
            <label>Ответственный:</label>
            <b-form-input class="mb-md-3" v-model="respons" @input="responsibleDropDown" ref="responsible"></b-form-input>
            <transition name="addres-dd">
            <div class="addres_dd" v-if="responsibleDD">
              <b-dropdown-item 
              v-for="(user, index) in users" 
              :key="index" 
              @click.prevent="selectRespons(user.username, user.id),responsibleDD = false"
              >{{user.username}}
              </b-dropdown-item>
            </div>
            </transition>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  data() {
    return {
      respons: '',
      responsibleDD: false,
    }
  },
  computed: {
    ...mapGetters(['users']),
    responsibleFilter() {
      return this.users.filter(user => {
        return user.username
          .toLowerCase()
          .includes(this.respons.toLowerCase());
      });
    }
  },
  methods: {
    ...mapActions(['getUsers']),
    async responsibleDropDown(){
      let params = {
          page: 1,
          limit: 10,
          search: this.$refs.responsible.value,
        }
        let res = await this.getUsers(params)

      if(this.$refs.responsible.value && this.$refs.responsible.value.length >= 2){
        
        this.responsibleDD = true
        console.log(this.responsibleDD)
      }else{
        this.responsibleDD = false
      }
    },
    selectRespons(name, id){
      this.respons = name
      this.$emit('respons', id)
    }
  },
}
</script>