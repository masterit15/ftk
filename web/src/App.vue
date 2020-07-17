<template>
  <div id="app">
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
  data() {
    return {
      publicKey:
        "BBcqtb8w1T4nMJOZTM6RLpPXAav11mgAW4F0T6M9TGpbS7pc_UiYgNytD18BRzmu3dhMIzQrJmtvIueQAc6exxo"
    };
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || "empty") + "-layout";
    }
  },
  created() {
    if ("serviceWorker" in navigator) {
      this.send().catch(err => {
        console.error(err);
      });
    }
  },
  methods: {
    async send() {
      const publicVapidKey = "BBcqtb8w1T4nMJOZTM6RLpPXAav11mgAW4F0T6M9TGpbS7pc_UiYgNytD18BRzmu3dhMIzQrJmtvIueQAc6exxo"
      const register = await navigator.serviceWorker.register("~/piblic/service-worker.js");
      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(publicVapidKey)
      });
      const body = JSON.stringify(subscription)
      await fetch("/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
          "content-type": "application/json"
        }
      });
    },
    urlBase64ToUint8Array(base64String) {
      const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
      const base64 = (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");

      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    }
  },
  components: {
    EmptyLayout,
    MainLayout
  }
};
</script>