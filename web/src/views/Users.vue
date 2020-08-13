<template>
  <div id="users">
    <b-container>
    <!-- <pre>{{users}}</pre> -->
    <b-card-group deck>
    <b-card v-for="(user, i) in users" :key="i" :title="user.username"
    tag="article"
    style="max-width: 20rem;"
    class="mb-2">
      <b-card-text>
        Далеко-далеко за словесными горами в стране, гласных и согласных живут рыбные тексты. Вопроса однажды рукописи страна маленькая строчка реторический пояс. Предупредила, ты залетают снова рыбного всеми несколько решила своего вскоре это злых?
      </b-card-text>
      <template v-slot:footer>
        <div class="user_option" @click="droupdownOpen($event, i)">
          <i class="fa fa-ellipsis-v"></i>
        </div>
        <div class="droupdown" ref="option">
          <div class="droupdown_overlay" @click="droupdownClose"></div>
          <b-dropdown-item @click="deleteEvents(user.id), droupdownClose"><i class="fa fa-trash"></i> Удалить</b-dropdown-item>
          <b-dropdown-item @click="editEvents(user)"><i class="fa fa-pencil"></i> Редактировать</b-dropdown-item>
        </div>
      </template>
    </b-card>
  </b-card-group>
  </b-container>
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
  ...mapActions(['getUsers']),
  editEvents(user){
    
  },
  deleteEvents(id){
    this.deleteUser(id)
  },
  droupdownOpen(ev, i){
      this.$refs.option.forEach(element => {
        element.classList.remove('active')
      });
      this.$refs.option[i].classList.add('active')
    },
    droupdownClose(){
      this.$refs.option.forEach(element => {
        element.classList.remove('active')
      });
    }
},
}
</script>

<style lang="sass">
.user_option
  position: relative
  float: right
  cursor: pointer
  border-radius: 10px 
  width: 40px
  height: 40px
  line-height: 40px
  text-align: center
  z-index: 0
  &:hover
    background-color: #eee
.droupdown
  position: absolute
  display: none
  right: 0
  top: 100%
  width: 100%
  max-width: 220px
  background-color: #fff
  border-radius: 5px
  overflow: hidden
  box-shadow: 0 10px 10px 5px rgba(0,0,0,0.03)
  border: 1px solid rgba(0,0,0,0.125)
  z-index: 20
  & li
    list-style-type: none
    position: relative
    z-index: 55
  .dropdown-item
    padding: 10px 15px
  &.active
    display: block
    & .droupdown_overlay
      display: block
  &_overlay
    position: fixed
    display: none
    left: 0
    top: 0
    width: 100%
    height: 100%
    background-color: transparent
    z-index: 50
</style>