import * as mutations from "./mutations"
import * as actions from "./actions"
import * as getters from "./getters"

const state = {
  accounts: [],
  accounts_fetched: false,
  account_id: "",
  products: [],
  products_fetched: false,
  orders: [],
  orders_fetched: false,

  options: null
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
