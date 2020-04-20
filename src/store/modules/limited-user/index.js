
import * as mutations from "./mutations"
import * as actions from "./actions"
import * as getters from "./getters"

const state = {
  fetched: false,
  limited_users: [],
  limited_user: null
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
