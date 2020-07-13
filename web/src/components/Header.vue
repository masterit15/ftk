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
          <b-avatar variant="info"></b-avatar>
          <b-nav-item-dropdown :text="user.username" right>
            <b-dropdown-item href="#">test1</b-dropdown-item>
            <b-dropdown-item href="#" @click="logOuted">Выход</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-col>
    </b-navbar>
    <transition name="slide-addform">
      <add-form v-if="formtrigger" />
    </transition>
  </div>
</template>

<script>
import AddForm from './AddForm'
import { mapGetters, mapActions } from "vuex";
export default {
  name: "headers",
  data() {
    return {
      formtrigger: false
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
        this.$router.push("/login");
      } else {
        this.$message("", "Возникла ошибка при выходе из системы", "warning");
      }
    },
    openEditForm() {
      if (this.formtrigger) {
        this.formtrigger = false;
      }
      setTimeout(() => {
        this.formtrigger = !this.formtrigger;
      }, 0);
    }
  },
  components: {
    AddForm
  }
};
</script>