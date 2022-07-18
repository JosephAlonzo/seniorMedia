import Vue from 'vue'
import Vuex from 'vuex'
import deviseManager from "@/store/modules/devise_manager";
import users from "@/store/modules/users";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    deviseManager,
    users
  }
})
