import Vue from "vue";
import Vuelidate from 'vuelidate';
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import dateFilter from '@/filters/date.filter';
import currencyFilter from '@/filters/currency.filter';
import messagePlugin from '@/utils/message.plugin';
import Loader from '@/components/app/Loader';
import "materialize-css/dist/js/materialize.min";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database"

Vue.config.productionTip = false;

// Реєстрація плагіну за допомогою методу .use()
Vue.use(Vuelidate);
Vue.use(messagePlugin);
// Знаходиться в глобальный областы видимості
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
// Реєстрація компоненту
Vue.component('Loader', Loader);

firebase.initializeApp({
  apiKey: "AIzaSyC249dYNx-5RwF0PFTZg43W_7dq1we3ZJ0",
  authDomain: "vue-crm-local.firebaseapp.com",
  projectId: "vue-crm-local",
  storageBucket: "vue-crm-local.appspot.com",
  messagingSenderId: "850608289908",
  appId: "1:850608289908:web:94555ccb459bdbf66fb921",
  databaseURL: "https://vue-crm-local-default-rtdb.europe-west1.firebasedatabase.app/"
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
