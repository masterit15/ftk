<template>
    <div id="departament_search">
            <label>Управление (Отдел):</label>
            <b-form-input class="mb-md-3" v-model="departament" @input="departamentDropDown" ref="departament"></b-form-input>
            <transition name="addres-dd">
            <div class="addres_dd" v-if="departamentDD">
              <b-dropdown-item 
              v-for="(departament, index) in departaments" 
              :key="index" 
              @click.prevent="selectdepartament(departament.name, departament.departamentId),departamentDD = false"
              >{{departament.name}}
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
      departament: '',
      departamentDD: false,
    }
  },
  computed: {
    ...mapGetters(['departaments']),
    departamentFilter() {
      return this.departaments.filter(departament => {
        return departament.name
          .toLowerCase()
          .includes(this.departament.toLowerCase());
      });
    }
  },
  methods: {
    ...mapActions(['getDepartaments']),
    async departamentDropDown(){
      let params = {
          page: 1,
          limit: 10,
          search: this.$refs.departament.value,
        }
        let res = await this.getDepartaments()
      if(this.$refs.departament.value && this.$refs.departament.value.length >= 2){
        this.departamentDD = true
      }else{
        this.departamentDD = false
      }
    },
    selectdepartament(name, id){
      this.departament = name
      this.$emit('departament', id)
    }
  },
}
</script>

<style>

</style>