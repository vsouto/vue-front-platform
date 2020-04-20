import Vue from "vue"
import GoogleAdsenseService from "@/google_adsense/service"

export const fetchAccounts = ({
  state,
  commit,
  rootState,
  dispatch
}, isUpdate) => {
  const fetchAttr = "googleAdsense/fetchAccounts"
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

    return GoogleAdsenseService.getAccounts()
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

export const authorizeAccount = ({ dispatch }, payload) => {
  return GoogleAdsenseService.authorizeAccount(payload.scope)
    .then((res) => {
      return res.data.response
    })
    .catch((error) => {
      dispatch("error", error, {
        root: true
      })
    })
}

export const addAccount = ({
  commit,
  dispatch
}, account) => {
  return GoogleAdsenseService.postAccount(account)
    .then(() => {
      commit("addAccount", account)
    })
    .catch(error => {
      dispatch("error", error, {
        root: true
      })
      throw error
    })
}

export const deleteAccount = ({
  commit,
  dispatch
}, id) => {
  return GoogleAdsenseService.deleteAccount(id)
    .then(() => {
      commit("deleteAccount", id)
    })
    .catch(error => {
      dispatch("error", error, {
        root: true
      })
      throw error
    })
}

export const fetchPanelOptions = ({ state, commit, dispatch }, accountId=null) => {
  const fetchAttr = "googleAdsense/fetchPanelOptions"

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

  return GoogleAdsenseService.getPanelOptions(accountId)
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
