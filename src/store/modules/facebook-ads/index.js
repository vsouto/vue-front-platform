import * as mutations from "./mutations"
import * as actions from "./actions"
import * as getters from "./getters"

const state = {
  storeModuleDirectory: "facebook-ads",
  accounts: [],  // Every platform MUST have an "accounts" array state
  profiles: [],  // If platform have profiles, "profiles" state must be an array.
  profile_businesses: {},
  business_accounts: {},

  insights: {},
  selected_accounts: [],
  business_id: "",
  campaigns: {},
  adsets: {},
  ads: {},
  creatives: {},
  table_selected_ids: {},

  viewType: "info",
  viewColumns: {},
  viewInsightColumns: {},
  options: null
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
