import * as mutations from "./mutations"
import * as actions from "./actions"
import * as getters from "./getters"

const state = {
  profiles: [],
  profiles_fetched: false,
  profile: null,
  accounts: [],
  accounts_fetched: false,
  account: null,
  web_properties: [],
  web_properties_fetched: false,
  web_property: null,
  views: [],
  views_fetched: false,
  active_views: [],
  active_views_fetched: false,
  selected_views: [],
  report: {},
  report_fetched: false,
  accountId: "",
  profileId: "",
  propertyId: "",
  viewId: "",

  options: null
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
