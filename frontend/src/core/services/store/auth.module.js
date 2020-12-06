import ApiService from "@/core/services/api.service";
import JwtService from "@/core/services/jwt.service";

// action types
export const VERIFY_AUTH = "verifyAuth";
export const LOGIN = "login";
export const LOGOUT = "logout";
export const REGISTER = "register";
export const UPDATE_USER = "updateUser";
export const FETCH_WIN_LOSS = "fetchWinLoss";

// mutation types
export const PURGE_AUTH = "logOut";
export const SET_AUTH = "setUser";
export const VERIFY_USER = "verifyUser";
export const SET_ERROR = "setError";
export const SET_WIN_LOSS = "setWinLoss";

const state = {
  errors: null,
  user: {},
  winLoss: {},
  isAuthenticated: !!JwtService.getToken()
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  winLoss(state) {
    return state.winLoss;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  }
};

const actions = {
  [LOGIN](context, credentials) {
    return new Promise(resolve => {
      ApiService.post("token", credentials)
        .then(({ data }) => {
          context.commit(SET_AUTH, data);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
        });
    });
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
  },
  [REGISTER](context, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post("users", { user: credentials })
        .then(({ data }) => {
          context.commit(SET_AUTH, data);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
          reject(response);
        });
    });
  },
  [FETCH_WIN_LOSS](context, networkId) {
    ApiService.get(`win_loss/${networkId}`)
      .then(({ data }) => {
        context.commit(SET_WIN_LOSS, data);
      })
      .catch(({ response }) => {
        context.commit(SET_ERROR, response);
      });
  },
  [VERIFY_AUTH](context) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("users/me")
        // eslint-disable-next-line no-unused-vars
        .then(({ data }) => {
          // context.commit(SET_AUTH, data);
        })
        .catch(({ response }) => {
          context.commit(PURGE_AUTH);
          context.commit(SET_ERROR, response);
        });
    } else {
      context.commit(PURGE_AUTH);
    }
  },
  [UPDATE_USER](context, payload) {
    const { email, username, password, image, bio } = payload;
    const user = { email, username, bio, image };
    if (password) {
      user.password = password;
    }

    return ApiService.put("user", user).then(({ data }) => {
      context.commit(SET_AUTH, data);
      return data;
    });
  }
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_AUTH](state, data) {
    state.isAuthenticated = true;
    state.user = data.user;
    state.errors = {};
    JwtService.saveToken(data.access_token);
  },
  [SET_WIN_LOSS](state, data) {
    state.winLoss = data;
    state.errors = {};
  },
  [VERIFY_USER](state, user) {
    state.user = user;
    state.errors = {};
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    JwtService.destroyToken();
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
