import * as mutations from "./mutations"
import * as actions from "./actions"
import * as getters from "./getters"

const state = {
  accounts: [],
  accounts_fetched: false,
  profiles: [],
  profiles_fetched: false,

  options: null
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
