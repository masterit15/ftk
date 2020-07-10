<template>
  <div id="sidebar">
    <b-sidebar
      id="sidebar-backdrop"
      title="АМС"
      shadow
      bg-variant="white"
    >
      <b-list-group>
        <b-list-group-item v-for="item in listItems" :key="item.title">
          <router-link :to="item.href">
            <i :class="'fa ' + item.icon"></i>
            {{ item.title }}
          </router-link>
        </b-list-group-item>
      </b-list-group>
    </b-sidebar>
  </div>
</template>

<script>
export default {
name: 'sidebar',
data(){
  return {
    listItems: [
        { title: "Главная", icon: "fa-home", href: "/" },
        { title: "Заявки", icon: "fa-file", href: "/claims" },
        { title: "Пользователи", icon: "fa-users", href: "/users" },
      ],
  }
},
methods: {

}
}
</script>

<style>

</style>