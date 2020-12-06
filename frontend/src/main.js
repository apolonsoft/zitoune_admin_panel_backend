import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/core/services/store";
import ApiService from "@/core/services/api.service";
import { VERIFY_AUTH } from "@/core/services/store/auth.module";
import { RESET_LAYOUT_CONFIG } from "@/core/services/store/config.module";
import VueSocketIO from "vue-socket.io";
// import LoadScript from "vue-plugin-load-script";

Vue.config.productionTip = false;

// Global 3rd party plugins
import "popper.js";
import "tooltip.js";
import PerfectScrollbar from "perfect-scrollbar";
window.PerfectScrollbar = PerfectScrollbar;
import ClipboardJS from "clipboard";
window.ClipboardJS = ClipboardJS;

// Vue 3rd party plugins
import i18n from "@/core/plugins/vue-i18n";
import vuetify from "@/core/plugins/vuetify";
import "@/core/plugins/portal-vue";
import "@/core/plugins/bootstrap-vue";
import "@/core/plugins/perfect-scrollbar";
import "@/core/plugins/highlight-js";
import "@/core/plugins/inline-svg";
import "@/core/plugins/apexcharts";
import "@/core/plugins/metronic";
import "@mdi/font/css/materialdesignicons.css";
import { webServerUrl } from "./core/util/constants/serverUrl";

// API service init
ApiService.init();

router.beforeEach((to, from, next) => {
  // Ensure we checked auth before each page load.
  Promise.all([store.dispatch(VERIFY_AUTH)]).then(next);
  // reset config to initial state
  store.dispatch(RESET_LAYOUT_CONFIG);

  // Scroll page to top on every route change
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
});

Vue.use(
  new VueSocketIO({
    debug: false,
    connection: webServerUrl,
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    },
    options: { path: "/sio/socket.io", transports: ["websocket"] }
  })
);
// Vue.use(LoadScript);
// Vue.loadScript("/js/request_signing.js");

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App)
}).$mount("#app");
