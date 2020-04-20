import Vue from "vue"
import Vuex from "vuex"

import createPersistedState from "vuex-persistedstate"
// import createLogger from "@/utils/logger"
// import * as Sentry from "@sentry/browser"
// import LogRocket from "logrocket"
// import createPlugin from "logrocket-vuex"

import Mocks from "@/store/mocks"
import state from "./state"
import * as mutations from "./mutations"
import * as actions from "./actions"
import * as getters from "./getters"

import limitedUser from "@/store/modules/limited-user"
import monetizze from "@/store/modules/monetizze"
import panel from "@/store/modules/panel"
import account from "@/store/modules/account"
import facebookAds from "@/store/modules/facebook-ads"
import googleAdsense from "@/store/modules/google-adsense"
import googleAds from "@/store/modules/google-ads"
import googleAnalytics from "@/store/modules/google-analytics"
import youtube from "@/store/modules/youtube"
import shopify from "@/store/modules/shopify"
import hotmart from "@/store/modules/hotmart"

Vue.use(Vuex)

if (process.env.VUE_APP_ENV === "local" && process.env.VUE_APP_MOCKS === "1" && !process.env.VUE_APP_TESTING)
  Vue.use(Mocks)

const ENV = process.env.VUE_APP_ENV
const pluginList = [
  // createLogger(),
  // createPlugin(LogRocket)
]
if (!Vue.mocksActive)
  pluginList.push(
    createPersistedState({
      key: "vuex/" + ENV + "/v2019-10-23",
      paths: [
        "account",
        "panel.panels",
        "panel.selectedDate",
        "panel.user_settings",
        "facebookAds.viewType",
        "facebookAds.viewColumns",
        "facebookAds.viewInsightColumns"
      ]
    })
  )

export default new Vuex.Store({
  modules: {
    limitedUser,
    panel,
    account,
    facebookAds,
    googleAdsense,
    googleAds,
    googleAnalytics,
    monetizze,
    youtube,
    shopify,
    hotmart
  },
  state: state,
  mutations,
  actions,
  getters,
  strict: false,
  plugins: pluginList
})
