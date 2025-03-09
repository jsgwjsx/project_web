import axios from "axios";
import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";


const routes = [
  { path: "/", redirect: '/login' },
  {
    path: "/body",
    name: "body",
    component: () => import('../App.vue')
  },
  {
    path: "/login",
    name: "login",
    component: () => import('../components/login.vue')
  },

]
const router = createRouter({
  history: createWebHistory(),
  routes: routes
})
router.beforeEach((to, from, next) => {
  //  if( to.fullPath!="login"){
  //    if(localStorage.getItem("sessionid")){
  //        next()
  //    }else{
  //     location.href="/login"
  //    }
  //  }else{
  //   next()
  //  }

  if (to.fullPath !== '/login') {
    axios.get('/api/work/verify').then(res => {
      if (res.data) {
        next()
      } else {
        location.href = '/login'
      }
    })
  } else {
    next()
  }
})
export default router
