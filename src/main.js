import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import dateFilter from '@/filters/date.filter'
import "materialize-css/dist/js/materialize.min";

Vue.config.productionTip = false;

// Знаходиться в глобальный областы видимості
Vue.filter('date', dateFilter);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");