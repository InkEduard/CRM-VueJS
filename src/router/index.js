import Vue from "vue";
import Router from "vue-router";
import firebase from 'firebase/app';

Vue.use(Router);

// реєстрація сторінок
const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      meta: {
        layout: "empty",
      },
      component: () => import("../views/Login.vue"), // ледаче завантаження сторінки 
    },
    {
      path: "/register",
      name: "register",
      meta: {
        layout: "empty",
      },
      component: () => import("../views/Register.vue"),
    },
    {
      path: "/",
      name: "home",
      meta: {
        layout: "main",
        auth: true
      },
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/categories",
      name: "categories",
      meta: {
        layout: "main",
        auth: true
      },
      component: () => import("../views/Categories.vue"),
    },
    {
      path: "/record",
      name: "record",
      meta: {
        layout: "main",
        auth: true
      },
      component: () => import("../views/Record.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      meta: {
        layout: "main",
        auth: true
      },
      component: () => import("../views/Profile.vue"),
    },
    {
      path: "/planning",
      name: "planning",
      meta: {
        layout: "main",
        auth: true
      },
      component: () => import("../views/Planning.vue"),
    },
    {
      path: "/history",
      name: "history",
      meta: {
        layout: "main",
        auth: true
      },
      component: () => import("../views/History.vue"),
    },
    {
      path: "/detail/:id",
      name: "detail",
      meta: {
        layout: "main",
        auth: true
      },
      component: () => import("../views/Detail.vue"),
    },
  ]
});

// Додав захист router, якщо кастомер не зареєстр. не може зайти на любу сторінку
// окрім стор. реєстрації та логіна
router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requireAuth = to.matched.some(record => record.meta.auth);

  if (requireAuth && !currentUser) {
    next('/login?message=login');
  } else {
    next();
  }
});

export default router