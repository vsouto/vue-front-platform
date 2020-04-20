import Vue from "vue"
import HotmartService from "@/hotmart/service"

export const fetchAccounts = ({
  commit,
  state,
  rootState,
  dispatch
}, isUpdate) => {
  const fetchAttr = "hotmart/fetchAccounts"
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

    return HotmartService.getAccounts()
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

export const authorizeAccount = ({ dispatch }) => {
  return HotmartService.authorizeAccount()
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
  return HotmartService.postAccount(account)
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

export const updateAccount = ({
  commit,
  dispatch
}, account) => {
  return HotmartService.updateAccount(account)
    .then(() => {
      commit("updateAccount", account)
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
  return HotmartService.deleteAccount(id)
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

export const fetchAffiliations = ({
  commit,
  dispatch
}, id) => {

  return HotmartService.getAffiliations(id)
    .then((res) => {
      commit("setAffiliations", { affiliations: res.data.response, id: id })
    })
    .catch(error => {
      dispatch("error", error, {
        root: true
      })
    })

}

export const fetchSubscriptions = ({
  commit,
  dispatch
}, id) => {

  return HotmartService.getSubscriptions(id)
    .then((res) => {
      commit("setSubscriptions", { subscriptions: res.data.response, id: id })
    })
    .catch(error => {
      dispatch("error", error, {
        root: true
      })
    })

}

export const fetchPanelOptions = ({ state, commit, dispatch }, accountId=null) => {
  const fetchAttr = "hotmart/fetchPanelOptions"

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

  return HotmartService.getPanelOptions(accountId)
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
