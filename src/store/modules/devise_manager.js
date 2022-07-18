import axios from 'axios'
const BASE_URL = process.env.VUE_APP_BASE_URL;

const state = {
  auth_token: null,
  user: {
    id: null,
    username: null,
    email: null,
  },
}
const getters = {
  getUser(state) {
    return state.user;
  },
  getAuthToken(state) {
    return state.auth_token;
  },
  getUserEmail(state) {
    return state.user?.email;
  },
  getUserID(state) {
    return state.user?.id;
  },
  isLoggedIn(state) {
    const loggedOut = state.auth_token == null || state.auth_token == JSON.stringify(null);
    return !loggedOut;
  },
  
}
const actions = {
  registerUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${BASE_URL}users`, { "user": { ...payload } })
        .then((response) => {
          commit("setUserInfo", response);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getCurrentUser({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${BASE_URL}users/sign_in`)
        .then((response) => {
          commit("setUserInfo", response);
          resolve(response);
          return response
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  loginUser({ commit }, payload) {
    //Delete token to avoid unauthorised error
    commit("resetUserInfo");
    return new Promise((resolve, reject) => {
      axios
        .post(`${BASE_URL}users/sign_in`, { "user": { ...payload } })
        .then((response) => {
          commit("setUserInfo", response);
          resolve(response);
          return response
        })
        .catch((error) => {
          reject(error);
          return error
        });
    });
  },
  logoutUser({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${BASE_URL}users/sign_out`)
        .then((response) => {
          commit("resetUserInfo");
          resolve(response);
          return response;
        })
        .catch((error) => {
          reject(error);
          return error;
        });
    });
  },
 
}
const mutations =
{
  setUserInfo(state, data) {
    state.user = data.data.user;
    if(data.headers.authorization !== undefined){
      state.auth_token = data.headers.authorization;
      axios.defaults.headers.common["Authorization"] = data.headers.authorization;
      localStorage.setItem("auth_token", data.headers.authorization);
    }
    else{
      state.auth_token = localStorage.getItem("auth_token");
    }
      
  },
  setUserInfoFromToken(state, data) {
    state.user = data.data.user;
    state.auth_token = localStorage.getItem("auth_token");
  },
  resetUserInfo(state) {
    state.user = {
      id: null,
      username: null,
      email: null,
    };
    state.auth_token = null;
    localStorage.removeItem("auth_token");
    axios.defaults.headers.common["Authorization"] = null;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

