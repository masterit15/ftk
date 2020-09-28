<template>
  <div id="headers">
    <b-navbar toggleable="lg" variant="white" >
      <b-col sm="4">
        <b-form-input class="float-right" type="search" placeholder="Поиск"></b-form-input>
      </b-col>
      <b-col sm="4" offset-xl="4">
        <b-navbar-nav>
          <!-- <b-nav-item href="#">Link</b-nav-item> -->
        </b-navbar-nav>
        <b-button variant="outline-success" @click="openEditForm">
          <b-icon icon="plus-square"></b-icon>
          Добавить
        </b-button>
        <b-navbar-nav class="float-right">
          <div v-bind:class="this.notifyed.length > 0 ? 'notify is_active' : 'notify'" ref="notify" @click="shownotify=!shownotify">
            <i class="fa fa-bell-o"></i>
          </div>
          <b-avatar :src="user.avatar"></b-avatar>
          <b-nav-item-dropdown right>
            <b-dropdown-item href="#">test1</b-dropdown-item>
            <b-dropdown-item href="#" @click="logOuted">Выход</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-col>
    </b-navbar>
    <transition name="v-transition-animate">
      <div class="notifyed" v-if="shownotify">
          <transition-group name="v-transition-animate" tag="ul">
            <li v-for="(noti, i) in notifyed" :key="noti.title+'-'+i">
              <h6><i :class="'fa '+noti.icon" @click="closeNotify($event, i)"></i> {{noti.title}}</h6>
              <p>{{noti.text}}</p>
            </li>
          </transition-group>
      </div>
    </transition>
    <transition name="v-transition-animate">
      <add-form v-if="form" v-on:form="openForm"/>
    </transition>
  </div>
</template>

<script>
import AddForm from './AddForm'
import { mapGetters, mapActions } from "vuex";
const audio = new Audio('static/notify.mp3');
export default {
  name: "headers",
  data() {
    return {
      form: false,
      shownotify: false,
      notifyed: [
        {title: "Test1", text: "werewrwer", icon: "fa-times"},
        {title: "Test2", text: "werewrwer", icon: "fa-times"},
        {title: "Test3", text: "werewrwer", icon: "fa-times"}
      ]
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    ...mapActions(["logout"]),
    async logOuted() {
      let res = await this.logout(this.user.refreshToken);
      if (res) {
        this.$socket.emit("userLeft", this.user)
        this.$router.push("/login");
      } else {
        this.$message("", "Возникла ошибка при выходе из системы", "warning");
      }
    },
    closeNotify($event, i){
      this.notifyed.splice(i, 1)
    },
    openEditForm() {
      if (audio) {
          audio.play();
      }
      if (this.form) {
        this.form = false;
      }
      setTimeout(() => {
        this.form = !this.form;
      }, 0);
    },
    openForm(param){
      this.form = param
    }
  },
  components: {
    AddForm
  }
};
</script>