import ApiService from "@/core/services/api.service";
import JwtService from "@/core/services/jwt.service";
import { FETCH_WIN_LOSS, SET_ERROR } from "./auth.module";

// action types
export const FETCH_USERS = "fetchUsers";
export const ALTER_USER = "alterUser";

// mutation types
export const SET_USERS = "setUsers";
export const ADD_USER = "addUser";
export const UPDATE_USER = "updateUser";
export const SET_USERS_LOADING = "setUsersLoading";
export const SET_TOTAL_USERS = "setTotalUsers";

const state = {
  errors: null,
  users: [],
  usersLoading: false,
  totalUsers: 0,
  isAuthenticated: !!JwtService.getToken()
};

const getters = {
  users(state) {
    return state.users;
  },
  usersLoading(state) {
    return state.usersLoading;
  },
  totalUsers(state) {
    return state.totalUsers;
  }
};

const actions = {
  [FETCH_USERS](context, options) {
    return new Promise(resolve => {
      context.commit(SET_USERS_LOADING, true);
      ApiService.post("users", options)
        .then(({ data }) => {
          context.commit(SET_TOTAL_USERS, data.total);
          context.commit(SET_USERS, data.users);
          context.commit(SET_USERS_LOADING, false);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_USERS_LOADING, false);
          context.commit(SET_ERROR, response.data.errors);
        });
    });
  },
  [ALTER_USER](context, options) {
    return new Promise(resolve => {
      context.commit(SET_USERS_LOADING, true);
      const { address } = options;
      delete options.address;
      ApiService.update("user", address, options)
        .then(({ data }) => {
          context.commit(UPDATE_USER, data);
          context.commit(SET_USERS_LOADING, false);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_USERS_LOADING, false);
          context.commit(SET_ERROR, response.data.errors);
        });
    });
  },
};

const mutations = {
  [SET_USERS](state, users) {
    state.users = users;
    state.errors = {};
  },
  [SET_USERS_LOADING](state, val) {
    state.usersLoading = val;
  },
  [SET_TOTAL_USERS](state, val) {
    state.totalUsers = val;
  },
  [ADD_USER](state, user) {
    state.users.unshift(user);
  },
  [UPDATE_USER](state, user) {
    state.users = [
      user,
      ...state.users.filter(u => u.address !== user.address)
    ];
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
