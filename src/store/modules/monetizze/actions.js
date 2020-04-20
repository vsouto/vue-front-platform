import Vue from "vue"
import MonetizzeService from "@/monetizze/service"

export const getAccounts = ({
  state,
  commit,
  rootState,
  dispatch
}) => {
  const fetchAttr = "monetizze/fetchAccounts"
  if (!rootState.fetch_control[fetchAttr]) {
    commit("SET_FETCHING", fetchAttr, { root: true })

    if (Vue.mocksActive) {
      let mock = Vue.getMock(state.storeModuleDirectory, "accounts")
      if (mock) {
        commit("SET_ACCOUNTS", mock)
        commit("SET_FETCHED", fetchAttr, { root: true })
        return {data: {response: mock}}
      }
    }

    return MonetizzeService.getAccounts()
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
export const updateAccount = ({
  commit,
  dispatch
}, account) => {
  return MonetizzeService.patchAccount(account.id, account)
    .then((res) => {
      commit("NEW_ACCOUNTS", res.data.response)
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
  return MonetizzeService.deleteAccount(id)
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
export const newAccount = ({
  commit,
  dispatch,
  getters
}, api_key) => {

  const accounts = getters["accounts"]

  // Lets check if key already exists for this user
  if (accounts && accounts.length > 0) {
    for (let i=0; i<= accounts.length; i++) {
      if (typeof accounts[i] !== "undefined" && accounts[i].api_key === api_key) {
        return false
      }
    }
  }

  return MonetizzeService.postAccount(api_key)
    .then((res) => {
      let account = res.data.response
      commit("ADD_ACCOUNT", account)
      window.$notify({
        type: "success",
        message: res.data.message
      })
      return res
    })
    .catch(error => {
      dispatch("error", error, {
        root: true
      })
      return false
    })
}

export const fetchPanelOptions = ({ state, commit, dispatch }, accountId=null) => {
  const fetchAttr = "monetizze/fetchPanelOptions"

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

  return MonetizzeService.getPanelOptions(accountId)
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
