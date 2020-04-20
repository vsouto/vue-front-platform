import Vue from "vue"

/* Profiles */
export const getProfiles = (state) => {
  let profiles = state.profiles
  if (Vue.mocksActive) {
    let mock = Vue.getMock(state.storeModuleDirectory, "profiles")
    if (mock)
      profiles = mock
  }
  return profiles
}

export const getProfileById = (state) => (id) => {
  return state.profiles.find(profile => profile.id == id)
}

/* Profile Businesses */

export const getProfileBusinessesById = (state) => (profile_id) => {
  return state.profile_businesses[profile_id] || []
}

/* Profile Business Accounts */

export const getProfileBusinessAccountsById = (state) => (profile_id, business_id) => {
  return state.business_accounts[`${profile_id}/${business_id}`] || []
}

/* Accounts */

export const getAccountById = (state) => (id) => {
  return state.accounts.find(account => account.id == id)
}

export const getAccounts = (state) => {
  return state.accounts
}

/* Campaigns */

export const getCampaignsByIds = (state) => (ids) => {
  if (state.campaigns) {
    let campaigns = []
    Object.keys(state.campaigns).forEach((id) => {
      if (ids.includes(id)) campaigns.push(state.campaigns[id])
    })
    return campaigns
  }
  return null
}

/* Adsets */

export const getAdsetsByIds = (state) => (ids) => {
  if (state.adsets) {
    let adsets = []
    Object.keys(state.adsets).forEach((id) => {
      if (ids.includes(id)) adsets.push(state.adsets[id])
    })
    return adsets
  }
  return null
}

/* Ads */

export const getAdsByIds = (state) => (ids) => {
  if (state.ads) {
    let ads = []
    Object.keys(state.ads).forEach((id) => {
      if (ids.includes(id)) ads.push(state.ads[id])
    })
    return ads
  }
  return null
}

export const viewType = (state) => state.viewType
export const getViewColumns = (state) => (id) => {
  return state.viewColumns[id]
}
export const getViewInsightColumns = (state) => (id) => {
  return state.viewInsightColumns[id]
}
