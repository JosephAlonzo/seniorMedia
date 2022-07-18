const BASE_URL = process.env.VUE_APP_BASE_URL;
import axios from 'axios'

  const state = {
    user: {
      id: null,
      email: null,
      tokens: null,
    },
    users:[],
    emailsList:[],
    selectedEmail: null
  }
  const getters = {
    getListUsers(state) {
      return state.users;
    },
    EmailsList(state) {
      return state.emailsList;
    },
    getSelectedEmail(state) {
      return state.selectedEmail;
    },
  }
  const actions = {
    getUsers({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${BASE_URL}users`, payload)
          .then((response) => {
            commit("setUsersInfo", response);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    sendTokens({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put(`${BASE_URL}users/${payload.id}`, { "tokens": payload.tokens } )
          .then((response) => {
            commit("updateUserInfo", response);
            resolve(response);
            return response;
          })
          .catch((error) => {
            reject(error);
            return error;
          });
      });
    },
    setSearch({ commit }, email) {
      commit("updateSelectedEmail", email);
    }
  }
  const mutations =
  {
    setUsersInfo(state, data) {
      state.users = []
      data.data.forEach(element => {
        state.users.push(element);
        state.emailsList.push(element.email);
      });
    },
    updateUserInfo(state, data){
      for (const key in state.users) {
        if(state.user[key] == data.id){
          state.user[key] = data
          break
        }
      }
    },
    updateSelectedEmail(state, data){
      state.selectedEmail = data;
    }
  }




export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

