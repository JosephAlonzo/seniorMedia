import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
Vue.config.productionTip = false
import axios from 'axios'

/**
 * Load JWT from Local Storage on Refresh.
 */
 let localAuthToken = localStorage.auth_token;
 let cookieExists = localAuthToken !== "undefined" && localAuthToken !== null;
 if (cookieExists) {
   const auth_token = localStorage.getItem("auth_token");
   const authTokenExists = auth_token !== "undefined" && auth_token !== null;
   if (authTokenExists) {
    axios.defaults.headers.common["Authorization"] = auth_token
   }
 }

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
