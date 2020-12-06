import ApiService from "@/core/services/api.service";
import { SET_ERROR } from "./auth.module";

// action types
export const FETCH_WITHDRAW_REQUESTS = "fetchWithdrawRequests";
export const APPROVE_WITHDRAW_REQUEST = "approveWithdrawRequest";
export const REJECT_WITHDRAW_REQUEST = "rejectWithdrawRequest";

// mutation types
export const SET_WITHDRAW_REQUESTS = "setWithdrawRequests";
export const ADD_WITHDRAW_REQUEST = "addWithdrawRequest";
export const UPDATE_WITHDRAW_REQUEST = "updateWithdrawRequest";
export const SET_WITHDRAWS_LOADING = "setWithdrawsLoading";
export const SET_TOTAL_WITHDRAWS = "setTotalWithdraws";

const state = {
  withdrawRequests: [],
  withdrawsLoading: false,
  totalWithdraws: 0
};

const getters = {
  withdrawRequests(state) {
    return state.withdrawRequests;
  },
  withdrawsLoading(state) {
    return state.withdrawsLoading;
  },
  totalWithdraws(state) {
    return state.totalWithdraws;
  }
};

const convertWithdrawRequest = req => {
  return {
    id: req.id,
    userAddress: req.user_address,
    currency: req.currency,
    amount: req.amount,
    status: req.status,
    networkId: req.network_id,
    sessionId: req.session_id,
    created: req.created
  };
};

const actions = {
  [FETCH_WITHDRAW_REQUESTS](context, options) {
    context.commit(SET_WITHDRAWS_LOADING, true);
    return new Promise(resolve => {
      ApiService.post("withdraw_requests", options)
        .then(({ data }) => {
          context.commit(SET_TOTAL_WITHDRAWS, data.total);
          context.commit(SET_WITHDRAW_REQUESTS, data.withdraws);
          context.commit(SET_WITHDRAWS_LOADING, false);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
          context.commit(SET_WITHDRAWS_LOADING, false);
        });
    });
  },
  [APPROVE_WITHDRAW_REQUEST](context, data) {
    context.commit(SET_WITHDRAWS_LOADING, true);
    return new Promise(resolve => {
      ApiService.post("approve_withdraw_request", data)
        .then(({ data }) => {
          context.commit(SET_WITHDRAWS_LOADING, false);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
          context.commit(SET_WITHDRAWS_LOADING, false);
        });
    });
  },
  [REJECT_WITHDRAW_REQUEST](context, data) {
    context.commit(SET_WITHDRAWS_LOADING, true);
    return new Promise(resolve => {
      ApiService.post("reject_withdraw_request", data)
        .then(({ data }) => {
          context.commit(SET_WITHDRAWS_LOADING, false);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
          context.commit(SET_WITHDRAWS_LOADING, false);
        });
    });
  },
  SOCKET_WITHDRAW_CREATED(context, data) {
    context.commit(ADD_WITHDRAW_REQUEST, JSON.parse(data));
  },
  SOCKET_WITHDRAW_STATE_CHANGED(context, data) {
    context.commit(UPDATE_WITHDRAW_REQUEST, JSON.parse(data));
  }
};

const mutations = {
  [SET_WITHDRAW_REQUESTS](state, withdrawRequests) {
    state.withdrawRequests = withdrawRequests;
  },
  [SET_WITHDRAWS_LOADING](state, val) {
    state.withdrawsLoading = val;
  },
  [SET_TOTAL_WITHDRAWS](state, val) {
    state.totalWithdraws = val;
  },
  [ADD_WITHDRAW_REQUEST](state, req) {
    const newRequest = convertWithdrawRequest(req);
    state.withdrawRequests.unshift(newRequest);
  },
  [UPDATE_WITHDRAW_REQUEST](state, req) {
    const changedRequest = convertWithdrawRequest(req);
    state.withdrawRequests = [
      changedRequest,
      ...state.withdrawRequests.filter(wr => wr.id !== changedRequest.id)
    ];
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
