import Vue from "vue"
import FacebookAdsService from "@/facebook_ads/service"
import Insight from "@/facebook_ads/models/stats"


// Profiles

export const fetchProfiles = ({ state, commit, rootState, dispatch }, isUpdate) => {
  const fetchAttr = "facebookAds/profiles"
  if (isUpdate || !rootState.fetch_control[fetchAttr]) {
    commit("SET_FETCHING", fetchAttr, { root: true })

    if (Vue.mocksActive) {
      let mock = Vue.getMock(state.storeModuleDirectory, "profiles")
      if (mock) {
        commit("SET_PROFILES", mock)
        commit("SET_FETCHED", fetchAttr, { root: true })
        return Vue.mockAsResponse
      }
    }

    return FacebookAdsService.getProfiles()
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
  return FacebookAdsService.authorizeProfile(payload.scope)
    .then((res) => {
      return res.data.response
    })
    .catch((error) => {
      dispatch("error", error, {
        root: true
      })
    })
}

export const addProfile = ({ commit, dispatch }, profile) => {
  return FacebookAdsService.postProfile(profile)
    .then(() => {
      commit("SET_PROFILE", profile)
    })
    .catch((error) => {
      dispatch("error", error, {
        root: true
      })
      throw error
    })
}

export const deleteProfile = ({ commit, dispatch }, id) => {
  return FacebookAdsService.deleteProfile(id)
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

export const fetchProfileBusinesses = ({ state, commit, rootState, dispatch }, profile) => {
  const fetchAttr = "facebookAds/profileBusinesses"
  if (!rootState.fetch_control[fetchAttr]) {
    commit("SET_FETCHING", fetchAttr, { root: true })

    if (Vue.mocksActive) {
      let mock = Vue.getMock(state.storeModuleDirectory, "businesses")
      if (mock) {
        commit("SET_PROFILE_BUSINESSES", {
          id: profile.id,
          businesses: mock
        })
        commit("SET_FETCHED", fetchAttr, { root: true })
        return {data: {response: mock}}
      }
    }

    return FacebookAdsService.getProfileBusinesses(profile.id)
      .then((res) => {
        commit("SET_PROFILE_BUSINESSES", {
          id: profile.id,
          businesses: res.data.response
        })
        commit("SET_FETCHED", fetchAttr, { root: true })
        return res
      })
      .catch((error) => {
        dispatch("error", { fetchAttr, error }, {
          root: true
        })
      })
  }
}

export const fetchBusinessAccounts = ({ state, commit, rootState, dispatch }, payload) => {
  const fetchAttr = `facebookAds/businessAccounts/${payload.business_id}`,
    fetchState = rootState.fetch_control[fetchAttr]
  if (fetchState !== "fetched") {
    fetchState !== "fetching" && commit("SET_FETCHING", fetchAttr, { root: true })

    if (Vue.mocksActive) {
      let mock = Vue.getMock(state.storeModuleDirectory, "profileAccounts")
      if (mock) {
        commit("SET_BUSINESS_ACCOUNTS", {
          profile_id: payload.id,
          business_id: payload.business_id,
          accounts: mock
        })
        commit("SET_FETCHED", fetchAttr, { root: true })
        return {data: {response: mock}}
      }
    }

    return FacebookAdsService.getProfileBusinessAccounts(payload.id, payload.business_id)
      .then((res) => {
        if (res.status == 200) {
          commit("SET_BUSINESS_ACCOUNTS", {
            profile_id: payload.id,
            business_id: payload.business_id,
            accounts: res.data.response
          })
          commit("SET_FETCHED", fetchAttr, { root: true })
        }
        return res
      })
      .catch((error) => {
        dispatch("error", { fetchAttr, error }, {
          root: true
        })
      })
  }
}


// Accounts
export const fetchAccounts = ({ state, commit, rootState, dispatch }, payload={}) => {
  const fetchAttr = "facebookAds/accounts"

  let fetchState = rootState.fetch_control[fetchAttr]
  if (fetchState == "fetching") return

  commit("SET_FETCHING", fetchAttr, { root: true })

  if (Vue.mocksActive) {
    let mock = Vue.getMock(state.storeModuleDirectory, "accounts")
    if (mock) {
      commit("SET_ACCOUNTS", mock)
      commit("SET_FETCHED", fetchAttr, { root: true })
      return Vue.mockAsResponse
    }
  }

  return FacebookAdsService.getAccounts(payload.filters, payload.params)
    .then((res) => {
      commit("SET_ACCOUNTS", res.data.response)
      commit("SET_FETCHED", fetchAttr, { root: true })
      return res.data
    })
    .catch((error) => {
      dispatch("error", { fetchAttr, error }, {
        root: true
      })
    })
}

export const addAccounts = ({ commit, dispatch }, payload) => {
  return FacebookAdsService.postAccounts(payload.profile_id, payload.accounts)
    .then((res) => {
      commit("SET_ACCOUNTS", payload.accounts)
      return res.data.response
    })
    .catch((error) => {
      dispatch("error", error, {
        root: true
      })
    })
}

export const deleteAccount = ({ commit, dispatch }, payload) => {
  return FacebookAdsService.deleteAccount(payload.profile_id, payload.id)
    .then(() => {
      commit("DEL_ACCOUNT", payload.id)
    })
    .catch((error) => {
      dispatch("error", error, {
        root: true
      })
      throw error
    })
}

export const selectAccountToAdd = ({ commit, getters, state }, payload) => {
  // console.debug("selectAccountToAdd ", payload)
  const acc = payload.acc
  const toggle = payload.toggle
  const accountExists = getters["getAccountById"](acc.id) === undefined
  if (toggle && accountExists) {
    if (state.selected_accounts.findIndex((o) => o.id === acc.id) == -1)
      commit("ADD_SELECTED_ACCOUNT", acc)
  } else if (!toggle && accountExists) {
    commit("DEL_SELECTED_ACCOUNT", acc)
  }
}

// Account Insights
export const fetchAccountInsights = ({ commit, rootState, dispatch }, payload={}) => {
  const fetchAttr = "facebookAds/fetchAccountInsights"

  let fetchState = rootState.fetch_control[fetchAttr]
  if (fetchState == "fetching") return

  commit("SET_FETCHING", fetchAttr, { root: true })

  return FacebookAdsService.getAccountInsights(payload.filters, payload.params)
    .then((res) => {
      commit("SET_FETCHED", fetchAttr, { root: true })
      let insights = res.data && res.data.response || []
      insights = insights.map(i => new Insight(i))
      commit("SET_INSIGHTS", insights)
      return res.data
    })
    .catch((error) => {
      dispatch("error", { fetchAttr, error }, {
        root: true
      })
    })
}

// Remote API: Campaigns

export const updateCampaign = ({ commit, dispatch }, payload) => {

  return FacebookAdsService.postUpdateCampaign(
    payload.profile_id,
    payload.account_id,
    payload.campaign_id,
    payload.campaign
  )
    .then((res) => {
      commit("UPDATE_CAMPAIGN", res.data.response)
      // console.debug("postUpdateCampaign res", res)
      return res
    })
    .catch((error) => {
      dispatch("error", error, {
        root: true
      })
    })

}

export const fetchCampaigns = ({ state, commit, rootState, dispatch }, {filters, params}) => {
  const fetchAttr = "facebookAds/fetchCampaigns"

  let fetchState = rootState.fetch_control[fetchAttr]
  if (fetchState == "fetching") return

  commit("SET_FETCHING", fetchAttr, { root: true })

  if (Vue.mocksActive) {
    commit("SET_FETCHED", fetchAttr, { root: true })
    let mocks = Vue.getMock(state.storeModuleDirectory, "campaigns2.0")
    commit("SET_CAMPAIGNS", mocks)
    return Vue.mockAsResponse
  }

  return FacebookAdsService.getCampaigns(filters, params)
    .then((res) => {
      commit("SET_CAMPAIGNS", res.data.response)
      commit("SET_FETCHED", fetchAttr, { root: true })
      return res.data
    })
    .catch((error) => {
      dispatch("error", { fetchAttr, error }, {
        root: true
      })
    })
}

// Campaign Insights
export const fetchCampaignInsights = ({ commit, rootState, dispatch }, payload={}) => {
  const fetchAttr = "facebookAds/fetchCampaignInsights"

  let fetchState = rootState.fetch_control[fetchAttr]
  if (fetchState == "fetching") return

  commit("SET_FETCHING", fetchAttr, { root: true })

  return FacebookAdsService.getCampaignInsights(payload.filters, payload.params)
    .then((res) => {
      commit("SET_FETCHED", fetchAttr, { root: true })
      let insights = res.data && res.data.response || []
      insights = insights.map(i => new Insight(i))
      commit("SET_INSIGHTS", insights)
      return res.data
    })
    .catch((error) => {
      dispatch("error", { fetchAttr, error }, {
        root: true
      })
    })
}

// Remote API: Adsets

export const updateAdset = ({ commit, dispatch }, payload) => {

  return FacebookAdsService.postUpdateAdset(payload.profile_id, payload.account_id, payload.adset_id, payload.adset)
    .then((res) => {
      commit("UPDATE_ADSET", res.data.response)
      // console.debug("postUpdateAdset res", res)
      return res
    })
    .catch((error) => {
      dispatch("error", error, {
        root: true
      })
    })

}

export const fetchAdsets = ({ state, commit, rootState, dispatch }, {filters, params}) => {
  const fetchAttr = "facebookAds/fetchAdsets"
  let fetchState = rootState.fetch_control[fetchAttr]
  if (fetchState == "fetching") return

  commit("SET_FETCHING", fetchAttr, { root: true })

  if (Vue.mocksActive) {
    commit("SET_FETCHED", fetchAttr, { root: true })
    let mocks = Vue.getMock(state.storeModuleDirectory,"adset")
    commit("SET_ADSETS", mocks)
    return Vue.mockAsResponse
  }

  return FacebookAdsService.getAdsets(filters, params)
    .then((res) => {
      commit("SET_ADSETS", res.data.response)
      commit("SET_FETCHED", fetchAttr, { root: true })
      return res.data
    })
    .catch((error) => {
      dispatch("error", { fetchAttr, error }, {
        root: true
      })
    })
}


// Adset Insights
export const fetchAdsetInsights = ({ commit, rootState, dispatch }, payload={}) => {
  const fetchAttr = "facebookAds/fetchAdsetInsights"

  let fetchState = rootState.fetch_control[fetchAttr]
  if (fetchState == "fetching") return

  commit("SET_FETCHING", fetchAttr, { root: true })

  return FacebookAdsService.getAdsetInsights(payload.filters, payload.params)
    .then((res) => {
      commit("SET_FETCHED", fetchAttr, { root: true })
      let insights = res.data && res.data.response || []
      insights = insights.map(i => new Insight(i))
      commit("SET_INSIGHTS", insights)
      return res.data
    })
    .catch((error) => {
      dispatch("error", { fetchAttr, error }, {
        root: true
      })
    })
}

// Remote API: Ads

export const updateAd = ({ commit, dispatch }, payload) => {

  return FacebookAdsService.postUpdateAd(payload.profile_id, payload.account_id, payload.ad_id, payload.ad)
    .then((res) => {
      commit("UPDATE_AD", res.data.response)
      // console.debug("postUpdateAd res", res)
      return res
    })
    .catch((error) => {
      dispatch("error", error, {
        root: true
      })
    })

}

export const fetchAds = ({ state, commit, rootState, dispatch }, {filters, params}) => {
  const fetchAttr = "facebookAds/fetchAds"

  let fetchState = rootState.fetch_control[fetchAttr]
  if (fetchState == "fetching") return

  commit("SET_FETCHING", fetchAttr, { root: true })

  if (Vue.mocksActive) {
    commit("SET_FETCHED", fetchAttr, { root: true })
    let mocks = Vue.getMock(state.storeModuleDirectory,"ads")
    commit("SET_ADS", mocks.data.response)
    return mocks
  }

  return FacebookAdsService.getAds(filters, params)
    .then((res) => {
      commit("SET_ADS", res.data.response)
      commit("SET_FETCHED", fetchAttr, { root: true })
      return res.data
    })
    .catch((error) => {
      dispatch("error", { fetchAttr, error }, {
        root: true
      })
    })
}

// Ad Insights
export const fetchAdInsights = ({ commit, rootState, dispatch }, payload={}) => {
  const fetchAttr = "facebookAds/fetchAdInsights"

  let fetchState = rootState.fetch_control[fetchAttr]
  if (fetchState == "fetching") return

  commit("SET_FETCHING", fetchAttr, { root: true })

  return FacebookAdsService.getAdInsights(payload.filters, payload.params)
    .then((res) => {
      commit("SET_FETCHED", fetchAttr, { root: true })
      let insights = res.data && res.data.response || []
      insights = insights.map(i => new Insight(i))
      commit("SET_INSIGHTS", insights)
      return res.data
    })
    .catch((error) => {
      dispatch("error", { fetchAttr, error }, {
        root: true
      })
    })
}

export const fetchCreatives = ({ state, commit }, payload) => {

  const fetchAttr = "facebookAds/fetchCreatives"
  const { filters } = payload

  commit("SET_FETCHING", fetchAttr, { root: true })

  if (Vue.mocksActive) {
    commit("SET_FETCHED", fetchAttr, { root: true })
    let mocks = Vue.getMock(state.storeModuleDirectory, "creatives")
    commit("SET_CREATIVES", mocks.data.response)
    return mocks
  }

  return FacebookAdsService.getCreatives(filters)
    .then((res) => {
      commit("SET_CREATIVES", res.data.response)
      commit("SET_FETCHED", fetchAttr, { root: true })
      return res.data
    })
}

export const fetchPanelOptions = ({ state, commit, dispatch }, accountId=null) => {
  const fetchAttr = "facebookAds/fetchPanelOptions"

  if (Vue.mocksActive) {
    let mock
    if (accountId)
      mock = Vue.getMock(state.storeModuleDirectory, "panelOptionsChildren")
    else
      mock = Vue.getMock(state.storeModuleDirectory, "panelOptions")
    if (mock) {
      if (!accountId)
        commit("SET_PANEL_OPTIONS", mock)
      return Vue.mockAsResponse
    }
  }

  return FacebookAdsService.getPanelOptions(accountId)
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


