<template>
  <div id="app">
    <button @click="notify()" class="btn">sdsdsd</button>
    <component :is="layout">
      <router-view></router-view>
    </component>
  </div>
</template>

<script>
import EmptyLayout from "./layouts/Emptylayout.vue";
import MainLayout from "./layouts/Mainlayout.vue";
import { mapActions } from "vuex";
import axios from "axios";
export default {
  name: "App",
  computed: {
    layout() {
      return (this.$route.meta.layout || "empty") + "-layout";
    }
  },
  methods: {
    async notify() {
      let sw = await navigator.serviceWorker.ready;
      let push = await sw.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey:
          "BBcqtb8w1T4nMJOZTM6RLpPXAav11mgAW4F0T6M9TGpbS7pc_UiYgNytD18BRzmu3dhMIzQrJmtvIueQAc6exxo"
      });

      console.log(sw);
      axios
        .post("/push/", {
          body: JSON.stringify(succ)
        })
        .then(function(response) {
          if (!response.ok) {
            throw new Error("Bad status code from server.");
          }
          console.log(response);
          return response.json();
        })
        .then(function(responseData) {
          if (!(responseData.data && responseData.data.success)) {
            throw new Error("Bad response from server.");
          }
        });
    }
  },
  components: {
    EmptyLayout,
    MainLayout
  }
};
</script>

<style>
.btn {
  float: right;
}
</style>
