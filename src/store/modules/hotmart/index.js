import * as mutations from "./mutations"
import * as actions from "./actions"
import * as getters from "./getters"

const state = {
  storeModuleDirectory: "hotmart",
  accounts: [],  // Every platform MUST have an "accounts" array state

  affiliations: [],
  affiliations_fetched_id: null,
  subscriptions: [],
  subscriptions_fetched_id: null,

  options: null
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
