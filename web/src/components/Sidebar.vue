<template>
  <div id="sidebar" ref="sidebar">
    <div class="sidebar_btn" @click="sidebarTrigger">
      <i class="fa fa-th-list"></i>
    </div>
      <div class="sidebar_list">
        <div class="sidebar_item" v-for="item in listItems" :key="item.title">
          <router-link :to="item.href">
            <i :class="'fa ' + item.icon"></i>
            <span class="sidebar_item_text">{{ item.title }}</span>
          </router-link>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "sidebar",
  data() {
    return {
      listItems: [
        { title: "Главная", icon: "fa-home", href: "/" },
        { title: "Заявки", icon: "fa-file", href: "/claims" },
        { title: "Пользователи", icon: "fa-user", href: "/users" },
        { title: "Управления", icon: "fa-users", href: "/departaments" }
      ]
    };
  },
  methods: {
    sidebarTrigger() {
      document.querySelector("body").classList.toggle("sidebar");
      this.$refs.sidebar.classList.toggle("open");
    }
  }
};
</script>

<style>
</style>