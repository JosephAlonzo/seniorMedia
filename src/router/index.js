import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
const BASE_URL = process.env.VUE_APP_BASE_URL;

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth){
    axios.get(`${BASE_URL}users/sign_in`)
    .then((response) => {
      if(response?.status == 200 ){
        next()
      }
    })
    .catch((error) => {
      if(error?.response?.status != 200 ){
        next({"name": "Login"})
      }
    });
  }
  else next()
})

export default router
