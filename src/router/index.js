import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'index',
    meta: {
      title: "数据大屏"
    },
    component: () => import("@/views/index.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue")
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("tk");
  // if (!token && to['path'] != '/login' && (to['meta']['noToken'] != true)) {
  //   next({
  //     name: 'login'
  //   });
  // } else {
  //   next();
  // }
  next()
})
router.onError(err => {
  console.log(err);
})
export default router