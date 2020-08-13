<template>
  <div id="departaments">
    <b-table striped hover :items="departaments" :fields="fields">
      <template v-slot:cell(users)="data">
        <b-avatar-group size="50px">
          <b-avatar
            v-for="user in data.item.users"
            :key="user.id"
            :src="user.avatar"
            v-b-tooltip.hover
            :title="user.username"
          ></b-avatar>
        </b-avatar-group>
      </template>
      <template v-slot:cell(options)="data">
        <div class="user_option" @click="droupdownOpen($event, data.index)">
          <i class="fa fa-ellipsis-v"></i>
        </div>
        <div class="droupdown" ref="option">
          <div class="droupdown_overlay" @click="droupdownClose"></div>
          <b-dropdown-item @click="deleteEvents(data.id), droupdownClose">
            <i class="fa fa-trash"></i> Удалить
          </b-dropdown-item>
          <b-dropdown-item @click="editEvents(data)">
            <i class="fa fa-pencil"></i> Редактировать
          </b-dropdown-item>
        </div>
      </template>
    </b-table>
    <pre>{{departaments}}</pre>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "departaments",
  data() {
    return {
      fields: [
        {
          key: "id",
          sortable: true,
        },
        {
          key: "name",
          label: "Название",
          sortable: true,
        },
        {
          key: "users",
          sortable: false,
          label: 'Пользователи',
          sortable: true,
        },
        {
          key: "options",
          label: 'Редактировать/Удалить',
        },
      ],
      getParams: {
        page: 1,
        limit: 6,
      },
    };
  },
  created() {
    this.getDepartaments(this.getParams);
  },
  computed: {
    ...mapGetters(["departaments"]),
  },
  methods: {
    ...mapActions(["getDepartaments", "deleteDepartament"]),
    editEvents(departament) {},
    deleteEvents(id) {
      this.deleteDepartament(id);
    },
    droupdownOpen(ev, i) {
      ev.target.nextElementSibling.classList.add("active")
    },
    droupdownClose() {
      let drp = document.getElementsByClassName('droupdown')
      Object.keys(drp).map(el => {
        drp[el].classList.remove("active")
      });
      
    },
  },
};
</script>

<style lang="sass">
#departaments
  & td[aria-colindex="4"]
    position: relative
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