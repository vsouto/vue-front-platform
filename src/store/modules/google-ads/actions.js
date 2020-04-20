import Vue from "vue"
import GoogleAdsService from "@/google_ads/service"

// Profiles
export const fetchProfiles = ({ state, commit, rootState, dispatch }, isUpdate) => {
  const fetchAttr = "googleAds/profiles"
  if (isUpdate || !rootState.fetch_control[fetchAttr]) {
    commit("SET_FETCHING", fetchAttr, { root: true })

    if (Vue.mocksActive) {
      let mock = Vue.getMock(state.storeModuleDirectory, "profiles")
      if (mock) {
        commit("SET_PROFILES", mock)
        commit("SET_FETCHED", fetchAttr, { root: true })
        return {data: {response: mock}}
      }
    }

    return GoogleAdsService.getProfiles()
      .then((res) => {
        commit("SET_PROFILES", res.data.response)
        commit("SET_FETCHED", fetchAttr, { root: true })
        return res.data.response
      })
      .catch((error) => {
        dispatch("error", { fetchAttr, error }, {
          root: true
        })
      })
  }
}

export const authorizeProfile = ({ dispatch }, payload) => {
  return GoogleAdsService.authorizeProfile(payload.scope)
    .then((res) => {
      return res.data.response
    })
    .catch((error) => {
      dispatch("error", error, {
        root: true
      })
    })
}

export const deleteProfile = ({ commit, dispatch }, id) => {
  return GoogleAdsService.deleteProfile(id)
    .then(() => {
      commit("DEL_PROFILE", id)
    })
    .catch((error) => {
      dispatch("error", error, {
        root: true
      })
      throw error
    })
}

export const fetchAccounts = ({
  state,
  commit,
  rootState,
  dispatch
}, isUpdate) => {
  const fetchAttr = "googleAds/fetchAccounts"
  if (isUpdate || !rootState.fetch_control[fetchAttr]) {
    commit("SET_FETCHING", fetchAttr, { root: true })

    if (Vue.mocksActive) {
      let mock = Vue.getMock(state.storeModuleDirectory, "accounts")
      if (mock) {
        commit("SET_ACCOUNTS", mock)
        commit("SET_FETCHED", fetchAttr, { root: true })
        return {data: {response: mock}}
      }
    }

    return GoogleAdsService.getAccounts()
      .then((res) => {
        commit("SET_ACCOUNTS", res.data.response)
        commit("SET_FETCHED", fetchAttr, { root: true })
        return res
      })
      .catch(error => {
        dispatch("error", { fetchAttr, error }, {
          root: true
        })
      })
  }
}

export const addAccounts = ({ commit, dispatch }, { profileId, customerId, accounts }) => {
  return GoogleAdsService.postAccounts(profileId, customerId, accounts)
    .then((res) => {
      // commit("SET_CUSTOMER_ACCOUNTS", null)
      commit("SET_ACCOUNTS", accounts)
      return res.data.response
    })
    .catch((error) => {
      dispatch("error", error, {
        root: true
      })
    })
}

export const deleteAccount = ({
  commit,
  dispatch
}, id) => {
  return GoogleAdsService.deleteAccount(id)
    .then(() => {
      commit("DEL_ACCOUNT", id)
    })
    .catch(error => {
      dispatch("error", error, {
        root: true
      })
      throw error
    })
}

// Panel Options
export const fetchPanelOptions = ({ state, commit, dispatch }, accountId=null) => {
  const fetchAttr = "googleAds/fetchPanelOptions"

  if (Vue.mocksActive) {
    let mock
    if (accountId)
      mock = Vue.getMock(state.storeModuleDirectory, "panelOptionsChildren")
    else
      mock = Vue.getMock(state.storeModuleDirectory, "panelOptions")
    if (mock) {
      if (!accountId)
        commit("SET_PANEL_OPTIONS", mock)
      return mock
    }
  }

  return GoogleAdsService.getPanelOptions(accountId)
    .then((res) => {
      if (!accountId)
        commit("SET_PANEL_OPTIONS", res.data.response)
      return res.data.response
    }).catch((error) => {
      dispatch("error", { fetchAttr, error }, {
        root: true
      })
    })
}

// Remote
export const fetchProfileCustomers = ({ commit, rootState, dispatch }, {id}) => {
  const fetchAttr = "googleAds/fetchProfileCustomers"
  const fetchState = rootState.fetch_control[fetchAttr]
  if (fetchState == "fetching") return
  commit("SET_FETCHING", fetchAttr, { root: true })

  return GoogleAdsService.fetchProfileCustomers(id)
    .then((res) => {
      // commit("SET_PROFILE_ACCOUNTS", res.data.response)
      commit("SET_FETCHED", fetchAttr, { root: true })
      return res.data.response
    })
    .catch((error) => {
      dispatch("error", { fetchAttr, error }, {
        root: true
      })
    })
}

export const fetchProfileCustomerAccounts = ({ commit, rootState, dispatch }, {id, customerId}) => {
  const fetchAttr = `googleAds/fetchProfileCustomerAccounts/${id}/${customerId}`
  const fetchState = rootState.fetch_control[fetchAttr]
  if (fetchState == "fetching") return
  commit("SET_FETCHING", fetchAttr, { root: true })

  return GoogleAdsService.fetchProfileCustomerAccounts(id, customerId)
    .then((res) => {
      // commit("SET_PROFILE_ACCOUNTS", res.data.response)
      commit("SET_FETCHED", fetchAttr, { root: true })
      return res.data.response
    })
    .catch((error) => {
      dispatch("error", { fetchAttr, error }, {
        root: true
      })
    })
}
