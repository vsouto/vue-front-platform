import * as mutations from "./mutations"
import * as actions from "./actions"
import * as getters from "./getters"

const state = {
  storeModuleDirectory: "google-adsense",
  accounts: [],  // Every platform MUST have an "accounts" array state
  profiles: [],  // If platform have profiles, "profiles" state must be an array.

  options: null
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
