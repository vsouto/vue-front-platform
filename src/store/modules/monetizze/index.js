import * as mutations from "./mutations"
import * as actions from "./actions"
import * as getters from "./getters"

const state = {
  storeModuleDirectory: "monetizze",
  accounts: [],   // Every platform MUST have an "accounts" array state

  options: null
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
