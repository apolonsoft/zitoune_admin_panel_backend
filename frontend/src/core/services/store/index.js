import Vue from "vue";
import Vuex from "vuex";

import web3 from "./web3.module";
import users from "./users.module";
import bets from "./bets.module";
import chainEvents from "./chainEvents.module";
import appSettings from "./appSettings.module";
import withdrawRequests from "./withdrawRequests.module";
import auth from "./auth.module";
import htmlClass from "./htmlclass.module";
import config from "./config.module";
import breadcrumbs from "./breadcrumbs.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    web3,
    users,
    bets,
    chainEvents,
    appSettings,
    withdrawRequests,
    htmlClass,
    config,
    breadcrumbs
  }
});
