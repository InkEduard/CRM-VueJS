import Vue from "vue";
import Vuelidate from 'vuelidate';
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import dateFilter from '@/filters/date.filter';
import messagePlugin from '@/utils/message.plugin';
import "materialize-css/dist/js/materialize.min";

Vue.config.productionTip = false;

// Реєстрація плагіну за допомогою методу .use()
Vue.use(Vuelidate);
Vue.use(messagePlugin);
// Знаходиться в глобальный областы видимості
Vue.filter('date', dateFilter);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
