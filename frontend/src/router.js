import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
      component: () => import("@/view/layout/Layout"),
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("@/view/pages/Dashboard.vue")
        },
        {
          path: "/builder",
          name: "builder",
          component: () => import("@/view/pages/Builder.vue")
        },
        {
          path: "/vuetify",
          name: "vuetify",
          component: () => import("@/view/pages/vuetify/Vuetify.vue"),
          children: [
            {
              path: "/deposit-withdraw",
              name: "users",
              component: () =>
                import("@/view/pages/deposit-withdraw/DepositWithdraw.vue")
            },
            {
              path: "/users",
              name: "users",
              component: () => import("@/view/pages/users/Users.vue")
            },
            {
              path: "/bets",
              name: "bets",
              component: () => import("@/view/pages/bets/Bets.vue")
            },
            {
              path: "/chain-events",
              name: "chain-events",
              component: () =>
                import("@/view/pages/chain-events/ChainEvents.vue")
            },
            {
              path: "/withdraw-requests",
              name: "withdraw-requests",
              component: () =>
                import("@/view/pages/withdraw-requests/WithdrawRequests.vue")
            },
            {
              path: "/app-settings",
              name: "app-settings",
              component: () =>
                import("@/view/pages/app-settings/AppSettings.vue")
            }
          ]
        }
      ]
    },
    {
      path: "/",
      component: () => import("@/view/pages/auth/Auth"),
      children: [
        {
          name: "login",
          path: "/login",
          component: () => import("@/view/pages/auth/Login")
        }
      ]
    },
    {
      path: "*",
      redirect: "/404"
    },
    {
      // the 404 route, when none of the above matches
      path: "/404",
      name: "404",
      component: () => import("@/view/pages/error/Error-1.vue")
    }
  ]
});
