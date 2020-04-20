import Vue from "vue"

/* Profiles */

export const SET_PROFILES = (state, profiles) => {
  state.profiles = profiles
}
export const SET_PROFILE = (state, profile) => {
  let idx = state.profiles.findIndex(p => p.id == profile.id )
  if (idx === -1)
    state.profiles.push(profile)
  else
    Vue.set(state.profiles, idx, profile)
}
export const DEL_PROFILE = (state, id) => {
  const index = state.profiles.findIndex(o => o.id === id)
  if (index !== -1) {
    state.profiles.splice(index, 1)
  }
}
export const SET_PROFILE_BUSINESSES = (state, payload) => {
  Vue.set(state.profile_businesses, payload.id, payload.businesses)
}
export const SET_BUSINESS_ACCOUNTS = (state, payload) => {
  Vue.set(state.business_accounts, `${payload.profile_id}/${payload.business_id}`, payload.accounts)
}

/* Accounts */

export const SET_ACCOUNTS = (state, accounts) => {
  accounts.map(account => {
    let idx = state.accounts.findIndex(a => a.id == account.id)
    if (idx === -1)
      state.accounts.push(account)
    else
      Vue.set(state.accounts, idx, account)
  })
}
export const DEL_ACCOUNT = (state, id) => {
  let idx = state.accounts.findIndex(account => account.id == id)
  if (idx !== -1)
    Vue.delete(state.accounts, idx)
}
export const ADD_SELECTED_ACCOUNT = (state, account) => {
  state.selected_accounts.push(account)
}
export const DEL_SELECTED_ACCOUNT = (state, account) => {
  state.selected_accounts = state.selected_accounts.filter(
    (selectedAccount) => selectedAccount.id !== account.id
  )
}
export const SET_SELECTED_ACCOUNTS = (state, accounts) => {
  state.selected_accounts = accounts
}

/* Insights */

export const SET_INSIGHTS = (state, insights) => {
  for (const insight of insights) Vue.set(state.insights, insight.id, insight)
}

/* Campaigns */

export const SET_CAMPAIGNS = (state, campaigns) => {
  for (const campaign of campaigns) {
    Vue.set(state.campaigns, campaign.id, campaign)
  }
}

export const UPDATE_CAMPAIGN = (state, campaign) => {
  if (state.campaigns[campaign.id])
    for (const key in campaign) if (key != "id") Vue.set(state.campaigns[campaign.id], key, campaign[key])
}

/* Adsets */

export const SET_ADSETS = (state, adsets) => {
  for (const adset of adsets) {
    Vue.set(state.adsets, adset.id, adset)
  }
}

export const UPDATE_ADSET = (state, adset) => {
  if (state.adsets[adset.id])
    for (const key in adset) if (key != "id") Vue.set(state.adsets[adset.id], key, adset[key])
}

/* Ads */

export const SET_ADS = (state, ads) => {
  for (const ad of ads) {
    Vue.set(state.ads, ad.id, ad)
  }
}

export const UPDATE_AD = (state, ad) => {
  if (state.ads[ad.id]) for (const key in ad) if (key != "id") Vue.set(state.ads[ad.id], key, ad[key])
}

/* Creatives */

export const SET_CREATIVES = (state, creatives) => {
  for (const creative of creatives) {
    Vue.set(state.creatives, creative.id, creative)
  }
}



export const SET_PANEL_OPTIONS = (state, options) => {
  state.options = options
}

export const SET_VIEW_TYPE = (state, viewType) => {
  state.viewType = viewType
}

export const SET_VIEW_COLUMNS = (state, { view, columns }) => {
  Vue.set(state.viewColumns, view, columns)
}
